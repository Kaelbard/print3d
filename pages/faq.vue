// pages/faq.vue
<template>
  <div class="min-h-screen bg-gray-900 py-24">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold text-center mb-16">Perguntas Frequentes</h1>

      <!-- FAQ Section -->
      <div class="max-w-4xl mx-auto mb-24">
        <div class="space-y-6">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="bg-gray-800 rounded-xl overflow-hidden"
          >
            <button
              @click="faq.isOpen = !faq.isOpen"
              class="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-700/50 transition-colors"
            >
              <span class="text-lg font-medium">{{ faq.question }}</span>
              <ChevronDown
                class="w-5 h-5 transition-transform"
                :class="{ 'rotate-180': faq.isOpen }"
              />
            </button>
            <div
              v-show="faq.isOpen"
              class="px-6 py-4 text-gray-300 border-t border-gray-700"
            >
              <p v-if="typeof faq.answer === 'string'" class="leading-relaxed">
                {{ faq.answer }}
              </p>
              <div v-else class="list-disc pl-4 space-y-2">
                <div v-for="(item, i) in faq.answer" :key="i">{{ item }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Research Sources -->
      <section class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold mb-8">Fontes de Pesquisa</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-gray-800 rounded-xl p-6">
            <h3 class="text-xl font-bold mb-4 text-blue-400">
              Relatórios de Mercado
            </h3>
            <ul class="space-y-4">
              <li
                v-for="(source, index) in marketSources"
                :key="index"
                class="flex items-start gap-3"
              >
                <FileText class="w-5 h-5 mt-1 text-blue-400" />
                <div>
                  <p class="font-medium">{{ source.title }}</p>
                  <p class="text-sm text-gray-400">{{ source.description }}</p>
                  <a
                    :href="source.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-sm text-blue-400 hover:underline"
                  >
                    Acessar relatório →
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div class="bg-gray-800 rounded-xl p-6">
            <h3 class="text-xl font-bold mb-4 text-green-400">
              Referências Técnicas
            </h3>
            <ul class="space-y-4">
              <li
                v-for="(source, index) in technicalSources"
                :key="index"
                class="flex items-start gap-3"
              >
                <Wrench class="w-5 h-5 mt-1 text-green-400" />
                <div>
                  <p class="font-medium">{{ source.title }}</p>
                  <p class="text-sm text-gray-400">{{ source.description }}</p>
                  <a
                    :href="source.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-sm text-green-400 hover:underline"
                  >
                    Ver especificações →
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </div>
  <div class="bg-gray-900">
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ChevronDown, FileText, Wrench } from "lucide-vue-next";

const faqs = ref([
  {
    question: "Por que o investimento inicial é relativamente baixo?",
    answer:
      "O baixo investimento inicial de R$ 6.350,00 é possível devido à escolha estratégica de equipamentos e ao modelo de negócio enxuto. A impressora Bambu Lab A1 Mini oferece excelente custo-benefício com tecnologia avançada, permitindo iniciar as operações com qualidade profissional sem grandes despesas de capital.",
    isOpen: false,
  },
  {
    question: "Como é calculado o ROI de 8-12 meses?",
    answer: [
      "O ROI é calculado considerando:",
      "- Receita média mensal projetada",
      "- Margens de lucro de 163% a 275% por produto",
      "- Custos operacionais fixos de R$ 1.000,00/mês",
      "- Crescimento progressivo da demanda",
      "- Diversificação de produtos e nichos",
    ],
    isOpen: false,
  },
  {
    question: "Quais são os principais riscos do negócio?",
    answer: [
      "Falhas de impressão (mitigado por margem de erro no preço)",
      "Variação no custo de insumos (minimizado por contratos com fornecedores)",
      "Concorrência crescente (diferenciação por nichos específicos)",
      "Curva de aprendizado técnico (suporte técnico e treinamento inclusos)",
    ],
    isOpen: false,
  },
  {
    question: "Como o negócio planeja se expandir?",
    answer: [
      "O plano de expansão é estruturado em fases:",
      " 1. Mês 12: Segunda impressora e materiais",
      " 2. Mês 18: Equipamentos de pós-processamento e marketing",
      " 3. Mês 24: Infraestrutura de design e prototipagem",
      "Cada fase é autofinanciada pelo lucro operacional.",
    ],
    isOpen: false,
  },
  {
    question: "Qual é o diferencial competitivo do projeto?",
    answer: [
      "Foco em nichos específicos com alta demanda",
      "Expertise técnica em desenvolvimento e modelagem 3D",
      "Sistema de controle de qualidade rigoroso",
      "Capacidade de personalização avançada",
      "Integração de tecnologias (IA, automação)",
    ],
    isOpen: false,
  },
  {
    question: "Como é garantida a qualidade dos produtos?",
    answer: [
      "Calibração regular do equipamento",
      "Testes de protótipo",
      "Controle de temperatura e umidade",
      "Inspeção pós-impressão",
      "Feedback do cliente",
      "A taxa de falha de 8 - 12 % está dentro da média do mercado e é compensada na precificação.",
    ],
    isOpen: false,
  },
]);

const marketSources = [
  {
    title: "Statista Global 3D Printing Market 2024",
    description:
      "Análise completa do mercado global de impressão 3D, tendências e projeções.",
    url: "https://www.mordorintelligence.com/pt/industry-reports/3d-printing-market",
  },
  {
    title: "SEBRAE - Mercado Maker Brasil",
    description: "Estudo sobre o mercado maker e fabricação digital no Brasil.",
    url: "https://sebrae.com.br/sites/PortalSebrae/artigos/brasil-tem-quase-15-milhoes-de-microempreendedores-individuais,e538151eea156810VgnVCM1000001b00320aRCRD",
  },
  {
    title: "industria40",
    description:
      "Relatório anual sobre o estado da indústria de manufatura aditiva.",
    url: "https://www.industria40.ind.br/artigo/25292-acesse-segunda-versao-mapa-manufatura-aditiva-brasil",
  },
];

const technicalSources = [
  {
    title: "Bambu Lab A1 Mini Specs",
    description: "Especificações técnicas e benchmarks da impressora.",
    url: "https://bambulab.com/a1-mini",
  },
  {
    title: "All3DP - Professional Reviews",
    description: "Análises técnicas de equipamentos e materiais.",
    url: "https://all3dp.com/",
  },
  {
    title: "Make: 3D Printing Guide",
    description: "Guia técnico sobre processos e materiais de impressão 3D.",
    url: "https://makezine.com/3d-printing",
  },
];
</script>
