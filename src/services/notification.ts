export const initializeNotifications = async () => {
  if (!('Notification' in window)) {
    console.log('Bu tarayıcı bildirim desteği sunmuyor');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

export const subscribeToPushNotifications = async () => {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: 'YOUR_PUBLIC_VAPID_KEY'
    });

    // Sunucuya subscription objesi gönderilecek
    await fetch('/api/notifications/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription)
    });

    return true;
  } catch (error) {
    console.error('Push notification subscription error:', error);
    return false;
  }
};

export const showNotification = async (title: string, options: NotificationOptions) => {
  if (!('Notification' in window)) return;

  if (Notification.permission === 'granted') {
    const registration = await navigator.serviceWorker.ready;
    registration.showNotification(title, options);
  }
};