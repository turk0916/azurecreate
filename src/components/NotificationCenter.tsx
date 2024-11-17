import React, { useState } from 'react';
import { Bell, X, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

interface Notification {
  id: number;
  type: 'success' | 'warning' | 'info';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'success',
      title: 'Bot İşlemi Başarılı',
      message: 'BTC Trend Follower botu +850 TL kar elde etti',
      time: '5 dakika önce',
      read: false
    },
    {
      id: 2,
      type: 'info',
      title: 'Para Yatırma İşlemi',
      message: 'Para yatırma talebiniz alındı. İşleminiz en kısa sürede tamamlanacak.',
      time: '1 saat önce',
      read: false
    },
    {
      id: 3,
      type: 'warning',
      title: 'Bot Uyarısı',
      message: 'ETH Scalper botunun performansı düşük seyrediyor',
      time: '2 saat önce',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      default:
        return <Clock className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Bildirimler</h3>
              <button
                onClick={markAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Tümünü okundu işaretle
              </button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b hover:bg-gray-50 ${
                  !notification.read ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  {getIcon(notification.type)}
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{notification.title}</h4>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full text-center text-sm text-gray-600 hover:text-gray-900"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationCenter;