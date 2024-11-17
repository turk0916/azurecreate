import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import { CreditCard, Bitcoin, AlertTriangle, ArrowRight } from 'lucide-react';

function Withdraw() {
  const [amount, setAmount] = useState('');
  const [bankInfo, setBankInfo] = useState({
    accountHolder: '',
    iban: '',
    bankName: ''
  });
  const [cryptoInfo, setCryptoInfo] = useState({
    address: '',
    network: 'TRC20'
  });
  const [error, setError] = useState('');

  const handleBankWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !bankInfo.iban || !bankInfo.accountHolder || !bankInfo.bankName) {
      setError('Lütfen tüm alanları doldurun');
      return;
    }
    // TODO: Implement bank withdrawal logic
  };

  const handleCryptoWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !cryptoInfo.address) {
      setError('Lütfen tüm alanları doldurun');
      return;
    }
    // TODO: Implement crypto withdrawal logic
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Para Çekme</h1>

      <Tabs defaultValue="bank" className="space-y-6">
        <TabsList className="bg-white p-1 rounded-lg shadow-sm border">
          <TabsTrigger value="bank" className="flex items-center gap-2 px-4 py-2">
            <CreditCard className="w-5 h-5" />
            Banka Havalesi
          </TabsTrigger>
          <TabsTrigger value="crypto" className="flex items-center gap-2 px-4 py-2">
            <Bitcoin className="w-5 h-5" />
            Kripto Para
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bank">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <form onSubmit={handleBankWithdraw} className="space-y-6">
              {error && (
                <div className="flex items-center gap-2 p-4 text-sm text-red-600 bg-red-50 rounded-lg">
                  <AlertTriangle className="w-5 h-5" />
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Çekilecek Tutar (TL)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="1000"
                  min="100"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hesap Sahibi
                </label>
                <input
                  type="text"
                  value={bankInfo.accountHolder}
                  onChange={(e) => setBankInfo({ ...bankInfo, accountHolder: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Ad Soyad"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  IBAN
                </label>
                <input
                  type="text"
                  value={bankInfo.iban}
                  onChange={(e) => setBankInfo({ ...bankInfo, iban: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="TR00 0000 0000 0000 0000 0000 00"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banka Adı
                </label>
                <input
                  type="text"
                  value={bankInfo.bankName}
                  onChange={(e) => setBankInfo({ ...bankInfo, bankName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Banka adı"
                  required
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Önemli Bilgiler</h4>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• Para çekme işlemi 24 saat içinde tamamlanır</li>
                  <li>• Minimum çekim tutarı 100 TL'dir</li>
                  <li>• Hesap sahibi adı ile üyelik adı aynı olmalıdır</li>
                </ul>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Para Çekme Talebini Oluştur
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </TabsContent>

        <TabsContent value="crypto">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <form onSubmit={handleCryptoWithdraw} className="space-y-6">
              {error && (
                <div className="flex items-center gap-2 p-4 text-sm text-red-600 bg-red-50 rounded-lg">
                  <AlertTriangle className="w-5 h-5" />
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Çekilecek Tutar (USDT)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="100"
                  min="10"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cüzdan Adresi
                </label>
                <input
                  type="text"
                  value={cryptoInfo.address}
                  onChange={(e) => setCryptoInfo({ ...cryptoInfo, address: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Kripto cüzdan adresi"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ağ
                </label>
                <select
                  value={cryptoInfo.network}
                  onChange={(e) => setCryptoInfo({ ...cryptoInfo, network: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="TRC20">Tron (TRC20)</option>
                  <option value="ERC20">Ethereum (ERC20)</option>
                  <option value="BEP20">Binance Smart Chain (BEP20)</option>
                </select>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Önemli Bilgiler</h4>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• Çekim işlemi 30-60 dakika içinde tamamlanır</li>
                  <li>• Minimum çekim tutarı 10 USDT'dir</li>
                  <li>• Doğru ağı seçtiğinizden emin olun</li>
                </ul>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Para Çekme Talebini Oluştur
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Withdraw;