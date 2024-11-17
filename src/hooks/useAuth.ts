import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../config/api';
import { API_CONFIG, ERROR_MESSAGES } from '../config/constants';

interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  role: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  initialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isAdmin: false,
      loading: false,
      initialized: true,

      login: async (email: string, password: string) => {
        try {
          set({ loading: true });
          const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
            email,
            password
          });
          
          const { user, token } = response.data;
          localStorage.setItem('token', token);
          
          set({ 
            user,
            isAuthenticated: true,
            isAdmin: user.role === 'admin',
            loading: false
          });
        } catch (error: any) {
          set({ loading: false });
          throw new Error(error.response?.data?.message || ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);
        }
      },

      register: async (userData) => {
        try {
          set({ loading: true });
          const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, userData);
          
          const { user, token } = response.data;
          localStorage.setItem('token', token);
          
          set({ 
            user,
            isAuthenticated: true,
            isAdmin: false,
            loading: false
          });
        } catch (error: any) {
          set({ loading: false });
          throw new Error(error.response?.data?.message || ERROR_MESSAGES.DEFAULT);
        }
      },

      logout: async () => {
        try {
          await api.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
          localStorage.removeItem('token');
          set({ 
            user: null, 
            isAuthenticated: false,
            isAdmin: false,
            loading: false
          });
        } catch (error) {
          localStorage.removeItem('token');
          set({ 
            user: null, 
            isAuthenticated: false,
            isAdmin: false,
            loading: false
          });
        }
      },

      checkAuth: async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            set({
              user: null,
              isAuthenticated: false,
              isAdmin: false,
              loading: false
            });
            return;
          }

          const response = await api.get(API_CONFIG.ENDPOINTS.AUTH.VERIFY);
          const { user } = response.data;
          
          set({
            user,
            isAuthenticated: true,
            isAdmin: user.role === 'admin',
            loading: false
          });
        } catch (error) {
          localStorage.removeItem('token');
          set({
            user: null,
            isAuthenticated: false,
            isAdmin: false,
            loading: false
          });
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user })
    }
  )
);