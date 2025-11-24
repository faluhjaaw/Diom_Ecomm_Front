// src/services/vendor.service.ts
import { api } from '../lib/axios';

export interface Vendor {
  id: number;
  nom: string;
  email: string;
  telephone: string;
  motDePasse?: string;
  bio: string;
  nomBoutique: string;
  photoUrl: string;
}

export const vendorService = {
  getById: (id: number) => api.get<Vendor>(`/customer-service/api/vendors/${id}`),

  update: (id: number, data: Partial<Vendor>) =>
    api.put<Vendor>(`/customer-service/api/vendors/${id}`, { ...data, id }),

  getAll: () => api.get<Vendor[]>('/customer-service/api/vendors'),
};
