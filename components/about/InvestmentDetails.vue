<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <!-- Equipamentos e Insumos -->
    <div class="bg-gray-800 rounded-xl overflow-hidden">
      <div class="bg-blue-600/20 p-6 border-b border-blue-500/20">
        <div class="flex items-center gap-3">
          <Printer class="w-6 h-6 text-blue-500" />
          <h3 class="text-2xl font-bold text-blue-500">Equipamentos e Insumos</h3>
        </div>
      </div>

      <div class="p-6">
        <ul class="space-y-4">
          <li v-for="(item, index) in initialInvestments" :key="index"
            class="flex justify-between items-center group p-3 rounded-lg hover:bg-gray-700/50">
            <span class="text-gray-300">{{ item.name }}</span>
            <span class="font-mono text-blue-400">R$ {{ item.value.toFixed(2) }}</span>
          </li>
        </ul>

        <div class="mt-6 pt-6 border-t border-gray-700">
          <div class="flex justify-between items-center">
            <span class="text-lg font-bold">Total</span>
            <span class="font-mono text-xl font-bold text-blue-400">
              R$ {{ totalInitialInvestment.toFixed(2) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Custos Operacionais -->
    <div class="bg-gray-800 rounded-xl overflow-hidden">
      <div class="bg-green-600/20 p-6 border-b border-green-500/20">
        <div class="flex items-center gap-3">
          <BarChart class="w-6 h-6 text-green-500" />
          <h3 class="text-2xl font-bold text-green-500">Custos Operacionais Mensais</h3>
        </div>
      </div>

      <div class="p-6">
        <ul class="space-y-4">
          <li v-for="(cost, index) in monthlyOperationalCosts" :key="index"
            class="flex justify-between items-center group p-3 rounded-lg hover:bg-gray-700/50">
            <span class="text-gray-300">{{ cost.name }}</span>
            <span class="font-mono text-green-400">R$ {{ cost.value.toFixed(2) }}</span>
          </li>
        </ul>

        <div class="mt-6 pt-6 border-t border-gray-700">
          <div class="flex justify-between items-center">
            <span class="text-lg font-bold">Total Mensal</span>
            <span class="font-mono text-xl font-bold text-green-400">
              R$ {{ totalMonthlyCost.toFixed(2) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Printer, BarChart } from 'lucide-vue-next'

const initialInvestments = [
  { name: 'Impressora Bambu Lab A1 Mini', value: 4400.00 },
  { name: 'Filamento PLA (10kg)', value: 1200.00 },
  { name: 'Filamento PETG (5kg)', value: 750.00 }
]

const monthlyOperationalCosts = [
  { name: 'Energia Elétrica', value: 180.00 },
  { name: 'Internet', value: 120.00 },
  { name: 'Marketing Digital', value: 300.00 },
  { name: 'Manutenção', value: 150.00 },
  { name: 'Insumos Adicionais', value: 250.00 }
]

const totalInitialInvestment = computed(() =>
  initialInvestments.reduce((sum, item) => sum + item.value, 0)
)

const totalMonthlyCost = computed(() =>
  monthlyOperationalCosts.reduce((sum, item) => sum + item.value, 0)
)
</script>