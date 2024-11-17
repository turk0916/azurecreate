import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { useWebSocketStore } from '../services/websocket';

function MarketTicker() {
  const { marketData, isConnected, error } = useWebSocketStore();

  const formatPrice = (price: string) => {
    const num = parseFloat(price);
    return num.toLocaleString('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const formatVolume = (volume: string) => {
    if (volume.endsWith('M')) return volume;
    if (volume.endsWith('K')) return volume;
    const num = parseFloat(volume);
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
    return volume;
  };

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg flex items-center gap-2 text-red-600">
        <AlertCircle className="w-5 h-5" />
        <span>{error}</span>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="bg-yellow-50 p-4 rounded-lg flex items-center gap-2 text-yellow-600">
        <AlertCircle className="w-5 h-5" />
        <span>Piyasa verileri yükleniyor...</span>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sembol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Son Fiyat
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                24s Değişim
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                24s Hacim
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.entries(marketData).map(([symbol, data]) => (
              <tr key={symbol} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {symbol}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    ₺{formatPrice(data.price)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm flex items-center gap-1 ${
                    data.change24h.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {data.change24h.startsWith('+') ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {data.change24h}%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatVolume(data.volume)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MarketTicker;