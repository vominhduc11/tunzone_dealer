'use client';

import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';

interface CartDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDropdown({ isOpen, onClose }: CartDropdownProps) {
  const { items, removeFromCart, updateQuantity, getTotalItems, getWholesaleTotal } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      
      {/* Dropdown */}
      <div className="absolute right-0 mt-2 w-80 bg-gray-800/90 backdrop-blur-md border border-gray-700 rounded-lg shadow-2xl z-50 max-h-96 overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-100">
              Shopping Cart ({getTotalItems()})
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-300 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="p-6 text-center">
            <div className="text-gray-500 mb-2">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
              </svg>
            </div>
            <p className="text-gray-400">Your cart is empty</p>
            <Link
              href="/products"
              onClick={onClose}
              className="inline-block mt-3 text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-200"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="p-4 border-b border-gray-700 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                      <span className="text-xs text-gray-400">IMG</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-100 truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-400">
                        SKU: {item.sku}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 hover:bg-gray-600 hover:text-gray-300 transition-colors duration-200"
                          >
                            -
                          </button>
                          <span className="text-sm font-medium text-gray-100">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 hover:bg-gray-600 hover:text-gray-300 transition-colors duration-200"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-gray-100">
                            ${(item.wholesalePrice * item.quantity).toFixed(2)}
                          </div>
                          <div className="text-xs text-gray-400 line-through">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-300 transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Footer */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-100">
                  Wholesale Total:
                </span>
                <span className="text-lg font-bold text-green-400">
                  ${getWholesaleTotal().toFixed(2)}
                </span>
              </div>
              <div className="space-y-2">
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="block w-full text-center bg-gray-700 text-gray-100 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                >
                  View Cart
                </Link>
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
