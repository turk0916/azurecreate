export interface ChartConfig {
  theme: 'light' | 'dark';
  height?: number;
  upColor?: string;
  downColor?: string;
  interval?: string;
}

export interface MarketData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export interface ChartIndicator {
  name: string;
  type: 'ma' | 'ema' | 'rsi' | 'macd';
  params: Record<string, any>;
}