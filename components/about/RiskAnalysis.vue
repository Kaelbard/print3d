// components/about/RiskAnalysis.vue
<template>
  <div class="space-y-8">
    <!-- Categorias de Risco -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div v-for="(category, index) in riskCategories" :key="index" class="bg-gray-800 rounded-xl overflow-hidden">
        <div :class="[
          'p-6 border-b border-opacity-20',
          category.colorClass
        ]">
          <div class="flex items-center gap-3">
            <component :is="category.icon" class="w-6 h-6" :class="category.iconColor" />
            <h3 class="text-2xl font-bold" :class="category.iconColor">
              {{ category.title }}
            </h3>
          </div>
        </div>

        <div class="p-6">
          <ul class="space-y-4">
            <li v-for="(risk, rIndex) in category.risks" :key="rIndex" class="flex items-start gap-3 group">
              <AlertTriangle class="w-5 h-5 mt-0.5 group-hover:scale-110 transition-transform"
                :class="category.iconColor" />
              <span class="text-gray-300">{{ risk }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Estratégias de Mitigação -->
    <div class="bg-gray-800 rounded-xl overflow-hidden">
      <div class="bg-green-600/20 p-6 border-b border-green-500/20">
        <div class="flex items-center gap-3">
          <ShieldCheck class="w-6 h-6 text-green-500" />
          <h3 class="text-2xl font-bold text-green-500">Estratégias de Mitigação</h3>
        </div>
      </div>

      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div v-for="(strategy, index) in mitigationStrategies" :key="index" class="flex items-start gap-3 p-4 rounded-lg hover:bg-gray-700/50 
                      transition-colors group">
            <div class="bg-green-500/10 rounded-lg p-2 group-hover:scale-110 transition-transform">
              <component :is="strategy.icon" class="w-5 h-5 text-green-500" />
            </div>
            <div>
              <h4 class="font-semibold text-green-400 mb-2">{{ strategy.title }}</h4>
              <p class="text-gray-300 text-sm">{{ strategy.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Taxa de Falha e Contingência -->
    <div class="bg-gray-800 rounded-xl overflow-hidden">
      <div class="bg-blue-600/20 p-6">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="flex items-center gap-3">
            <Percent class="w-6 h-6 text-blue-500" />
            <h3 class="text-2xl font-bold text-blue-500">Taxa de Falha e Contingência</h3>
          </div>
          <div class="flex items-center gap-4">
            <div class="text-center">
              <div class="text-3xl font-bold text-blue-400">8-12%</div>
              <div class="text-sm text-gray-400">Taxa de Falha</div>
            </div>
            <div class="h-12 w-px bg-gray-700"></div>
            <div class="text-center">
              <div class="text-3xl font-bold text-green-400">15%</div>
              <div class="text-sm text-gray-400">Margem de Contingência</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Wrench,
  TrendingDown,
  AlertTriangle,
  ShieldCheck,
  Percent,
  WrenchIcon,
  Package,
  RefreshCw,
  Shield,
  BookOpen
} from 'lucide-vue-next'

const riskCategories = [
  {
    title: 'Riscos Técnicos',
    icon: Wrench,
    colorClass: 'bg-red-600/20 border-red-500/20',
    iconColor: 'text-red-500',
    risks: [
      'Falhas de impressão (8-12% das produções)',
      'Manutenção não programada',
      'Problemas com fornecimento de material'
    ]
  },
  {
    title: 'Riscos de Mercado',
    icon: TrendingDown,
    colorClass: 'bg-yellow-600/20 border-yellow-500/20',
    iconColor: 'text-yellow-500',
    risks: [
      'Entrada de novos concorrentes',
      'Flutuação na demanda',
      'Variação no custo de insumos'
    ]
  },
  {
    title: 'Riscos Operacionais',
    icon: AlertTriangle,
    colorClass: 'bg-orange-600/20 border-orange-500/20',
    iconColor: 'text-orange-500',
    risks: [
      'Atrasos na produção',
      'Problemas de qualidade',
      'Dificuldades logísticas'
    ]
  }
]

const mitigationStrategies = [
  {
    icon: WrenchIcon,
    title: 'Manutenção Preventiva',
    description: 'Programa regular de manutenção para minimizar falhas e tempo de inatividade.'
  },
  {
    icon: Package,
    title: 'Estoque de Segurança',
    description: 'Manutenção de estoque mínimo de insumos críticos para produção.'
  },
  {
    icon: RefreshCw,
    title: 'Diversificação de Fornecedores',
    description: 'Múltiplos fornecedores qualificados para reduzir dependência.'
  },
  {
    icon: Shield,
    title: 'Seguro do Equipamento',
    description: 'Cobertura contra danos e perdas dos equipamentos principais.'
  },
  {
    icon: BookOpen,
    title: 'Treinamento Contínuo',
    description: 'Capacitação constante em novas técnicas e tecnologias.'
  }
]
</script>