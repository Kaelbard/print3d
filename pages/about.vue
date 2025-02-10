<template>
  <div class="min-h-screen bg-gray-900 py-24">
    <div class="container mx-auto px-4">
      <!-- Detailed Investment Section -->
      <section class="mb-24">
        <h2 class="text-4xl font-bold mb-16">Investimento Detalhado</h2>
        <InvestmentDetails />
      </section>

      <!-- Expansion Plan Section -->
      <section class="mb-24">
        <h2 class="text-4xl font-bold mb-16">Plano de Expansão</h2>
        <ExpansionTimeline />
      </section>

      <!-- Risk Analysis Section -->
      <section class="mb-24">
        <h2 class="text-4xl font-bold mb-16">Análise de Riscos</h2>
        <RiskAnalysis />
      </section>

      <!-- Detailed Financial Analysis -->
      <section class="mb-24">
        <h2 class="text-4xl font-bold mb-16">Análise Financeira Detalhada</h2>
        <FinancialAnalysis />
      </section>

      <!-- Technical Specifications -->
      <section class="mb-24">
        <h2 class="text-4xl font-bold mb-16">Especificações Técnicas</h2>
        <TechnicalSpecs />
      </section>
    </div>
  </div>
  <div class="bg-gray-900">
    <Footer />
  </div>
</template>
<script setup lang="ts">
import InvestmentDetails from "~/components/about/InvestmentDetails.vue";
import ExpansionTimeline from "~/components/about/ExpansionTimeline.vue";
import RiskAnalysis from "~/components/about/RiskAnalysis.vue";
import FinancialAnalysis from "~/components/about/FinancialAnalysis.vue";
import TechnicalSpecs from "~/components/about/TechnicalSpecs.vue";
</script>
