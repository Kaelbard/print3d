<template>
  <div>
    <!-- Hero Section -->
    <section id="hero" class="relative h-screen">
      <HeroSection />

    </section>

    <!-- Services Section -->
    <section class="py-24 bg-gray-800">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold mb-16 text-center">Serviços</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(service, index) in services" :key="index" class="bg-gray-900 p-6 rounded-xl hover:transform hover:scale-105 
                      transition-all duration-300">
            <!-- Image placeholder -->
            <img :src="service.image" :alt="service.title" class="w-full h-auto rounded-lg mb-4">
            <h3 class="text-xl font-bold mb-2">{{ service.title }}</h3>
            <p class="text-gray-400">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Overview Section -->
    <section class="py-24 bg-gray-900">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold mb-16 text-center">Visão Geral do Projeto</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div class="bg-gray-800 p-8 rounded-xl">
            <h3 class="text-2xl font-bold mb-6 text-blue-400">Nichos de Mercado</h3>
            <ul class="space-y-4">
              <li v-for="(niche, index) in targetMarkets" :key="index" class="flex items-center gap-3">
                <Users2 class="w-5 h-5 text-blue-400" />
                <span>{{ niche }}</span>
              </li>
            </ul>
          </div>
          <div class="bg-gray-800 p-8 rounded-xl">
            <h3 class="text-2xl font-bold mb-6 text-blue-400">Vantagens Competitivas</h3>
            <ul class="space-y-4">
              <li v-for="(advantage, index) in competitiveAdvantages" :key="index" class="flex items-center gap-3">
                <Star class="w-5 h-5 text-blue-400" />
                <span>{{ advantage }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Products and Pricing Section -->
    <section class="py-24 bg-gray-800">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold mb-16 text-center">Nossos Produtos</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div v-for="product in products" :key="product.name"
            class="bg-gray-900 rounded-xl p-6 hover:scale-105 transition-transform">
            <h3 class="text-xl font-bold mb-4">{{ product.name }}</h3>
            <p class="text-3xl font-bold text-blue-400 mb-2">R$ {{ product.price.toFixed(2) }}</p>
            <p class="text-sm text-gray-400">Margem: {{ product.margin }}%</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Market Analysis Section -->
    <section class="py-24 bg-gray-900">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold mb-16 text-center">Análise de Mercado</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="analysis in marketStore.marketAnalysis" :key="analysis.category"
            class="bg-gray-800 p-8 rounded-xl">
            <h3 class="text-2xl font-bold mb-4">{{ analysis.category }}</h3>
            <p class="text-4xl font-bold text-blue-400 mb-2">{{ analysis.value }}</p>
            <p class="text-gray-400">{{ analysis.details }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Viability Analysis Section -->
    <ViabilityAnalysis />
    <!-- Financial Charts Section -->
    <section class="py-24 bg-gray-800">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold mb-16 text-center">Projeções Financeiras</h2>
        <!-- Chart components will go here -->
        <DashboardCharts />
      </div>
    </section>

    <section class="py-24 bg-gray-900">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold mb-16 text-center">Metas de Crescimento</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div v-for="goal in growthGoals" :key="goal.month" class="bg-gray-800 p-6 rounded-xl">
            <h3 class="text-lg font-medium mb-2">Mês {{ goal.month }}</h3>
            <p class="text-3xl font-bold text-blue-400">{{ goal.units }}</p>
            <p class="text-sm text-gray-400">unidades/mês</p>
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
import { useMarketStore } from '~/stores/marketStore'
import DashboardCharts from '~/components/charts/DashboardCharts.vue'
import ViabilityAnalysis from '~/components/ViabilityAnalysis.vue'
import Footer from '~/components/Footer.vue'
import HeroSection from '~/components/HeroSection.vue'
const marketStore = useMarketStore()

// Initialize store data
onMounted(() => {
  marketStore.initializeData()
})

import { Users2, Star } from 'lucide-vue-next'

const targetMarkets = [
  'Jogadores de RPG e boardgames',
  'Colecionadores',
  'Instituições religiosas',
  'Designers e arquitetos',
  'Pequenas indústrias'
]

const competitiveAdvantages = [
  'Equipamento de última geração',
  'Processo de controle de qualidade',
  'Foco em nichos específicos',
  'Atendimento personalizado',
  'Personalização de produtos'
]

const products = [
  { name: 'Miniaturas RPG', price: 25.00, margin: 163 },
  { name: 'Tokens Games', price: 15.00, margin: 275 },
  { name: 'Figuras Sacras', price: 40.00, margin: 176 },
  { name: 'Suportes Celular', price: 30.00, margin: 241 },
  { name: 'Peças Reposição', price: 35.00, margin: 192 },
  { name: 'Acess. Games', price: 20.00, margin: 251 },
  { name: 'Decoração', price: 50.00, margin: 194 },
  { name: 'Base para Protótipos', price: 30.00, margin: 100 }
]

const growthGoals = [
  { month: 6, units: '200' },
  { month: 12, units: '400' },
  { month: 18, units: '600' },
  { month: 24, units: '800' }
]

const services = [
  {
    title: 'Protótipos',
    description: 'Desenvolvimento rápido de protótipos funcionais para validação de conceitos.',
    image: 'images/propt.png'
  },
  {
    title: 'Miniaturas',
    description: 'Criação de miniaturas personalizadas para colecionadores e jogos.',
    image: 'images/mini.png'
  },
  {
    title: 'Peças Técnicas',
    description: 'Fabricação de peças técnicas e componentes sob demanda.',
    image: 'images/pecas.png'
  }
]
</script>