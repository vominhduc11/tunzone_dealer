'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  wholesalePrice: number;
  quantity: number;
  image: string;
  category: string;
  sku: string;
  minOrderQty: number;
  maxOrderQty?: number;
  inStock: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getWholesaleTotal: () => number;
  isInCart: (id: string) => boolean;
  getCartItem: (id: string) => CartItem | undefined;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('tunezone_cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('tunezone_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        const maxQty = product.maxOrderQty || product.inStock;
        const finalQuantity = Math.min(newQuantity, maxQty);
        
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: finalQuantity }
            : item
        );
      } else {
        const initialQuantity = Math.max(quantity, product.minOrderQty);
        return [...prevItems, { ...product, quantity: initialQuantity }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const maxQty = item.maxOrderQty || item.inStock;
          const minQty = item.minOrderQty;
          const finalQuantity = Math.min(Math.max(quantity, minQty), maxQty);
          return { ...item, quantity: finalQuantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getWholesaleTotal = () => {
    return items.reduce((total, item) => total + (item.wholesalePrice * item.quantity), 0);
  };

  const isInCart = (id: string) => {
    return items.some(item => item.id === id);
  };

  const getCartItem = (id: string) => {
    return items.find(item => item.id === id);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
      getWholesaleTotal,
      isInCart,
      getCartItem
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
