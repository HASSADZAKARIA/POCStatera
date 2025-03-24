export interface MarketIndicator {
  type: string;
  indicator: string;
  sources: string;
  usage: string;
}

export interface KPICard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

export interface PerformanceIndicator {
  name: string;
  value: string;
  comparison: string;
  status: 'success' | 'warning' | 'danger';
}

export interface MarketData {
  label: string;
  value: string;
  unit?: string;
  trend?: number;
  history?: { date: string; value: number }[];
}

export interface Recommendation {
  type: 'improvement' | 'warning' | 'info';
  message: string;
  priority: number;
  impact: 'high' | 'medium' | 'low';
}

export type View = 'dashboard' | 'accounting' | 'indicators' | 'market' | 'recommendations' | 'settings';

export interface ImportedData {
  date: string;
  value: number;
  category: string;
}

export interface ChartData {
  name: string;
  value: number;
}

export interface Settings {
  displayMode: 'light' | 'dark';
  currency: 'EUR' | 'USD';
  notifications: boolean;
  autoRefresh: boolean;
  refreshInterval: number;
  language: 'fr' | 'en';
  companyInfo: {
    name: string;
    sector: string;
    size: string;
    region: string;
  };
  dataPreferences: {
    showPercentages: boolean;
    showTrends: boolean;
    showPredictions: boolean;
    chartType: 'line' | 'bar' | 'area';
  };
}