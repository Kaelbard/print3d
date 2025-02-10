<template>
  <div class="space-y-12">
    <!-- Análise Trimestral -->
    <div class="bg-gray-800 rounded-xl overflow-hidden">
      <div class="bg-green-600/20 p-6 border-b border-green-500/20">
        <h3 class="text-2xl font-bold text-green-500">Projeção Trimestral - Primeiro Ano</h3>
      </div>

      <div class="p-6 overflow-x-auto">
        <table class="w-full min-w-[600px]">
          <thead>
            <tr class="border-b border-gray-700">
              <th class="py-3 px-4 text-left">Trimestre</th>
              <th class="py-3 px-4 text-right">Unidades</th>
              <th class="py-3 px-4 text-right">Receita Bruta</th>
              <th class="py-3 px-4 text-right">Custos</th>
              <th class="py-3 px-4 text-right">Lucro Líquido</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="quarter in quarterlyProjections" :key="quarter.id"
              class="border-b border-gray-700/50 hover:bg-gray-700/30">
              <td class="py-3 px-4">{{ quarter.id }}</td>
              <td class="py-3 px-4 text-right font-mono">{{ quarter.units }}</td>
              <td class="py-3 px-4 text-right font-mono text-green-400">
                R$ {{ quarter.revenue.toFixed(2) }}
              </td>
              <td class="py-3 px-4 text-right font-mono text-red-400">
                R$ {{ quarter.costs.toFixed(2) }}
              </td>
              <td class="py-3 px-4 text-right font-mono text-blue-400">
                R$ {{ quarter.profit.toFixed(2) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Análise por Produto -->
    <div class="bg-gray-800 rounded-xl overflow-hidden">
      <div class="bg-blue-600/20 p-6 border-b border-blue-500/20">
        <h3 class="text-2xl font-bold text-blue-500">Análise por Produto</h3>
      </div>

      <div class="p-6 overflow-x-auto">
        <table class="w-full min-w-[600px]">
          <thead>
            <tr class="border-b border-gray-700">
              <th class="py-3 px-4 text-left">Produto</th>
              <th class="py-3 px-4 text-right">Custo Total</th>
              <th class="py-3 px-4 text-right">Preço</th>
              <th class="py-3 px-4 text-right">Margem</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in productAnalysis" :key="product.name"
              class="border-b border-gray-700/50 hover:bg-gray-700/30">
              <td class="py-3 px-4">{{ product.name }}</td>
              <td class="py-3 px-4 text-right font-mono text-red-400">
                R$ {{ product.cost.toFixed(2) }}
              </td>
              <td class="py-3 px-4 text-right font-mono text-green-400">
                R$ {{ product.price.toFixed(2) }}
              </td>
              <td class="py-3 px-4 text-right font-mono text-blue-400">
                {{ product.margin }}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const quarterlyProjections = [
  { id: 'T1', units: 150, revenue: 3750.00, costs: 2425.00, profit: 1325.00 },
  { id: 'T2', units: 200, revenue: 5000.00, costs: 3000.00, profit: 2000.00 },
  { id: 'T3', units: 300, revenue: 7500.00, costs: 4200.00, profit: 3300.00 },
  { id: 'T4', units: 400, revenue: 10000.00, costs: 5400.00, profit: 4600.00 }
]

const productAnalysis = [
  { name: 'Miniaturas RPG', cost: 9.50, price: 25.00, margin: 163 },
  { name: 'Tokens Games', cost: 4.00, price: 15.00, margin: 275 },
  { name: 'Figuras Sacras', cost: 14.50, price: 40.00, margin: 176 },
  { name: 'Suportes Celular', cost: 8.80, price: 30.00, margin: 241 },
  { name: 'Peças Reposição', cost: 12.00, price: 35.00, margin: 192 },
  { name: 'Acess. Games', cost: 5.70, price: 20.00, margin: 251 },
  { name: 'Decoração', cost: 17.00, price: 50.00, margin: 194 }
]
</script>