<template>
    <div class="space-y-8">
        <KPICards />

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <MonthlyRevenueChart />
            <CostBreakdownChart />
        </div>
    </div>
</template>

<script setup lang="ts">
import KPICards from './KPICards.vue'
import MonthlyRevenueChart from './MonthlyRevenueChart.vue'
import CostBreakdownChart from './CostBreakdownChart.vue'
</script>