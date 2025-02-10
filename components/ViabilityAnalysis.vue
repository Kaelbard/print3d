<template>
    <div class="py-16">
        <div class="container mx-auto px-4">
            <h2 class="text-4xl font-bold mb-16 text-center">Análise de Viabilidade</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Vantagens Card -->
                <div
                    class="bg-gray-800 rounded-xl overflow-hidden transition-transform hover:scale-[1.02] duration-300">
                    <div class="bg-emerald-600/20 p-6 border-b border-emerald-500/20">
                        <div class="flex items-center gap-3">
                            <CheckCircle class="w-6 h-6 text-emerald-500" />
                            <h3 class="text-2xl font-bold text-emerald-500">Vantagens</h3>
                        </div>
                    </div>

                    <div class="p-6">
                        <ul class="space-y-4">
                            <li v-for="(advantage, index) in advantages" :key="index"
                                class="flex items-start gap-3 group">
                                <ChevronRight
                                    class="w-5 h-5 mt-0.5 text-emerald-500 group-hover:translate-x-1 transition-transform" />
                                <span class="text-gray-300 group-hover:text-white transition-colors">
                                    {{ advantage }}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Desafios Card -->
                <div
                    class="bg-gray-800 rounded-xl overflow-hidden transition-transform hover:scale-[1.02] duration-300">
                    <div class="bg-red-600/20 p-6 border-b border-red-500/20">
                        <div class="flex items-center gap-3">
                            <AlertCircle class="w-6 h-6 text-red-500" />
                            <h3 class="text-2xl font-bold text-red-500">Desafios</h3>
                        </div>
                    </div>

                    <div class="p-6">
                        <ul class="space-y-4">
                            <li v-for="(challenge, index) in challenges" :key="index"
                                class="flex items-start gap-3 group">
                                <AlertTriangle
                                    class="w-5 h-5 mt-0.5 text-red-500 group-hover:translate-x-1 transition-transform" />
                                <span class="text-gray-300 group-hover:text-white transition-colors">
                                    {{ challenge }}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    CheckCircle,
    AlertCircle,
    ChevronRight,
    AlertTriangle
} from 'lucide-vue-next'

const advantages = [
    'Baixo investimento inicial comparado a outros negócios',
    'Alta margem de lucro em produtos personalizados',
    'Mercado em crescimento exponencial',
    'Diversificação de produtos e nichos',
    'Baixo custo operacional fixo',
    'Possibilidade de automação',
    'Crescimento escalável'
]

const challenges = [
    'Curva de aprendizado técnico',
    'Necessidade de conhecimento em modelagem 3D',
    'Concorrência crescente',
    'Dependência de fornecedores de filamento',
    'Tempo de produção relativamente longo',
    'Manutenção regular necessária',
    'Possibilidade de falhas de impressão'
]
</script>