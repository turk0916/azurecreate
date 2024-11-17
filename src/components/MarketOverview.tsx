import React from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface MarketIndex {
  name: string;
  value: string;
  change: string;
  volume: string;
}

function MarketOverview() {
  const indices: MarketIndex[] = [
    {
      name: 'BIST 100',
      value: '9,245.32',
      change: '+1.24%',
      volume: '142.5B'
    },
    {
      name: 'BIST 30',
      value: '10,123.45',
      change: '+1.56%',
      volume: '98.2B'
    },
    {
      name: 'BIST Banka',
      value: '4,567.89',
      change: '+2.12%',
      volume: '45.8B'
    },
    {
      name: 'BIST Sınai',
      value: '7,890.12',
      change: '-0.45%',
      volume: '32.1B'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Piyasa Özeti</h2>
        <div className="flex items-center gap-2 text-sm">
          <Activity className="w-4 h-4 text-blue-600" />
          <span className="text-gray-500">Canlı</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {indices.map((index) => (
          <div
            key={index.name}
            className="p-4 border rounded-lg hover:shadow-md transition"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{index.name}</span>
              {index.change.startsWith('+') ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
            </div>
            <div className="text-2xl font-bold mb-1">{index.value}</div>
            <div className="flex items-center justify-between text-sm">
              <span className={index.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                {index.change}
              </span>
              <span className="text-gray-500">
                Hacim: {index.volume}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketOverview;