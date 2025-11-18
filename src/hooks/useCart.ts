// src/hooks/useCart.ts
import { useState, useEffect } from 'react';
import { cartService } from '../services/cart.service';

export const useCart = (userId: number) => {
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const { data } = await cartService.getOrCreate(userId);
      setCart(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (productId: string, quantity: number, unitPrice: number) => {
    await cartService.addItem(userId, productId, quantity, unitPrice);
    await fetchCart();
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    await cartService.updateQuantity(userId, productId, quantity);
    await fetchCart();
  };

  const removeItem = async (productId: string) => {
    await cartService.removeItem(userId, productId);
    await fetchCart();
  };

  const clearCart = async () => {
    await cartService.clear(userId);
    await fetchCart();
  };

  useEffect(() => {
    if (userId) fetchCart();
  }, [userId]);

  return { cart, loading, addItem, updateQuantity, removeItem, clearCart };
};