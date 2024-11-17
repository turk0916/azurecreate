import React, { useState } from 'react';
import { TrendingUp, Users, Star, Share2 } from 'lucide-react';

interface TradingSignal {
  id: string;
  user: string;
  symbol: string;
  type: 'long' | 'short';
  entry: number;
  target: number;
  stopLoss: number;
  description: string;
  timestamp: Date;
  likes: number;
}

function SignalSharing() {
  const [signals, setSignals] = useState<TradingSignal[]>([
    {
      id: '1',
      user: 'ProTrader',
      symbol: 'BTCUSDT',
      type: 'long',
      entry: 52000,
      target: 55000,
      stopLoss: 50000,
      description: 'Güçlü destek seviyesinden alım fırsatı',
      timestamp: new Date(),
      likes: 24
    }
  ]);

  const handleLike = (signalId: string) => {
    setSignals(signals.map(signal => 
      signal.id === signalId 
        ? { ...signal, likes: signal.likes + 1 }
        : signal
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Trading Sinyalleri</h2>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          <Share2 className="w-5 h-5" />
          Sinyal Paylaş
        </button>
      </div>

      <div className="space-y-6">
        {signals.map((signal) => (
          <div key={signal.id} className="border rounded-lg p-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{signal.user}</span>
                  <span className="text-sm text-gray-500">
                    {signal.timestamp.toLocaleString()}
                  </span>
                </div>
                <div className="text-2xl font-bold mt-1">{signal.symbol}</div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                signal.type === 'long' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {signal.type === 'long' ? 'LONG' : 'SHORT'}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-500">Giriş</div>
                <div className="font-medium">${signal.entry}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Hedef</div>
                <div className="font-medium">${signal.target}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Stop Loss</div>
                <div className="font-medium">${signal.stopLoss}</div>
              </div>
            </div>

            <p className="text-gray-600 mb-4">{signal.description}</p>

            <div className="flex items-center justify-between">
              <button
                onClick={() => handleLike(signal.id)}
                className="flex items-center gap-2 text-gray-500 hover:text-blue-600"
              >
                <Star className="w-5 h-5" />
                <span>{signal.likes}</span>
              </button>
              <div className="flex items-center gap-2 text-gray-500">
                <Users className="w-5 h-5" />
                <span>24 Takipçi</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SignalSharing;