import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import { CreditCard, Bitcoin, AlertTriangle, ArrowRight, Copy, Info } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { transactionAPI } from '../services/api';

// Şirket banka hesapları
const BANK_ACCOUNTS = [
  {
    bank: 'Ziraat Bankası',
    branch: 'Merkez Şubesi',
    accountName: 'Premium Trade AI Teknoloji A.Ş.',
    iban: 'TR33 0001 0090 1234 5678 9012 34',
    accountNo: '12345678901'
  },
  {
    bank: 'Garanti BBVA',
    branch: 'Levent Şubesi',
    accountName: 'Premium Trade AI Teknoloji A.Ş.',
    iban: 'TR45 0006 2000 1234 5678 9012 34',
    accountNo: '12345678902'
  }
];

function Deposit() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('bank');
  const [amount, setAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!amount || parseFloat(amount) < 5000) {
        throw new Error('Minimum yatırım tutarı 5.000 TL\'dir');
      }

      if (activeTab === 'bank' && !selectedBank) {
        throw new Error('Lütfen bir banka hesabı seçin');
      }

      await transactionAPI.createDeposit({
        amount: parseFloat(amount),
        method: activeTab,
        details: {
          bank: selectedBank,
          userId: user.id
        }
      });

      setSuccess('Para yatırma talebiniz alındı. İşleminiz onaylandıktan sonra bakiyenize yansıyacaktır.');
      setAmount('');
      setSelectedBank('');
    } catch (err: any) {
      setError(err.message || 'Para yatırma işlemi başarısız oldu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Para Yatırma</h1>

      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-green-700">
            <Info className="w-5 h-5" />
            <p>{success}</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg">
        <Tabs defaultValue="bank" onValueChange={setActiveTab}>
          <TabsList className="border-b">
            <TabsTrigger value="bank" className="flex items-center gap-2 px-6 py-3">
              <CreditCard className="w-5 h-5" />
              Banka Havalesi
            </TabsTrigger>
            <TabsTrigger value="crypto" className="flex items-center gap-2 px-6 py-3">
              <Bitcoin className="w-5 h-5" />
              Kripto Para
            </TabsTrigger>
          </TabsList>

          <div className="p-6">
            <form onSubmit={handleDeposit} className="space-y-6">
              {error && (
                <div className="flex items-center gap-2 p-4 text-sm text-red-600 bg-red-50 rounded-lg">
                  <AlertTriangle className="w-5 h-5" />
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yatırılacak Tutar (TL)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Minimum 5.000 TL"
                  min="5000"
                  required
                />
              </div>

              {/* Banka Hesapları */}
              {activeTab === 'bank' && (
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Banka Hesaplarımız
                  </label>
                  {BANK_ACCOUNTS.map((account) => (
                    <div
                      key={account.iban}
                      onClick={() => setSelectedBank(account.iban)}
                      className={`cursor-pointer p-4 rounded-lg border transition ${
                        selectedBank === account.iban 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-200'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h3 className="font-medium">{account.bank}</h3>
                          <p className="text-sm text-gray-500">{account.branch}</p>
                        </div>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-600">
                          <span className="font-medium">Hesap Adı:</span> {account.accountName}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">IBAN:</span>{' '}
                          <span className="font-mono">{account.iban}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Önemli Bilgiler</h4>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• Minimum yatırım tutarı 5.000 TL'dir</li>
                  <li>• Sadece size ait hesaplardan transfer yapabilirsiniz</li>
                  <li>• İşleminiz admin onayından sonra hesabınıza yansıyacaktır</li>
                  <li>• Açıklama kısmına kullanıcı ID'nizi ({user?.id}) yazmayı unutmayın</li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    İşlem Yapılıyor...
                  </>
                ) : (
                  <>
                    Para Yatırma Talebini Oluştur
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

export default Deposit;