import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../entities/user/types';
import {
  apiClient,
  setTokens,
  clearTokens,
  getRefreshToken,
  getAccessToken,
} from '../shared/api/apiClient';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchCurrentUser = async () => {
    if (!getAccessToken()) {
      setIsLoading(false);
      return;
    }
    try {
      const data = await apiClient<{ id: number; email: string; full_name?: string }>('/auth/me');
      setUser({
        id: data.id,
        email: data.email,
        fullName: data.full_name,
      });
    } catch {
      clearTokens();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();

    const handleExternalLogout = () => {
      setUser(null);
    };
    window.addEventListener('auth:logout', handleExternalLogout);
    return () => window.removeEventListener('auth:logout', handleExternalLogout);
  }, []);

  const login = async (email: string, password: string) => {
    const data = await apiClient<{
      access_token: string;
      refresh_token: string;
      user: { id: number; email: string; full_name?: string };
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    setTokens(data.access_token, data.refresh_token);
    setUser({
      id: data.user.id,
      email: data.user.email,
      fullName: data.user.full_name,
    });
  };

  const register = async (email: string, password: string, fullName?: string) => {
    const data = await apiClient<{
      access_token: string;
      refresh_token: string;
      user: { id: number; email: string; full_name?: string };
    }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, full_name: fullName }),
    });

    setTokens(data.access_token, data.refresh_token);
    setUser({
      id: data.user.id,
      email: data.user.email,
      fullName: data.user.full_name,
    });
  };

  const logout = async () => {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      try {
        await apiClient('/auth/logout', {
          method: 'POST',
          body: JSON.stringify({ refresh_token: refreshToken }),
        });
      } catch (err) {
        console.warn('Ошибка при отзыве токена:', err);
      }
    }
    clearTokens();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
