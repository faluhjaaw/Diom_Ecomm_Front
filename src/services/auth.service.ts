// src/services/auth.service.ts
import { api } from '../lib/axios';
import { User } from '../types';

export const authService = {
  register1: (email: string) =>
    api.post('/authentication/api/auth/register1', { email }),

  verify: (email: string, code: string) =>
    api.post('/authentication/api/auth/verify', { email, code }),

  register2: (data: {
    prenom: string;
    nom: string;
    email: string;
    password: string;
    telephone: string;
    adresse: string;
    role: 'ADMIN' | 'CUSTOMER' | 'VENDEUR';
  }) => api.post('/authentication/api/auth/register2', data),

  login: (email: string, password: string) =>
    api.post<{ token: string }>('/authentication/api/auth/login', {
      email,
      password,
    }),

  logout: (token: string) =>
    api.post('/authentication/api/auth/logout', { token }),

  getCurrentUser: () =>
    api.get<User>('/authentication/api/auth/me'),

  updateProfile: (data: {
    prenom: string;
    nom: string;
    telephone: string;
    adresse: string;
  }) => api.put('/authentication/api/auth/profile', data),
};