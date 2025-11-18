// src/hooks/useAuth.ts
import { useState } from 'react';
import { authService } from '../services/auth.service';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await authService.login(email, password);
      localStorage.setItem('token', data.token);
      return data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur de connexion');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      await authService.logout(token);
      localStorage.removeItem('token');
    }
  };

  return { login, logout, loading, error };
};