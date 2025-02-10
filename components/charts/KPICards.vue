<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div
      v-for="(kpi, index) in kpis"
      :key="index"
      class="bg-gray-800 p-4 sm:p-6 rounded-xl hover:bg-gray-700 transition-colors"
    >
      <div class="flex items-center justify-between mb-3 sm:mb-4">
        <h3 class="text-base sm:text-lg font-medium text-gray-300">
          {{ kpi.title }}
        </h3>
        <component :is="kpi.icon" class="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
      </div>
      <p class="text-xl sm:text-2xl font-bold">{{ kpi.value }}</p>
      <p class="text-xs sm:text-sm text-gray-400 mt-2">{{ kpi.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TrendingUp, DollarSign, Target, Printer } from "lucide-vue-next";

const kpis = [
  {
    title: "Investimento Inicial",
    value: "R$ 6.350,00",
    description: "Equipamentos e setup inicial",
    icon: DollarSign,
  },
  {
    title: "ROI Esperado",
    value: "8-12 meses",
    description: "Tempo de retorno do investimento",
    icon: TrendingUp,
  },
  {
    title: "Margem Média",
    value: "213%",
    description: "Margem de lucro sobre custos",
    icon: Target,
  },
  {
    title: "Capacidade",
    value: "800 un/mês",
    description: "Capacidade máxima de produção",
    icon: Printer,
  },
];
</script>
