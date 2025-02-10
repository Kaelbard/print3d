// pages/about-me.vue
<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Hero Section -->
    <section class="relative py-24 overflow-hidden">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <!-- Foto/Avatar Placeholder -->
          <div class="relative">
            <div
              class="aspect-square bg-gray-800 rounded-2xl overflow-hidden relative"
            >
              <!-- Placeholder para foto -->
              <div class="absolute inset-0 flex items-center justify-center">
                <img
                  :src="me.photo"
                  :alt="me.name"
                  class="w-full h-full object-cover"
                />
                <User v-if="!me.photo" class="w-32 h-32 text-gray-700" />
              </div>
            </div>
            <!-- Decorative Elements -->
            <div
              class="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%]"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl"
              ></div>
            </div>
          </div>

          <!-- Info -->
          <div class="space-y-6">
            <div class="space-y-2">
              <h1 class="text-4xl md:text-5xl font-bold text-white">
                Christiano Barbosa
              </h1>
              <p class="text-xl text-blue-400">Desenvolvedor Fullstack</p>
            </div>

            <div class="flex flex-wrap gap-3">
              <span
                v-for="tech in technologies"
                :key="tech"
                class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
              >
                {{ tech }}
              </span>
            </div>

            <p class="text-gray-300 leading-relaxed">
              Como desenvolvedor apaixonado por tecnologia, minha jornada é
              marcada pela exploração constante de novas fronteiras digitais.
              Além do desenvolvimento com Vue.js e Python, mergulho em projetos
              envolvendo IA e estou sempre expandindo meu repertório técnico com
              tecnologias como C#, React e Ionic. Quando não estou codando, você
              me encontra imerso no universo nerd, seja em partidas de Magic:
              The Gathering ou criando aventuras em sessões de RPG.
            </p>

            <p class="text-gray-300 leading-relaxed">
              A impressão 3D me fascina desde seu surgimento, não apenas como
              tecnologia, mas como uma ponte entre o digital e o físico. Vejo
              nela um potencial transformador que vai além da fabricação - é uma
              ferramenta de inovação que pode revolucionar diversos segmentos do
              mercado. Este projeto representa a convergência perfeita entre
              minha experiência em desenvolvimento e minha visão empreendedora.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="py-24 bg-gray-800">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-16">
          Habilidades & Interesses
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Desenvolvimento -->
          <div class="bg-gray-900 rounded-xl p-6 space-y-4">
            <div class="flex items-center gap-3">
              <Code2 class="w-6 h-6 text-blue-400" />
              <h3 class="text-xl font-bold">Desenvolvimento</h3>
            </div>
            <ul class="space-y-2">
              <li
                v-for="skill in devSkills"
                :key="skill"
                class="flex items-center gap-2 text-gray-300"
              >
                <CheckCircle2 class="w-4 h-4 text-blue-400" />
                {{ skill }}
              </li>
            </ul>
          </div>

          <!-- Hobbies -->
          <div class="bg-gray-900 rounded-xl p-6 space-y-4">
            <div class="flex items-center gap-3">
              <Gamepad2 class="w-6 h-6 text-purple-400" />
              <h3 class="text-xl font-bold">Hobbies</h3>
            </div>
            <ul class="space-y-2">
              <li
                v-for="hobby in hobbies"
                :key="hobby"
                class="flex items-center gap-2 text-gray-300"
              >
                <CheckCircle2 class="w-4 h-4 text-purple-400" />
                {{ hobby }}
              </li>
            </ul>
          </div>

          <!-- Impressão 3D -->
          <div class="bg-gray-900 rounded-xl p-6 space-y-4">
            <div class="flex items-center gap-3">
              <Printer class="w-6 h-6 text-green-400" />
              <h3 class="text-xl font-bold">Impressão 3D</h3>
            </div>
            <ul class="space-y-2">
              <li
                v-for="interest in printingInterests"
                :key="interest"
                class="flex items-center gap-2 text-gray-300"
              >
                <CheckCircle2 class="w-4 h-4 text-green-400" />
                {{ interest }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
  <div class="bg-gray-900">
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { User, Code2, Gamepad2, Printer, CheckCircle2 } from "lucide-vue-next";

const me = {
  name: "Christiano Barbosa",
  role: "Desenvolvedor Fullstack",
  photo: "images/me.png",
};
const technologies = [
  "Vue.js",
  "Python",
  "TypeScript",
  "C#",
  "React",
  "Ionic",
  "Inteligência Artificial",
];

const devSkills = [
  "Desenvolvimento Frontend",
  "Desenvolvimento Backend",
  "APIs RESTful",
  "Bancos de Dados",
  "DevOps",
  "UI/UX Design",
];

const hobbies = [
  "Magic: The Gathering",
  "RPG de Mesa",
  "Board Games",
  "Tecnologia",
  "IA & Machine Learning",
  "Modelagem 3D",
];

const printingInterests = [
  "Miniaturas para RPG",
  "Peças Personalizadas",
  "Protótipos Funcionais",
  "Modelagem Técnica",
  "Inovação em Produtos",
  "Otimização de Processos",
];
</script>
