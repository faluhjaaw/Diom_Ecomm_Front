// src/services/cart.service.ts
import { api } from '../lib/axios';

export const cartService = {
  getOrCreate: (userId: number) =>
    api.get(`/cart-service/api/carts/${userId}`),

  addItem: (userId: number, productId: string, quantity: number, unitPrice: number) =>
    api.post(`/cart-service/api/carts/${userId}/items`, {
      productId,
      quantity,
      unitPrice,
    }),

  updateQuantity: (userId: number, productId: string, quantity: number) =>
    api.put(`/cart-service/api/carts/${userId}/items`, {
      productId,
      quantity,
    }),

  removeItem: (userId: number, productId: string) =>
    api.delete(`/cart-service/api/carts/${userId}/items/${productId}`),

  clear: (userId: number) => api.delete(`/cart-service/api/carts/${userId}`),
};