import api from '../config/api';
import { API_CONFIG, ERROR_MESSAGES } from '../config/constants';
import { AxiosError } from 'axios';

export const authAPI = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
        email,
        password
      });
      
      const { token, refreshToken, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      
      return { user };
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);
      }
      throw new Error(ERROR_MESSAGES.DEFAULT);
    }
  },

  register: async (userData: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, userData);
      
      const { token, refreshToken, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      
      return { user };
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          throw new Error(ERROR_MESSAGES.AUTH.EMAIL_EXISTS);
        }
        throw new Error(error.response?.data?.message || ERROR_MESSAGES.DEFAULT);
      }
      throw new Error(ERROR_MESSAGES.DEFAULT);
    }
  },

  logout: async () => {
    try {
      await api.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      throw error;
    }
  },

  verify: async () => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.AUTH.VERIFY);
      return response.data;
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      throw error;
    }
  }
};

export const userAPI = {
  getProfile: async () => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.USER.PROFILE);
      return response.data;
    } catch (error) {
      throw new Error(ERROR_MESSAGES.DEFAULT);
    }
  },

  updateProfile: async (data: any) => {
    try {
      const response = await api.put(API_CONFIG.ENDPOINTS.USER.UPDATE_PROFILE, data);
      return response.data;
    } catch (error) {
      throw new Error(ERROR_MESSAGES.DEFAULT);
    }
  },

  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.USER.CHANGE_PASSWORD, data);
      return response.data;
    } catch (error) {
      throw new Error(ERROR_MESSAGES.DEFAULT);
    }
  }
};

export const transactionAPI = {
  createDeposit: async (data: any) => {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.TRANSACTIONS.DEPOSIT, data);
      return response.data;
    } catch (error) {
      throw new Error(ERROR_MESSAGES.DEFAULT);
    }
  },

  createWithdraw: async (data: any) => {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.TRANSACTIONS.WITHDRAW, data);
      return response.data;
    } catch (error) {
      throw new Error(ERROR_MESSAGES.DEFAULT);
    }
  },

  getHistory: async () => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.TRANSACTIONS.HISTORY);
      return response.data;
    } catch (error) {
      throw new Error(ERROR_MESSAGES.DEFAULT);
    }
  }
};

export const botAPI = {
  getBots: async () => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.BOTS.LIST);
      return response.data;
    } catch (error) {
      throw new Error(ERROR_MESSAGES.DEFAULT);
    }
  },

  createBot: async (data: any) => {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.BOTS.CREATE, data);
      return response.data;
    } catch (error) {
      throw new Error(ERROR_MESSAGES.DEFAULT);
    }
  },

  startBot: async (botId: string) => {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.BOTS.START(botId));
      return response.data;
    } catch (error) {
      throw new Error(ERROR_MESSAGES.DEFAULT);
    }
  },

  stopBot: async (botId: string) => {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.BOTS.STOP(botId));
      return response.data;
    } catch (error) {
      throw new Error(ERROR_MESSAGES.DEFAULT);
    }
  },

  getBotPerformance: async (botId: string) => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.BOTS.PERFORMANCE(botId));
      return response.data;
    } catch (error) {
      throw new Error(ERROR_MESSAGES.DEFAULT);
    }
  }
};

export const marketAPI = {
  getPrices: async () => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.MARKET.PRICES);
      return response.data;
    } catch (error) {
      throw new Error(ERROR_MESSAGES.DEFAULT);
    }
  },

  getHistory: async (symbol: string, interval: string) => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.MARKET.HISTORY, {
        params: { symbol, interval }
      });
      return response.data;
    } catch (error) {
      throw new Error(ERROR_MESSAGES.DEFAULT);
    }
  },

  getSymbols: async () => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.MARKET.SYMBOLS);
      return response.data;
    } catch (error) {
      throw new Error(ERROR_MESSAGES.DEFAULT);
    }
  }
};