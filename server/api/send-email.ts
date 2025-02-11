// server/api/send-email.ts
import nodemailer from "nodemailer";
import type { EmailPayload } from "~/types/market";

const config = useRuntimeConfig();

const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  secure: true,
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASS,
  },
});

export default defineEventHandler(async (event) => {
  const body: EmailPayload = await readBody(event);

  const htmlContent = `
    <h2>Histórico da Conversa</h2>
    ${body.chatHistory
      .map(
        (msg) => `
      <p><strong>${msg.role === "user" ? "Cliente" : "Assistente"}</strong> 
         (${new Date(msg.timestamp).toLocaleString("pt-BR")}):
      </p>
      <p>${msg.content}</p>
    `
      )
      .join("<hr>")}
  `;

  try {
    await transporter.sendMail({
      from: config.SMTP_USER,
      to: body.to,
      subject: body.subject,
      html: htmlContent,
    });

    return { success: true };
  } catch (error) {
    console.error("Email error:", error);
    throw createError({
      statusCode: 500,
      message: "Erro ao enviar email",
    });
  }
});
