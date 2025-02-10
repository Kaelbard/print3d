// components/about/TechnicalSpecs.vue
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <!-- Equipamento Principal -->
    <div class="bg-gray-800 rounded-xl overflow-hidden">
      <div class="bg-purple-600/20 p-6 border-b border-purple-500/20">
        <div class="flex items-center gap-3">
          <Printer3d class="w-6 h-6 text-purple-500" />
          <h3 class="text-2xl font-bold text-purple-500">Bambu Lab A1 Mini</h3>
        </div>
      </div>

      <div class="p-6">
        <div class="space-y-6">
          <div v-for="(specs, category) in printerSpecs" :key="category" class="space-y-3">
            <h4 class="font-semibold text-lg">{{ category }}</h4>
            <ul class="space-y-2">
              <li v-for="(spec, index) in specs" :key="index" class="flex items-start gap-2 text-gray-300">
                <ChevronRight class="w-4 h-4 mt-1 text-purple-400" />
                <span>{{ spec }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Capacidades de Produção -->
    <div class="bg-gray-800 rounded-xl overflow-hidden">
      <div class="bg-blue-600/20 p-6 border-b border-blue-500/20">
        <div class="flex items-center gap-3">
          <Settings class="w-6 h-6 text-blue-500" />
          <h3 class="text-2xl font-bold text-blue-500">Capacidades de Produção</h3>
        </div>
      </div>

      <div class="p-6">
        <div class="space-y-6">
          <div v-for="(capability, category) in productionCapabilities" :key="category" class="space-y-3">
            <h4 class="font-semibold text-lg">{{ category }}</h4>
            <ul class="space-y-2">
              <li v-for="(cap, index) in capability" :key="index" class="flex items-start gap-2 text-gray-300">
                <CheckCircle2 class="w-4 h-4 mt-1 text-blue-400" />
                <span>{{ cap }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Printer, ChevronRight, Settings, CheckCircle2 } from 'lucide-vue-next'

const printerSpecs = {
  'Especificações Gerais': [
    'Tecnologia FDM (Fused Deposition Modeling)',
    'Volume de impressão: 256 x 256 x 256mm',
    'Conectividade Wi-Fi e USB',
    'Display LCD touch colorido'
  ],
  'Qualidade de Impressão': [
    'Resolução de camada: 0.1-0.3mm',
    'Precisão XY: 0.1mm',
    'Velocidade máxima: 500mm/s',
    'Aceleração máxima: 20000mm/s²'
  ],
  'Materiais Suportados': [
    'PLA/PLA+',
    'PETG',
    'TPU',
    'ABS',
    'PA (Nylon)',
    'PC (Policarbonato)'
  ],
  'Recursos Avançados': [
    'Sistema de nivelamento automático',
    'Câmera de monitoramento em tempo real',
    'Detecção de falhas de impressão',
    'Sistema de extrusão dupla',
    'Sensor de filamento'
  ]
}

const productionCapabilities = {
  'Capacidade Diária': [
    'Até 10 miniaturas médias por dia',
    'Até 20 peças pequenas por dia',
    'Tempo médio de impressão: 2-6 horas por peça',
    'Operação 24/7 com monitoramento remoto'
  ],
  'Qualidade e Acabamento': [
    'Acabamento de alta qualidade com camadas quase invisíveis',
    'Suporte a detalhes finos até 0.4mm',
    'Pós-processamento profissional disponível',
    'Controle de qualidade em todas as peças'
  ],
  'Flexibilidade': [
    'Personalização completa de designs',
    'Múltiplos materiais em uma única impressão',
    'Protótipos funcionais em 24-48 horas',
    'Escala ajustável para diferentes tamanhos'
  ]
}
</script>