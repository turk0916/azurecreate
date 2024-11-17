import React from 'react';
import { Wallet, PieChart, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import { Line } from 'react-chartjs-2';

function Portfolio() {
  const portfolioData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Portfolio Value',
      data: [100000, 115000, 108000, 125000, 132000, 145000],
      borderColor: 'rgb(59, 130, 246)',
      tension: 0.4
    }]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-500">Total Portfolio Value</div>
            <Wallet className="text-blue-600 w-6 h-6" />
          </div>
          <div className="text-2xl font-bold">₺145,000</div>
          <div className="text-green-600 text-sm">+45% all time</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-500">Today's Profit/Loss</div>
            <PieChart className="text-blue-600 w-6 h-6" />
          </div>
          <div className="text-2xl font-bold text-green-600">+₺2,450</div>
          <div className="text-green-600 text-sm">+1.72% today</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-500">Open Positions</div>
            <Clock className="text-blue-600 w-6 h-6" />
          </div>
          <div className="text-2xl font-bold">8</div>
          <div className="text-blue-600 text-sm">Active trades</div>
        </div>
      </div>

      {/* Portfolio Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Portfolio Performance</h2>
        <Line data={portfolioData} options={{ responsive: true }} />
      </div>

      {/* Open Positions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Open Positions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Symbol</th>
                <th className="text-left py-3 px-4">Position Size</th>
                <th className="text-left py-3 px-4">Entry Price</th>
                <th className="text-left py-3 px-4">Current Price</th>
                <th className="text-left py-3 px-4">P/L</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <PositionRow
                symbol="THYAO"
                size="1000"
                entryPrice="235.40"
                currentPrice="246.80"
                pl="+11,400"
                plPercentage="+4.84"
              />
              <PositionRow
                symbol="GARAN"
                size="2500"
                entryPrice="89.65"
                currentPrice="92.45"
                pl="+7,000"
                plPercentage="+3.12"
              />
              <PositionRow
                symbol="EREGL"
                size="1500"
                entryPrice="46.80"
                currentPrice="45.62"
                pl="-1,770"
                plPercentage="-2.52"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PositionRow({ symbol, size, entryPrice, currentPrice, pl, plPercentage }: {
  symbol: string;
  size: string;
  entryPrice: string;
  currentPrice: string;
  pl: string;
  plPercentage: string;
}) {
  const isProfit = pl.startsWith('+');

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-3 px-4 font-medium">{symbol}</td>
      <td className="py-3 px-4">{size}</td>
      <td className="py-3 px-4">₺{entryPrice}</td>
      <td className="py-3 px-4">₺{currentPrice}</td>
      <td className="py-3 px-4">
        <div className={`flex items-center ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
          {isProfit ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
          ₺{pl} ({plPercentage}%)
        </div>
      </td>
      <td className="py-3 px-4">
        <button className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700 transition">
          Close
        </button>
      </td>
    </tr>
  );
}

export default Portfolio;