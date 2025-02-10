// types/market.ts
export interface MarketAnalysis {
    category: string
    value: string
    details: string
  }
  
  export interface MonthlyData {
    month: string
    revenue: number
    costs: number
    units: number
  }
  
  export interface CostBreakdown {
    name: string
    Material: number
    Energia: number
    'Mão de Obra': number
    'Taxa de Falha': number
    Desgaste: number
  }