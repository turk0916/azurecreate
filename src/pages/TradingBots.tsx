import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Play, Pause, Settings, AlertTriangle, TrendingUp, Activity, DollarSign } from 'lucide-react';
import { botAPI } from '../services/api';

interface Bot {
  id: string;
  name: string;
  description: string;
  strategy: string;
  status: 'active' | 'inactive' | 'error';
  performance: {
    totalTrades: number;
    successfulTrades: number;
    totalProfit: number;
    winRate: number;
  };
  config: {
    initialCapital: number;
    maxRiskPerTrade: number;
    tradingPair: string;
    stopLoss: number;
    takeProfit: number;
    maxPositions: number;
  };
}

function TradingBots() {
  const [bots, setBots] = useState<Bot[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBots();
  }, []);

  const fetchBots = async () => {
    try {
      const response = await botAPI.getBots();
      setBots(response.data);
    } catch (err) {
      setError('Botlar yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const toggleBotStatus = async (botId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      await botAPI.updateBotStatus(botId, newStatus);
      setBots(bots.map(bot => 
        bot.id === botId ? { ...bot, status: newStatus } : bot
      ));
    } catch (err) {
      setError('Bot durumu güncellenirken hata oluştu');
    }
  };

  const filteredBots = bots.filter(bot => {
    const matchesSearch = bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bot.strategy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || bot.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Trading Botları</h1>
          <p className="mt-1 text-gray-600">Otomatik trading stratejilerinizi yönetin</p>
        </div>
        <Link
          to="/bots/create"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-5 h-5" />
          Yeni Bot Oluştur
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Bot ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="active">Aktif</option>
            <option value="inactive">Pasif</option>
            <option value="error">Hatalı</option>
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-4 mb-6 text-red-600 bg-red-50 rounded-lg">
          <AlertTriangle className="w-5 h-5" />
          {error}
        </div>
      )}

      {/* Bots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBots.map((bot) => (
          <div key={bot.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition">
            {/* Bot Header */}
            <div className="p-6 border-b">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">{bot.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(bot.status)}`}>
                  {bot.status === 'active' ? 'Aktif' :
                   bot.status === 'inactive' ? 'Pasif' : 'Hata'}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{bot.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <Activity className="w-4 h-4 mr-2" />
                {bot.strategy}
              </div>
            </div>

            {/* Performance Stats */}
            <div className="p-6 border-b">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Toplam İşlem</div>
                  <div className="text-lg font-semibold">{bot.performance.totalTrades}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Başarı Oranı</div>
                  <div className="text-lg font-semibold text-green-600">
                    {bot.performance.winRate}%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Toplam Kar</div>
                  <div className="text-lg font-semibold text-green-600">
                    ${bot.performance.totalProfit.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Risk/İşlem</div>
                  <div className="text-lg font-semibold">
                    {bot.config.maxRiskPerTrade}%
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 flex justify-between items-center">
              <button
                onClick={() => toggleBotStatus(bot.id, bot.status)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  bot.status === 'active'
                    ? 'bg-red-100 text-red-600 hover:bg-red-200'
                    : 'bg-green-100 text-green-600 hover:bg-green-200'
                }`}
              >
                {bot.status === 'active' ? (
                  <>
                    <Pause className="w-5 h-5" />
                    Durdur
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Başlat
                  </>
                )}
              </button>
              <Link
                to={`/bots/${bot.id}/settings`}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <Settings className="w-5 h-5" />
                Ayarlar
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredBots.length === 0 && (
        <div className="text-center py-12">
          <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz Bot Yok</h3>
          <p className="text-gray-500 mb-4">
            Trading botları oluşturarak otomatik alım satım yapmaya başlayın
          </p>
          <Link
            to="/bots/create"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus className="w-5 h-5" />
            İlk Botunuzu Oluşturun
          </Link>
        </div>
      )}
    </div>
  );
}

export default TradingBots;