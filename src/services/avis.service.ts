// src/services/avis.service.ts
import { api } from '../lib/axios';

export const avisService = {
  create: (data: {
    produitId: string;
    userId: number;
    note: number;
    commentaire: string;
  }) => api.post('/avis-service/api/avis', data),

  getByProduct: (produitId: string) =>
    api.get(`/avis-service/api/avis/produit/${produitId}`),

  getByUser: (userId: number) =>
    api.get(`/avis-service/api/avis/user/${userId}`),

  getAverage: (produitId: string) =>
    api.get(`/avis-service/api/avis/produit/${produitId}/moyenne`),

  update: (id: string, data: { note: number; commentaire: string }) =>
    api.put(`/avis-service/api/avis/${id}`, data),

  delete: (id: string) => api.delete(`/avis-service/api/avis/${id}`),
};