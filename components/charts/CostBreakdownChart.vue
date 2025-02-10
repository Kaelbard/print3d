<template>
    <div class="bg-gray-800 p-6 rounded-xl">
      <h3 class="text-xl font-bold mb-4">Composição de Custos por Produto</h3>
      <div class="h-96">
        <Bar 
          :data="chartData"
          :options="chartOptions"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js'
  import { Bar } from 'vue-chartjs'

  import type { ChartData, ChartOptions } from 'chart.js'
  import { useMarketStore } from '~/stores/marketStore'
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  )
  
  const marketStore = useMarketStore()
  
  const chartData = computed<ChartData<'bar'>>(() => ({
    labels: marketStore.costBreakdown.map(item => item.name),
    datasets: [
      {
        label: 'Material',
        data: marketStore.costBreakdown.map(item => item.Material),
        backgroundColor: '#2196F3',
      },
      {
        label: 'Energia',
        data: marketStore.costBreakdown.map(item => item.Energia),
        backgroundColor: '#FF9800',
      },
      {
        label: 'Mão de Obra',
        data: marketStore.costBreakdown.map(item => item['Mão de Obra']),
        backgroundColor: '#4CAF50',
      },
      {
        label: 'Taxa de Falha',
        data: marketStore.costBreakdown.map(item => item['Taxa de Falha']),
        backgroundColor: '#f44336',
      },
      {
        label: 'Desgaste',
        data: marketStore.costBreakdown.map(item => item.Desgaste),
        backgroundColor: '#9C27B0',
      }
    ]
  }))
  
  const chartOptions = computed<ChartOptions<'bar'>>(() => ({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        grid: {
          color: '#ffffff20'
        },
        ticks: {
          color: '#ffffff80'
        }
      },
      y: {
        stacked: true,
        grid: {
          color: '#ffffff20'
        },
        ticks: {
          color: '#ffffff80'
        }
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#ffffff80'
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: R$ ${context.raw}`
          }
        }
      }
    }
  }))
  </script>