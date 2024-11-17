import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Activity, AlertTriangle } from 'lucide-react';

interface Indicator {
  name: string;
  value: number;
  signal: 'buy' | 'sell' | 'neutral';
  description: string;
}

function TechnicalAnalysis({ symbol }: { symbol: string }) {
  const [timeframe, setTimeframe] = useState('1D');
  const [indicators, setIndicators] = useState<Indicator[]>([
    {
      name: 'RSI',
      value: 65.4,
      signal: 'buy',
      description: '14 periyot RSI göstergesi aşırı alım bölgesine yakın'
    },
    {
      name: 'MACD',
      value: 0.245,
      signal: 'buy',
      description: 'MACD çizgisi sinyal çizgisini yukarı kesti'
    },
    {
      name: 'Bollinger',
      value: 125.45,
      signal: 'neutral',
      description: 'Fiyat Bollinger bantları içinde hareket ediyor'
    },
    {
      name: 'Momentum',
      value: 102.3,
      signal: 'buy',
      description: 'Güçlü yukarı yönlü momentum'
    }
  ]);

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'buy':
        return 'text-green-600';
      case 'sell':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getSignalIcon = (signal: string) => {
    switch (signal) {
      case 'buy':
        return <TrendingUp className="w-4 h-4" />;
      case 'sell':
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Timeframe Seçimi */}
      <div className="flex gap-2">
        {['5m', '15m', '1H', '4H', '1D', '1W'].map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={`px-3 py-1 rounded-lg ${
              timeframe === tf
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tf}
          </button>
        ))}
      </div>

      {/* Göstergeler Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {indicators.map((indicator) => (
          <div
            key={indicator.name}
            className="p-4 border rounded-lg hover:shadow-md transition"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{indicator.name}</span>
              <div className={`flex items-center gap-1 ${getSignalColor(indicator.signal)}`}>
                {getSignalIcon(indicator.signal)}
                <span className="text-sm capitalize">{indicator.signal}</span>
              </div>
            </div>
            <div className="text-2xl font-bold mb-1">{indicator.value}</div>
            <p className="text-sm text-gray-500">{indicator.description}</p>
          </div>
        ))}
      </div>

      {/* Sinyal Özeti */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-blue-600 mt-1" />
          <div>
            <h4 className="font-medium text-blue-800">Teknik Analiz Özeti</h4>
            <p className="text-sm text-blue-600 mt-1">
              Göstergeler güçlü alım sinyali veriyor. RSI ve MACD pozitif momentumu destekliyor.
              Stop-loss seviyesi: 120.50, Hedef fiyat: 135.80
            </p>
          </div>
        </div>
      </div>

      {/* AI Tahminleri */}
      <div className="border rounded-lg p-4">
        <h3 className="font-medium mb-4">Yapay Zeka Tahminleri</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Kısa Vadeli (1-3 gün)</span>
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-medium">Yükseliş</span>
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-600" style={{ width: '75%' }}></div>
              </div>
              <span className="text-sm">75%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span>Orta Vadeli (1-2 hafta)</span>
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-medium">Yükseliş</span>
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-600" style={{ width: '65%' }}></div>
              </div>
              <span className="text-sm">65%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span>Uzun Vadeli (1-3 ay)</span>
            <div className="flex items-center gap-2">
              <span className="text-yellow-600 font-medium">Nötr</span>
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-600" style={{ width: '55%' }}></div>
              </div>
              <span className="text-sm">55%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechnicalAnalysis;