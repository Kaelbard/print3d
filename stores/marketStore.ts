import { defineStore } from "pinia";
import type {
  MonthlyData,
  MarketAnalysis,
  CostBreakdown,
} from "~/types/market";
export const useMarketStore = defineStore("market", {
  state: () => ({
    monthlyData: [] as MonthlyData[],
    marketAnalysis: [] as MarketAnalysis[],
    costBreakdown: [] as CostBreakdown[],
  }),
  actions: {
    initializeData() {
      this.monthlyData = [
        { month: "Jan", revenue: 3750, costs: 2275, units: 50 },
        { month: "Fev", revenue: 4500, costs: 2530, units: 60 }, // Crescimento orgânico
        { month: "Mar", revenue: 5250, costs: 2785, units: 70 }, // Expansão de portfólio
        { month: "Abr", revenue: 6750, costs: 3040, units: 90 }, // Páscoa (figuras sacras)
        { month: "Mai", revenue: 7500, costs: 3295, units: 100 }, // Crescimento constante
        { month: "Jun", revenue: 9000, costs: 3550, units: 120 }, // Nova impressora
        { month: "Jul", revenue: 11250, costs: 3805, units: 150 }, // Férias (jogos)
        { month: "Ago", revenue: 13500, costs: 4060, units: 180 }, // Alta demanda
        { month: "Set", revenue: 15000, costs: 4315, units: 200 }, // Estabilização
        { month: "Out", revenue: 18750, costs: 4570, units: 250 }, // Halloween
        { month: "Nov", revenue: 22500, costs: 4825, units: 300 }, // Black Friday
        { month: "Dez", revenue: 26250, costs: 11425, units: 350 }, // Natal + Investimentos
        // ... rest of the monthly data
      ];

      this.marketAnalysis = [
        {
          category: "Crescimento do Mercado",
          value: "25.9%",
          details: "Taxa de crescimento anual (CAGR) 2024-2025",
        },
        {
          category: "Tamanho do Mercado",
          value: "R$ 2.8B",
          details: "Mercado brasileiro de impressão 3D em 2024",
        },
        {
          category: "Demanda Setorial",
          value: "38%",
          details: "Aumento na demanda por produtos personalizados",
        },
        // ... rest of the market analysis
      ];

      this.costBreakdown = [
        {
          name: "Miniaturas RPG",
          Material: 3.5,
          Energia: 0.8,
          "Mão de Obra": 4.0,
          "Taxa de Falha": 0.7,
          Desgaste: 0.5,
        },
        {
          name: "Tokens Games",
          Material: 1.2,
          Energia: 0.3,
          "Mão de Obra": 2.0,
          "Taxa de Falha": 0.3,
          Desgaste: 0.2,
        },
        {
          name: "Figuras Sacras",
          Material: 5.0,
          Energia: 1.5,
          "Mão de Obra": 6.0,
          "Taxa de Falha": 1.2,
          Desgaste: 0.8,
        },
        {
          name: "Suportes",
          Material: 4.0,
          Energia: 0.8,
          "Mão de Obra": 3.0,
          "Taxa de Falha": 0.6,
          Desgaste: 0.4,
        },
        {
          name: "Peças Reposição",
          Material: 4.5,
          Energia: 1.0,
          "Mão de Obra": 5.0,
          "Taxa de Falha": 1.0,
          Desgaste: 0.5,
        },
        // ... rest of the cost breakdown
      ];
    },
  },
});
