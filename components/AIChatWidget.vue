<!-- components/AIChatWidget.vue -->
<template>
  <!-- Botão flutuante para abrir o chat -->
  <button
    @click="isOpen = !isOpen"
    class="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors z-50"
  >
    <MessageCircle v-if="!isOpen" class="w-6 h-6 text-white" />
    <X v-else class="w-6 h-6 text-white" />
  </button>

  <!-- Widget do Chat -->
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="transform translate-y-8 opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform translate-y-8 opacity-0"
  >
    <div
      v-if="isOpen"
      class="fixed bottom-24 right-6 w-full max-w-sm bg-gray-800 rounded-xl shadow-2xl overflow-hidden z-50"
    >
      <!-- Header -->
      <div class="bg-gray-900 px-6 py-4 border-b border-gray-700">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-white">Assistente Virtual</h2>
          <button
            @click="isOpen = false"
            class="text-gray-400 hover:text-white transition-colors"
          >
            <X class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Chat Messages -->
      <div
        ref="messagesContainer"
        class="h-[400px] overflow-y-auto p-6 space-y-4 scroll-smooth"
      >
        <div
          v-for="(message, index) in messages"
          :key="index"
          class="flex"
          :class="message.role === 'user' ? 'justify-end' : 'justify-start'"
        >
          <div
            class="flex items-start space-x-2 max-w-[90%]"
            :class="message.role === 'user' ? 'flex-row-reverse' : 'flex-row'"
          >
            <!-- Avatar -->
            <div
              class="min-w-10 min-h-10 rounded-full flex items-center justify-center"
              :class="
                message.role === 'user'
                  ? 'ml-2 bg-blue-500'
                  : 'mr-2 bg-gray-600'
              "
            >
              <User v-if="message.role === 'user'" class="w-5 h-5 text-white" />
              <Bot v-else class="w-5 h-5 text-white" />
            </div>

            <!-- Message -->
            <div
              class="px-4 py-2 rounded-lg"
              :class="
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 text-gray-100'
              "
            >
              {{ message.content }}
              <div class="text-xs mt-1 opacity-60">
                {{ formatTime(message.timestamp) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Loading indicator -->
        <div v-if="isLoading" class="flex justify-start">
          <div class="bg-gray-700 px-4 py-2 rounded-lg">
            <span class="animate-pulse">...</span>
          </div>
        </div>
      </div>

      <!-- Input Form -->
      <form
        @submit.prevent="handleSubmit"
        class="p-4 bg-gray-900 border-t border-gray-700"
      >
        <div class="flex space-x-2">
          <input
            v-model="inputMessage"
            type="text"
            placeholder="Digite sua mensagem..."
            class="flex-1 px-4 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            :disabled="isLoading"
          />
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            :disabled="isLoading || !inputMessage.trim()"
          >
            <Send class="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  </Transition>

  <!-- Overlay para fechar o chat em mobile -->
  <Transition
    enter-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-150"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen && isMobile"
      class="fixed inset-0 bg-black/50 z-40"
      @click="isOpen = false"
    ></div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { User, Bot, Send, MessageCircle, X } from "lucide-vue-next";
import { useWindowSize } from "@vueuse/core";
import { useDevice } from "~/composables/useDevice";
import { v4 as uuidv4 } from "uuid";
import type { ChatMessage } from "~/types/market";

const isOpen = ref(false);
const messages = ref<ChatMessage[]>([]);
const inputMessage = ref("");
const isLoading = ref(false);
const sessionId = ref("");
const messagesContainer = ref<HTMLElement | null>(null);
// Usar o composable do vueuse para window size
const { width } = useWindowSize();
// Detecta se é dispositivo mobile
const { isMobile } = useDevice();
// Função melhorada de scroll
const scrollToBottom = async () => {
  await nextTick(); // Espera a DOM atualizar
  if (messagesContainer.value) {
    const container = messagesContainer.value;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }
};

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const handleSubmit = async () => {
  if (!inputMessage.value.trim() || isLoading.value) return;

  const userMessage: ChatMessage = {
    role: "user",
    content: inputMessage.value,
    timestamp: new Date(),
  };

  messages.value.push(userMessage);
  const currentMessage = inputMessage.value;
  inputMessage.value = "";
  isLoading.value = true;

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: currentMessage,
        sessionId: sessionId.value,
      }),
    });

    if (!response.ok) throw new Error("Erro na requisição");

    const reader = response.body?.getReader();
    if (!reader) throw new Error("Stream não disponível");

    let assistantMessage: ChatMessage = {
      role: "assistant",
      content: "",
      timestamp: new Date(),
    };
    messages.value.push(assistantMessage);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = new TextDecoder().decode(value);
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          try {
            const data = JSON.parse(line.slice(6));

            switch (data.type) {
              case "message":
                // Verifica se o conteúdo é um objeto e tem uma propriedade text
                if (typeof data.content === "object" && data.content.text) {
                  assistantMessage.content = data.content.text;
                }
                // Se for uma string, usa diretamente
                else if (typeof data.content === "string") {
                  assistantMessage.content = data.content;
                }
                // Se for outro tipo de objeto, converte para string
                else if (typeof data.content === "object") {
                  assistantMessage.content = JSON.stringify(data.content);
                }
                // Caso contrário, usa uma mensagem padrão
                else {
                  assistantMessage.content = String(data.content);
                }
                break;
            }

            messages.value = [...messages.value];
            scrollToBottom();
          } catch (e) {
            console.error("Error parsing SSE message:", e);
          }
        }
      }
    }
  } catch (error) {
    console.error("Chat error:", error);
    messages.value.push({
      role: "assistant",
      content: "Desculpe, ocorreu um erro ao processar sua mensagem.",
      timestamp: new Date(),
    });
  } finally {
    isLoading.value = false;
    scrollToBottom();
  }
};

// Scroll to bottom when new messages arrive
watch(
  () => messages.value.length,
  () => {
    scrollToBottom();
  }
);

// Observa mudanças no conteúdo da última mensagem
watch(
  () => messages.value[messages.value.length - 1]?.content,
  () => scrollToBottom()
);
</script>

<style scoped>
/* Opcional: Adicionar uma animação suave ao botão */
button {
  transition: transform 0.2s;
}

button:hover {
  transform: scale(1.05);
}

/* Garantir que o widget fique sobre outros elementos */
.z-50 {
  z-index: 50;
}
.scroll-smooth {
  scroll-behavior: smooth;
}

/* Estilização da scrollbar para melhor visual */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
