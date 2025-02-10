<template>
  <footer id="contact" class="bg-gray-900 border-t border-gray-800">
    <div class="container mx-auto px-4 py-8 sm:py-12">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Cada seção do footer -->
        <div class="space-y-4">
          <h3 class="text-base sm:text-lg font-bold text-white">PRINT3D</h3>
          <p class="text-sm text-gray-400">
            Transformando ideias em realidade através da impressão 3D. Soluções
            personalizadas para colecionadores, jogadores e empresas.
          </p>
        </div>

        <!-- Links Rápidos -->
        <div class="space-y-4">
          <h3 class="text-lg font-bold text-white">Links Rápidos</h3>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.path">
              <NuxtLink
                :to="link.path"
                class="text-gray-400 hover:text-blue-400 transition-colors text-sm"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contato -->
        <div class="space-y-4">
          <h3 class="text-lg font-bold text-white">Contato</h3>
          <ul class="space-y-2 text-sm">
            <li class="flex items-center gap-2 text-gray-400">
              <Mail class="w-4 h-4" />
              <a
                href="mailto:christianobarbossa@gmail.com"
                class="hover:text-blue-400 transition-colors"
              >
                christianobarbossa@gmail.com
              </a>
            </li>
            <li class="flex items-center gap-2 text-gray-400">
              <MapPin class="w-4 h-4" />
              <span>Brasilia, DF</span>
            </li>
          </ul>
        </div>

        <!-- Social -->
        <div class="space-y-4">
          <h3 class="text-lg font-bold text-white">Redes Sociais</h3>
          <div class="flex gap-4">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              :title="social.name"
            >
              <component
                :is="social.icon"
                class="w-5 h-5 text-gray-400 hover:text-blue-400"
              />
            </a>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div
        class="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-800 text-center text-gray-400 text-xs sm:text-sm"
      >
        <p>
          &copy; {{ new Date().getFullYear() }} PRINT3D. Todos os direitos
          reservados.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  Twitter,
} from "lucide-vue-next";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "Quem eu sou", path: "/about-me" },
  { name: "Sobre o Projeto", path: "/about" },
  { name: "FAQ", path: "/faq" },
];

const socialLinks = [
  { name: "GitHub", icon: Github, url: "https://github.com/kaelbard" },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com/in/christianobarbossa",
  },
];
</script>
