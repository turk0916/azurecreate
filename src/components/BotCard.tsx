import React from 'react';
import { Bot, Zap, Settings, Play, Pause } from 'lucide-react';

interface BotCardProps {
  name: string;
  description: string;
  strategy: string;
  performance: string;
  status: 'active' | 'inactive';
  risk: 'low' | 'medium' | 'high';
}

function BotCard({ name, description, strategy, performance, status, risk }: BotCardProps) {
  const riskColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <Bot className="w-8 h-8 text-blue-600 mr-3" />
          <div>
            <h3 className="text-xl font-semibold">{name}</h3>
            <p className="text-gray-600">{strategy}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${riskColors[risk]}`}>
          {risk.charAt(0).toUpperCase() + risk.slice(1)} Risk
        </span>
      </div>
      
      <p className="text-gray-600 mb-4">{description}</p>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Zap className="w-5 h-5 text-blue-600 mr-2" />
          <span className="text-gray-700">Performance: </span>
          <span className="ml-1 font-semibold text-green-600">{performance}</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2 text-gray-700">Status:</span>
          <span className={`px-2 py-1 rounded-full text-sm ${
            status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </div>

      <div className="flex justify-between gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          {status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {status === 'active' ? 'Stop Bot' : 'Start Bot'}
        </button>
        <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
          <Settings className="w-4 h-4" />
          Configure
        </button>
      </div>
    </div>
  );
}

export default BotCard;