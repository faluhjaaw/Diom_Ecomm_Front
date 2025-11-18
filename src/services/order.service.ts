// src/services/order.service.ts
import { api } from '../lib/axios';

export const orderService = {
  create: (data: {
    userId: number;
    items: Array<{ productId: string; quantity: number; unitPrice: number }>;
    paymentMethod: string;
  }) => api.post('/order-service/api/orders', data),

  createFromCart: (cartId: string, userId: number, paymentMethod: string) =>
    api.post(`/order-service/api/orders/from-cart/${cartId}`, {
      userId,
      paymentMethod,
    }),

  getById: (id: string) => api.get(`/order-service/api/orders/${id}`),

  updateStatus: (id: string, status: string) =>
    api.patch(`/order-service/api/orders/${id}/status`, { status }),
};