import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { TrendingUp, TrendingDown, DollarSign, Activity, AlertCircle, Clock, Wallet } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const [pendingDeposits, setPendingDeposits] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated]);

  const fetchUserData = async () => {
    try {
      // API calls would go here
      setLoading(false);
    } catch (error) {
      console.error('Data loading error:', error);
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  const balance = user?.balance || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Balance Loading CTA */}
      {!balance && (
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 text-center">
          <Wallet className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Trading'e Başlayın</h2>
          <p className="text-gray-600 mb-6">
            Trading işlemlerine başlamak için hesabınıza bakiye yükleyin. 
            Minimum yatırım tutarı 5.000 TL'dir.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/deposit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Para Yatır
            </Link>
            <Link
              to="/bots"
              className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition"
            >
              Trading Botları İncele
            </Link>
          </div>
        </div>
      )}

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Portföy Değeri"
          value={balance > 0 ? `₺${balance.toLocaleString()}` : 'Bakiye Yükleyin'}
          change={balance > 0 ? "+12.5%" : null}
          trend="up"
          icon={<DollarSign className="w-6 h-6" />}
          isPending={!balance}
        />
        <StatCard
          title="Aktif Botlar"
          value="0"
          change="+1"
          trend="up"
          icon={<Activity className="w-6 h-6" />}
          isPending={!balance}
        />
        <StatCard
          title="Toplam Kar"
          value={balance > 0 ? "₺0" : '-'}
          change="+0%"
          trend="up"
          icon={<TrendingUp className="w-6 h-6" />}
          isPending={!balance}
        />
        <StatCard
          title="Kazanç Oranı"
          value={balance > 0 ? "0%" : '-'}
          change="0%"
          trend="neutral"
          icon={<TrendingDown className="w-6 h-6" />}
          isPending={!balance}
        />
      </div>

      {/* Pending Payments Warning */}
      {pendingDeposits.length > 0 && (
        <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-yellow-800">Bekleyen Ödemeler</h3>
              <p className="text-sm text-yellow-700 mt-1">
                {pendingDeposits.length} adet ödemeniz onay bekliyor. Ödemeleriniz admin onayından sonra hesabınıza yansıyacaktır.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chart */}
      {balance > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Portföy Performansı</h2>
          <div className="h-[400px] flex items-center justify-center text-gray-500">
            Henüz işlem geçmişi bulunmuyor
          </div>
        </div>
      )}

      {/* Active Bots */}
      {balance > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Aktif Trading Botları</h2>
          <div className="text-center py-12">
            <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz Bot Yok</h3>
            <p className="text-gray-500 mb-4">
              Trading botları oluşturarak otomatik alım satım yapmaya başlayın
            </p>
            <Link
              to="/bots/create"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              İlk Botunuzu Oluşturun
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  change: string | null;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  isPending?: boolean;
}

function StatCard({ title, value, change, trend, icon, isPending }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-gray-600">{icon}</div>
        {!isPending && change && (
          <div className={`text-sm font-medium ${
            trend === 'up' ? 'text-green-600' : 
            trend === 'down' ? 'text-red-600' : 
            'text-gray-600'
          }`}>
            {change}
          </div>
        )}
      </div>
      <div className="text-2xl font-bold mb-1">
        {isPending ? (
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-blue-600" />
            <span className="text-lg text-gray-600">{value}</span>
          </div>
        ) : (
          value
        )}
      </div>
      <div className="text-gray-600">{title}</div>
    </div>
  );
}

export default Dashboard;