<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <nav
      class="fixed w-full top-0 z-50 bg-gray-800/95 backdrop-blur-sm border-b border-gray-700"
    >
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <NuxtLink
            to="/"
            class="text-xl font-bold group flex items-center gap-2"
          >
            <Printer
              class="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors"
            />
            <span>PRINT3D</span>
          </NuxtLink>

          <!-- Menu Desktop -->
          <div class="hidden md:flex space-x-8">
            <template v-for="item in menuItems" :key="item.path">
              <NuxtLink
                v-if="!item.isContact"
                :to="item.path"
                class="hover:text-blue-400 transition-colors"
              >
                {{ item.name }}
              </NuxtLink>
              <button
                v-else
                @click="scrollToFooter"
                class="hover:text-blue-400 transition-colors"
              >
                {{ item.name }}
              </button>
            </template>
          </div>

          <!-- Menu Mobile Button -->
          <button @click="isMenuOpen = !isMenuOpen" class="md:hidden p-2">
            <Menu v-if="!isMenuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>

        <!-- Mobile Menu -->
        <div v-show="isMenuOpen" class="md:hidden">
          <div class="py-2 space-y-2">
            <template v-for="item in menuItems" :key="item.path">
              <NuxtLink
                v-if="!item.isContact"
                :to="item.path"
                class="block px-4 py-2 hover:bg-gray-700 rounded-lg"
                @click="isMenuOpen = false"
              >
                {{ item.name }}
              </NuxtLink>
              <button
                v-else
                @click="
                  () => {
                    scrollToFooter();
                    isMenuOpen = false;
                  }
                "
                class="w-full text-left px-4 py-2 hover:bg-gray-700 rounded-lg"
              >
                {{ item.name }}
              </button>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <!-- Espaçamento para compensar o nav fixo -->
    <div class="h-16"></div>

    <slot />
  </div>
</template>

<script setup lang="ts">
import { Printer, Menu, X } from "lucide-vue-next";
import { useScroll } from "~/composables/useScroll";
const { scrollToFooter } = useScroll();

const isMenuOpen = ref(false);
const menuItems = [
  { name: "Home", path: "/", isContact: false },
  { name: "Sobre o projeto", path: "/about", isContact: false },
  { name: "Quem eu sou", path: "/portfolio", isContact: false },
  { name: "Contato", path: "/#contact", isContact: true },
  { name: "FAQ", path: "/faq", isContact: false },
];
</script>

<style scoped>
.router-link-active {
  @apply text-blue-400;
}
</style>
