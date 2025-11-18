import { api } from '../lib/axios';

export const productService = {
  getAll: () => api.get('/product-service/api/products'),
  
  getById: (id: string) => api.get(`/product-service/api/products/${id}`),
  
  search: (query: string) =>
    api.get('/product-service/api/products/search', { params: { query } }),
  
  filterByCategory: (categoryId: string) =>
    api.get(`/product-service/api/products/filter/category/${categoryId}`),
  
  filterByPrice: (min: number, max: number) =>
    api.get('/product-service/api/products/filter/price', {
      params: { min, max },
    }),
  
  filterByRating: (min: number) =>
    api.get('/product-service/api/products/filter/rating', { params: { min } }),
  
  filterByCondition: (value: string) =>
    api.get('/product-service/api/products/filter/condition', { params: { value } }),
  
  create: (data: any) => api.post('/product-service/api/products', data),
  
  update: (id: string, data: any) =>
    api.put(`/product-service/api/products/${id}`, data),
};