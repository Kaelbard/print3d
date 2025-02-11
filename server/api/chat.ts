// server/api/chat.ts
import OpenAI from "openai";
import { sendStream } from "h3";
import nodemailer from "nodemailer";

const config = useRuntimeConfig();

const openai = new OpenAI({
  apiKey: config.OPENAI_API_KEY,
});

// Definir as ferramentas disponíveis
const tools = [
  {
    type: "function" as const,
    function: {
      name: "send_email",
      description:
        "Envia um email para um destinatário com assunto e mensagem.",
      parameters: {
        type: "object",
        properties: {
          to: {
            type: "string",
            description: "O endereço de email do destinatário.",
          },
          subject: {
            type: "string",
            description: "Linha de assunto do email.",
          },
          body: {
            type: "string",
            description: "Corpo da mensagem do email.",
          },
        },
        required: ["to", "subject", "body"],
        additionalProperties: false,
      },
      strict: true,
    },
  },
];

const activeThreads = new Map<string, string>();
const threadTimestamps = new Map<string, number>();

// Função para limpar o thread
function clearThread(sessionId: string) {
  activeThreads.delete(sessionId);
  threadTimestamps.delete(sessionId);
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { message, sessionId } = body;

  try {
    let threadId: string;

    if (activeThreads.has(sessionId)) {
      threadId = activeThreads.get(sessionId)!;
    } else {
      const thread = await openai.beta.threads.create();
      threadId = thread.id;
      activeThreads.set(sessionId, threadId);
    }

    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: message,
    });

    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: config.OPENAI_ASSISTANT_ID,
      tools: [
        {
          type: "function",
          function: {
            name: "send_email",
            description:
              "Send an email to a given recipient with a subject and message.",
            parameters: {
              type: "object",
              properties: {
                to: {
                  type: "string",
                  description: "The recipient email address.",
                },
                subject: {
                  type: "string",
                  description: "Email subject line.",
                },
                body: {
                  type: "string",
                  description: "Body of the email message.",
                },
              },
              required: ["to", "subject", "body"],
              additionalProperties: false,
            },
            strict: true,
          },
        },
      ],
    });
    const stream = new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const status = await openai.beta.threads.runs.retrieve(
              threadId,
              run.id
            );

            if (status.status === "requires_action") {
              const toolCalls =
                status.required_action?.submit_tool_outputs.tool_calls;
              if (toolCalls) {
                const toolOutputs = [];

                for (const toolCall of toolCalls) {
                  if (toolCall.function.name === "send_email") {
                    try {
                      // Parse os argumentos da função
                      const args = JSON.parse(toolCall.function.arguments);

                      // Log para debug
                      console.log("Sending email with args:", args);

                      // Enviar o email
                      await sendEmail({
                        to: args.to,
                        subject: args.subject,
                        body: `
                            <div style="font-family: Arial, sans-serif; padding: 20px;">
                              <p>${args.body}</p>
                              <br>
                              <p style="color: #666;">Enviado pelo Assistente Virtual</p>
                            </div>
                          `,
                      });

                      // Adicionar o resultado ao array de outputs
                      toolOutputs.push({
                        tool_call_id: toolCall.id,
                        output: JSON.stringify({
                          success: true,
                          message: `Email sent successfully to ${args.to}`,
                        }),
                      });
                    } catch (error: any) {
                      toolOutputs.push({
                        tool_call_id: toolCall.id,
                        output: JSON.stringify({
                          success: false,
                          error: error.message || "Failed to send email",
                        }),
                      });
                    }
                  }
                }
                if (toolOutputs.length > 0) {
                  try {
                    await openai.beta.threads.runs.submitToolOutputs(
                      threadId,
                      run.id,
                      { tool_outputs: toolOutputs }
                    );
                  } catch (error) {
                    console.error("Error submitting tool outputs:", error);
                    throw error;
                  }
                }

                // Submeter os resultados das tool calls
                await openai.beta.threads.runs.submitToolOutputs(
                  threadId,
                  run.id,
                  { tool_outputs: toolOutputs }
                );
              }

              // Continuar o loop para verificar o próximo estado
              continue;
            }

            if (status.status === "completed") {
              const messages = await openai.beta.threads.messages.list(
                threadId
              );
              const lastMessage = messages.data[0];

              if (lastMessage.role === "assistant") {
                let content = "";
                if (lastMessage.content[0].type === "text") {
                  content =
                    lastMessage.content[0].text.value ||
                    lastMessage.content[0].text.toString();
                }

                // Verificar se é uma mensagem de finalização
                const isEndingConversation =
                  content
                    .toLowerCase()
                    .includes("conversa vai ser finalizada") ||
                  content.toLowerCase().includes("conversa será finalizada");

                controller.enqueue(
                  `data: ${JSON.stringify({
                    type: "message",
                    content: content,
                    isEnding: isEndingConversation,
                  })}\n\n`
                );

                if (isEndingConversation) {
                  clearThread(sessionId);
                }
              }

              controller.enqueue(
                `data: ${JSON.stringify({
                  type: "end",
                })}\n\n`
              );

              controller.close();
              break;
            } else if (status.status === "failed") {
              throw new Error("Run failed");
            }

            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        } catch (error) {
          controller.error(error);
        }
      },
    });

    setResponseHeader(event, "Content-Type", "text/event-stream");
    setResponseHeader(event, "Cache-Control", "no-cache");
    setResponseHeader(event, "Connection", "keep-alive");

    return sendStream(event, stream);
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw createError({
      statusCode: 500,
      message: "Erro ao processar a mensagem",
    });
  }
});

function detectEndOfConversation(message: string): boolean {
  const endPhrases = ["tchau", "até logo", "obrigado", "finalizar"];
  return endPhrases.some((phrase) => message.toLowerCase().includes(phrase));
}

// Função auxiliar para enviar email
async function sendEmail({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}) {
  try {
    const transporter = nodemailer.createTransport({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      secure: true,
      auth: {
        user: config.SMTP_USER,
        pass: config.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: config.SMTP_USER,
      to,
      subject,
      html: body,
    });

    return true;
  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
}
