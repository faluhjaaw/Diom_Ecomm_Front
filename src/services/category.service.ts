// src/services/category.service.ts
import { api } from '../lib/axios';

export const categoryService = {
  getAll: () => api.get('/product-service/api/categories'),

  getChildren: (id: string) =>
    api.get(`/product-service/api/categories/${id}/children`),

  create: (data: { name: string; description: string; parentId?: string }) =>
    api.post('/product-service/api/categories', data),

  getSubCategories: (categoryId: string) =>
    api.get(`/product-service/api/subcategories/by-category/${categoryId}`),
};