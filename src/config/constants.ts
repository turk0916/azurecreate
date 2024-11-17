export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  TIMEOUT: 30000,
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      VERIFY: '/auth/verify',
      REFRESH_TOKEN: '/auth/refresh-token'
    },
    USER: {
      PROFILE: '/user/profile',
      UPDATE_PROFILE: '/user/profile',
      CHANGE_PASSWORD: '/user/password'
    },
    TRANSACTIONS: {
      DEPOSIT: '/transactions/deposit',
      WITHDRAW: '/transactions/withdraw',
      HISTORY: '/transactions/history'
    },
    BOTS: {
      LIST: '/bots',
      CREATE: '/bots',
      GET: (id: string) => `/bots/${id}`,
      UPDATE: (id: string) => `/bots/${id}`,
      DELETE: (id: string) => `/bots/${id}`,
      START: (id: string) => `/bots/${id}/start`,
      STOP: (id: string) => `/bots/${id}/stop`,
      PERFORMANCE: (id: string) => `/bots/${id}/performance`
    },
    MARKET: {
      PRICES: '/market/prices',
      HISTORY: '/market/history',
      SYMBOLS: '/market/symbols'
    }
  }
};

export const ERROR_MESSAGES = {
  DEFAULT: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
  NETWORK: 'Bağlantı hatası. İnternet bağlantınızı kontrol edin.',
  AUTH: {
    INVALID_CREDENTIALS: 'Geçersiz email veya şifre',
    EMAIL_EXISTS: 'Bu email adresi zaten kullanımda',
    WEAK_PASSWORD: 'Şifre en az 8 karakter olmalıdır',
    SESSION_EXPIRED: 'Oturum süresi doldu. Lütfen tekrar giriş yapın.'
  }
};