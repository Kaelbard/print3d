<template>
  <div class="relative">
    <!-- Timeline -->
    <div class="space-y-12 m-6">
      <div v-for="(phase, index) in expansionPhases" :key="index" class="relative pl-12 md:pl-24">
        <!-- Timeline line -->
        <div class="absolute left-0 top-0 h-full w-px bg-blue-500/20"></div>

        <!-- Timeline node -->
        <div class="absolute left-0 -translate-x-1/2 top-0 w-8 h-8 rounded-full bg-gray-800 
                    border-4 border-blue-500 flex items-center justify-center">
          <span class="text-sm font-bold">{{ phase.month }}º</span>
        </div>

        <!-- Content -->
        <div class="bg-gray-800 rounded-xl p-6">
          <h3 class="text-2xl font-bold mb-4 text-blue-400">Mês {{ phase.month }}</h3>
          <ul class="space-y-4">
            <li v-for="(investment, iIndex) in phase.investments" :key="iIndex" class="flex flex-col md:flex-row md:items-center justify-between 
                       p-3 rounded-lg hover:bg-gray-700/50">
              <span class="text-gray-300 mb-2 md:mb-0">{{ investment.name }}</span>
              <span class="font-mono text-blue-400">R$ {{ investment.value.toFixed(2) }}</span>
            </li>
          </ul>

          <div v-if="phase.specs" class="mt-6 pt-6 border-t border-gray-700">
            <h4 class="text-lg font-semibold mb-3 text-gray-300">Especificações:</h4>
            <ul class="space-y-2">
              <li v-for="(spec, sIndex) in phase.specs" :key="sIndex" class="text-gray-400 flex items-center gap-2">
                <ChevronRight class="w-4 h-4" />
                {{ spec }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'

const expansionPhases = [
  {
    month: 12,
    investments: [
      { name: 'Segunda impressora', value: 4400.00 },
      { name: 'Expansão de materiais', value: 2000.00 }
    ]
  },
  {
    month: 18,
    investments: [
      { name: 'Equipamentos de pós-processamento', value: 3500.00 },
      { name: 'Marketing e marketplace', value: 5000.00 },
      { name: 'Computador para Modelagem 3D', value: 8500.00 }
    ],
    specs: [
      'Processador i7/Ryzen 7',
      '32GB RAM',
      'RTX 3060 12GB',
      'SSD NVMe 1TB',
      'Monitor 27" QHD',
      'Periféricos profissionais'
    ]
  },
  {
    month: 24,
    investments: [
      { name: 'Upgrade de armazenamento', value: 1200.00 },
      { name: 'Tablet para sketches', value: 2500.00 }
    ]
  }
]
</script>