<template>
  <section class="relative h-screen w-full overflow-hidden">
    <!-- Video Background -->
    <div class="absolute inset-0">
      <video autoplay loop muted playsinline class="w-full h-full object-cover">
        <source src="/videos/print3d.mp4" type="video/mp4" />
      </video>
      <!-- Overlay escuro para melhorar legibilidade -->
      <div class="absolute inset-0 bg-black/60"></div>
    </div>

    <!-- Conteúdo do Hero -->
    <div class="relative h-full container mx-auto px-4">
      <div class="flex flex-col justify-center h-full max-w-3xl">
        <h1 class="text-5xl md:text-7xl font-bold mb-6 text-white">
          Imprima suas ideias com qualidade
        </h1>
        <p class="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl">
          Transforme seus conceitos em realidade com nossa tecnologia de
          impressão 3D de ponta. Design personalizado e qualidade excepcional.
        </p>
        <div class="flex flex-wrap gap-4">
          <NuxtLink
            to="/contact"
            class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors text-lg font-medium inline-block"
          >
            Fale comigo
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="bg-gray-800/80 hover:bg-gray-700 text-white px-8 py-3 rounded-lg transition-colors text-lg font-medium inline-block"
          >
            Saiba Mais
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <ChevronDown class="w-8 h-8 text-white opacity-70" />
    </div>
  </section>
</template>
<script setup lang="ts">
import { ChevronDown } from "lucide-vue-next";
</script>
<style scoped>
video {
  filter: brightness(0.8);
}
</style>
