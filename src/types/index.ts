// src/types/index.ts
export interface User {
  id: number;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  role: 'ADMIN' | 'CUSTOMER' | 'VENDEUR';
}

export interface Category {
  id: string;
  name: string;
  description: string;
  parentId?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  rating: number;
  imageUrls: string[];
  subCategoryId: string;
  vendorId: number;
  brand: string;
  tags: string[];
  condition: 'NEW' | 'USED' | 'REFURBISHED';
  specifications: Record<string, any>;
}

export interface CartItem {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface Cart {
  id: string;
  userId: number;
  items: CartItem[];
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  userId: number;
  items: CartItem[];
  total: number;
  status: 'CREATED' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  shippingAddress: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}