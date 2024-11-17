import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import { ArrowUpRight, ArrowDownRight, Clock, Filter, Search, Download } from 'lucide-react';

function TransactionHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('all');
  const [transactionType, setTransactionType] = useState('all');

  const transactions = [
    {
      id: 1,
      type: 'deposit',
      method: 'bank',
      amount: '10000',
      status: 'completed',
      date: '2024-03-10 14:30',
      details: 'Ziraat Bankası'
    },
    {
      id: 2,
      type: 'bot_trade',
      method: 'BTC Trend Follower',
      amount: '+850',
      status: 'completed',
      date: '2024-03-09 15:45',
      details: 'BTCUSDT Long'
    },
    {
      id: 3,
      type: 'withdraw',
      method: 'crypto',
      amount: '-5000',
      status: 'pending',
      date: '2024-03-08 09:15',
      details: 'USDT TRC20'
    }
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800'
    };
    return `px-2 py-1 rounded-full text-sm ${styles[status as keyof typeof styles]}`;
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownRight className="w-5 h-5 text-green-600" />;
      case 'withdraw':
        return <ArrowUpRight className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">İşlem Geçmişi</h1>
        <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
          <Download className="w-5 h-5" />
          Rapor İndir
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="İşlem ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tüm Tarihler</option>
            <option value="today">Bugün</option>
            <option value="week">Bu Hafta</option>
            <option value="month">Bu Ay</option>
          </select>

          <select
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tüm İşlemler</option>
            <option value="deposit">Para Yatırma</option>
            <option value="withdraw">Para Çekme</option>
            <option value="bot_trade">Bot İşlemleri</option>
          </select>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Tarih</th>
                <th className="text-left py-3 px-4">İşlem Tipi</th>
                <th className="text-left py-3 px-4">Yöntem</th>
                <th className="text-left py-3 px-4">Miktar</th>
                <th className="text-left py-3 px-4">Durum</th>
                <th className="text-left py-3 px-4">Detaylar</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="text-sm">
                      <div className="font-medium">{tx.date.split(' ')[0]}</div>
                      <div className="text-gray-500">{tx.date.split(' ')[1]}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {getTransactionIcon(tx.type)}
                      <span className="capitalize">
                        {tx.type === 'deposit' ? 'Para Yatırma' :
                         tx.type === 'withdraw' ? 'Para Çekme' :
                         'Bot İşlemi'}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{tx.method}</td>
                  <td className="py-3 px-4">
                    <span className={tx.amount.startsWith('-') ? 'text-red-600' : 'text-green-600'}>
                      {tx.amount.startsWith('+') ? tx.amount : tx.amount.startsWith('-') ? tx.amount : `+${tx.amount}`} TL
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={getStatusBadge(tx.status)}>
                      {tx.status === 'completed' ? 'Tamamlandı' :
                       tx.status === 'pending' ? 'Beklemede' :
                       'Başarısız'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    {tx.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TransactionHistory;