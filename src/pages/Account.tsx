import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import { CreditCard, User, History, Lock, Bell, Wallet, Key as KeyIcon } from 'lucide-react';

function Account() {
  const [balance, setBalance] = useState(16420.50);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Balance Overview */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-gray-500 mb-1">Kullanılabilir Bakiye</h3>
            <div className="text-3xl font-bold">${balance.toFixed(2)}</div>
          </div>
          <div className="flex gap-4">
            <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Para Yatır
            </button>
            <button className="flex-1 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
              Para Çek
            </button>
          </div>
        </div>
      </div>

      {/* Account Settings Tabs */}
      <div className="bg-white rounded-xl shadow-lg">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="border-b">
            <TabsTrigger value="profile" className="flex items-center gap-2 px-6 py-3">
              <User className="w-4 h-4" />
              Profil
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2 px-6 py-3">
              <CreditCard className="w-4 h-4" />
              Ödeme Yöntemleri
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2 px-6 py-3">
              <History className="w-4 h-4" />
              İşlem Geçmişi
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2 px-6 py-3">
              <Lock className="w-4 h-4" />
              Güvenlik
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="p-6">
            <h2 className="text-xl font-semibold mb-6">Profil Ayarları</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Adresi
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Saat Dilimi
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>UTC+03:00 - İstanbul</option>
                  <option>UTC+00:00 - Londra</option>
                  <option>UTC-05:00 - New York</option>
                  <option>UTC+08:00 - Singapur</option>
                </select>
              </div>
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Değişiklikleri Kaydet
              </button>
            </form>
          </TabsContent>

          <TabsContent value="payment" className="p-6">
            <h2 className="text-xl font-semibold mb-6">Ödeme Yöntemleri</h2>
            <div className="space-y-6">
              {/* Banka Hesapları */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <CreditCard className="w-8 h-8 text-blue-600" />
                    <div>
                      <div className="font-medium">Ziraat Bankası</div>
                      <div className="text-sm text-gray-500">TR12 0001 0012 3456 7890 1234 56</div>
                    </div>
                  </div>
                  <button className="text-red-600 hover:text-red-700">Kaldır</button>
                </div>
              </div>

              {/* Yeni Hesap Ekle */}
              <button className="w-full border-2 border-dashed border-gray-300 p-4 rounded-lg hover:border-blue-500 hover:text-blue-500 transition">
                + Yeni Ödeme Yöntemi Ekle
              </button>
            </div>
          </TabsContent>

          <TabsContent value="history" className="p-6">
            <h2 className="text-xl font-semibold mb-6">İşlem Geçmişi</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Tarih</th>
                    <th className="text-left py-3 px-4">Bot</th>
                    <th className="text-left py-3 px-4">Tip</th>
                    <th className="text-left py-3 px-4">Miktar</th>
                    <th className="text-left py-3 px-4">Durum</th>
                  </tr>
                </thead>
                <tbody>
                  <HistoryRow
                    date="2024-03-10"
                    bot="BTC Trend Follower"
                    type="Alış"
                    amount="+₺850.00"
                    status="completed"
                  />
                  <HistoryRow
                    date="2024-03-09"
                    bot="ETH Scalper"
                    type="Satış"
                    amount="+₺420.00"
                    status="completed"
                  />
                  <HistoryRow
                    date="2024-03-08"
                    bot="FOREX Swing"
                    type="Alış"
                    amount="-₺120.00"
                    status="completed"
                  />
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="security" className="p-6">
            <h2 className="text-xl font-semibold mb-6">Güvenlik Ayarları</h2>
            <div className="space-y-6">
              {/* 2FA Settings */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Lock className="w-6 h-6 text-blue-600" />
                  <div>
                    <div className="font-medium">İki Faktörlü Doğrulama</div>
                    <div className="text-sm text-gray-500">Hesabınıza ekstra güvenlik katmanı ekleyin</div>
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  Aktifleştir
                </button>
              </div>

              {/* API Keys */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <KeyIcon className="w-6 h-6 text-blue-600" />
                  <div>
                    <div className="font-medium">API Anahtarları</div>
                    <div className="text-sm text-gray-500">Otomatik işlemler için API anahtarlarınızı yönetin</div>
                  </div>
                </div>
                <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
                  Yönet
                </button>
              </div>

              {/* Login History */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <History className="w-6 h-6 text-blue-600" />
                  <div>
                    <div className="font-medium">Giriş Geçmişi</div>
                    <div className="text-sm text-gray-500">Son giriş aktivitelerinizi görüntüleyin</div>
                  </div>
                </div>
                <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
                  Görüntüle
                </button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function HistoryRow({ date, bot, type, amount, status }: {
  date: string;
  bot: string;
  type: string;
  amount: string;
  status: string;
}) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-3 px-4">{date}</td>
      <td className="py-3 px-4">{bot}</td>
      <td className="py-3 px-4">{type}</td>
      <td className="py-3 px-4 font-medium">
        <span className={amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
          {amount}
        </span>
      </td>
      <td className="py-3 px-4">
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
          {status === 'completed' ? 'Tamamlandı' : status}
        </span>
      </td>
    </tr>
  );
}

export default Account;