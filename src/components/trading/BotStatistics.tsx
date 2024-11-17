import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';

interface BotStatisticsProps {
  stats: {
    totalTrades: number;
    successfulTrades: number;
    totalProfit: number;
    winRate: number;
    averageProfit: number;
    maxDrawdown: number;
  };
}

function BotStatistics({ stats }: BotStatisticsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Toplam İşlem</h3>
            <p className="text-3xl font-bold">{stats.totalTrades}</p>
          </div>
          <Activity className="w-8 h-8 text-blue-600" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Başarılı:</span>
          <span className="text-sm font-medium">{stats.successfulTrades}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Toplam Kar</h3>
            <p className="text-3xl font-bold text-green-600">
              ${stats.totalProfit.toFixed(2)}
            </p>
          </div>
          <DollarSign className="w-8 h-8 text-green-600" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Ort. Kar:</span>
          <span className="text-sm font-medium">${stats.averageProfit.toFixed(2)}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Başarı Oranı</h3>
            <p className="text-3xl font-bold">{stats.winRate}%</p>
          </div>
          {stats.winRate >= 50 ? (
            <TrendingUp className="w-8 h-8 text-green-600" />
          ) : (
            <TrendingDown className="w-8 h-8 text-red-600" />
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Max Drawdown:</span>
          <span className="text-sm font-medium text-red-600">
            {stats.maxDrawdown}%
          </span>
        </div>
      </div>
    </div>
  );
}

export default BotStatistics;