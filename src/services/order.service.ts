// src/services/order.service.ts
import { api } from '../lib/axios';

export const orderService = {
  create: (data: {
    userId: number;
    items: Array<{ productId: string; quantity: number; unitPrice: number }>;
    paymentMethod: string;
  }) => api.post('/order-service/api/orders', data),

  createFromCart: (cartId: string, userId: number, paymentMethod: string, shippingAddress?: string) =>
    api.post(`/order-service/api/orders/from-cart/${cartId}`, {
      userId,
      paymentMethod,
      shippingAddress,
    }),

  getById: (id: string) => api.get(`/order-service/api/orders/${id}`),

  getUserOrders: (userId: number) => api.get(`/order-service/api/orders/by-user/${userId}`),

  updateStatus: (id: string, status: string) =>
    api.patch(`/order-service/api/orders/${id}/status`, { status }),
};