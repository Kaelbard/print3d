<template>
  <div class="bg-gray-800 p-4 sm:p-6 rounded-xl">
    <h3 class="text-lg sm:text-xl font-bold mb-4">
      Projeção Mensal - Primeiro Ano
    </h3>
    <div class="h-64 sm:h-96">
      <ClientOnly>
        <Line :data="chartData" :options="chartOptions" />
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";
import type { ChartData, ChartOptions } from "chart.js";
import { useMarketStore } from "~/stores/marketStore";
import { useDevice } from "~/composables/useDevice";

// Registrar componentes do Chart.js apenas no cliente
if (process.client) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
}

const { isMobile } = useDevice();
const marketStore = useMarketStore();

const chartData = computed<ChartData<"line">>(() => ({
  labels: marketStore.monthlyData.map((item) => item.month),
  datasets: [
    {
      label: "Receita (R$)",
      data: marketStore.monthlyData.map((item) => item.revenue),
      borderColor: "#4CAF50",
      backgroundColor: "#4CAF5020",
      tension: 0.4,
      fill: true,
    },
    {
      label: "Custos (R$)",
      data: marketStore.monthlyData.map((item) => item.costs),
      borderColor: "#f44336",
      backgroundColor: "#f4433620",
      tension: 0.4,
      fill: true,
    },
    {
      label: "Unidades",
      data: marketStore.monthlyData.map((item) => item.units),
      borderColor: "#2196F3",
      backgroundColor: "#2196F320",
      tension: 0.4,
      fill: true,
      yAxisID: "y1",
    },
  ],
}));

const chartOptions = computed<ChartOptions<"line">>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  scales: {
    y: {
      type: "linear" as const,
      display: true,
      position: "left" as const,
      grid: {
        color: "#ffffff20",
      },
      ticks: {
        color: "#ffffff80",
      },
    },
    y1: {
      type: "linear" as const,
      display: true,
      position: "right" as const,
      grid: {
        drawOnChartArea: false,
      },
      ticks: {
        color: "#ffffff80",
      },
    },
    x: {
      grid: {
        color: "#ffffff20",
      },
      ticks: {
        color: "#ffffff80",
      },
    },
  },
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        color: "#ffffff80",
        boxWidth: isMobile.value ? 10 : 40,
        font: {
          size: isMobile.value ? 10 : 12,
        },
      },
    },
  },
}));
</script>
