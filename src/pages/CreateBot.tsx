import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Settings, TrendingUp, AlertTriangle, DollarSign, Shield, Target, BarChart } from 'lucide-react';

const STRATEGIES = [
  {
    id: 'trend_following',
    name: 'Trend Takibi',
    description: 'Uzun vadeli trend hareketlerini takip eder',
    riskLevel: 'medium',
    minCapital: 5000,
    features: ['Stop-loss', 'Take-profit', 'Trend analizi']
  },
  {
    id: 'scalping',
    name: 'Scalping',
    description: 'Kısa vadeli fiyat hareketlerinden kazanç sağlar',
    riskLevel: 'high',
    minCapital: 7500,
    features: ['Yüksek frekans', 'Düşük marj', 'Hızlı pozisyon']
  },
  {
    id: 'mean_reversion',
    name: 'Ortalamaya Dönüş',
    description: 'Fiyat anomalilerini tespit eder',
    riskLevel: 'medium',
    minCapital: 10000,
    features: ['İstatistiksel analiz', 'Volatilite takibi']
  },
  {
    id: 'grid_trading',
    name: 'Grid Trading',
    description: 'Belirli fiyat aralıklarında alım-satım yapar',
    riskLevel: 'low',
    minCapital: 15000,
    features: ['Otomatik grid', 'Risk dağıtımı']
  }
];

function CreateBot() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    strategy: '',
    initialCapital: '',
    maxRiskPerTrade: '',
    tradingPair: 'BTCUSDT',
    stopLoss: '',
    takeProfit: '',
    maxPositions: '3',
    riskLevel: 'medium'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/bots');
    } catch (err) {
      setError('Bot oluşturulurken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const selectedStrategy = STRATEGIES.find(s => s.id === formData.strategy);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Yeni Trading Botu Oluştur</h1>
        <p className="mt-2 text-gray-600">
          Stratejinizi seçin ve gelişmiş trading özelliklerini yapılandırın
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="flex items-center gap-2 p-4 text-sm text-red-600 bg-red-50 rounded-lg">
              <AlertTriangle className="w-5 h-5" />
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bot İsmi
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Örn: BTC Trend Takipçisi"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trading Stratejisi
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {STRATEGIES.map(strategy => (
                <div
                  key={strategy.id}
                  className={`cursor-pointer border rounded-lg p-4 ${
                    formData.strategy === strategy.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, strategy: strategy.id }))}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{strategy.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      strategy.riskLevel === 'low' ? 'bg-green-100 text-green-800' :
                      strategy.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {strategy.riskLevel === 'low' ? 'Düşük Risk' :
                       strategy.riskLevel === 'medium' ? 'Orta Risk' :
                       'Yüksek Risk'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{strategy.description}</p>
                  <div className="text-sm text-gray-500">
                    Min. Sermaye: ₺{strategy.minCapital.toLocaleString()}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {strategy.features.map(feature => (
                      <span key={feature} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Başlangıç Sermayesi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={formData.initialCapital}
                  onChange={e => setFormData(prev => ({ ...prev, initialCapital: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="5000"
                  min="5000"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                İşlem Başına Maksimum Risk (%)
              </label>
              <input
                type="number"
                value={formData.maxRiskPerTrade}
                onChange={e => setFormData(prev => ({ ...prev, maxRiskPerTrade: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="1"
                min="0.1"
                max="10"
                step="0.1"
                required
              />
            </div>
          </div>

          {/* Gelişmiş Trading Özellikleri */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium mb-4">Gelişmiş Trading Özellikleri</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stop-Loss (%)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Shield className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    value={formData.stopLoss}
                    onChange={e => setFormData(prev => ({ ...prev, stopLoss: e.target.value }))}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="2"
                    min="0.1"
                    max="20"
                    step="0.1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Take-Profit (%)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Target className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    value={formData.takeProfit}
                    onChange={e => setFormData(prev => ({ ...prev, takeProfit: e.target.value }))}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="5"
                    min="0.1"
                    max="50"
                    step="0.1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maksimum Açık Pozisyon
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BarChart className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    value={formData.maxPositions}
                    onChange={e => setFormData(prev => ({ ...prev, maxPositions: e.target.value }))}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="3"
                    min="1"
                    max="10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trading Çifti
                </label>
                <select
                  value={formData.tradingPair}
                  onChange={e => setFormData(prev => ({ ...prev, tradingPair: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="BTCUSDT">BTC/USDT</option>
                  <option value="ETHUSDT">ETH/USDT</option>
                  <option value="BNBUSDT">BNB/USDT</option>
                  <option value="ADAUSDT">ADA/USDT</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/bots')}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Bot className="animate-spin h-5 w-5" />
                  Bot Oluşturuluyor...
                </>
              ) : (
                <>
                  <Bot className="h-5 w-5" />
                  Bot Oluştur
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateBot;