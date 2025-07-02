'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/contexts/ProductContext';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
  onAddToCart: (product: Product, quantity: number) => void;
  showWholesalePrice: boolean;
}

// Utility function to generate quantity options
const generateQuantityOptions = (product: Product, keyPrefix: string) => {
  const minQty = product.minOrderQty;
  const maxQty = Math.min(product.maxOrderQty || 50, minQty + 19); // Limit to 20 options max
  const options = [];
  
  for (let qty = minQty; qty <= maxQty; qty++) {
    options.push(
      <option key={`${product.id}-${keyPrefix}-qty-${qty}`} value={qty}>
        {qty}
      </option>
    );
  }
  
  return options;
};

export default function ProductCard({ product, viewMode, onAddToCart, showWholesalePrice }: ProductCardProps) {
  // Ensure initial quantity is within valid range
  const initialQuantity = Math.max(product.minOrderQty, 1);
  const [quantity, setQuantity] = useState(initialQuantity);
  const { isInCart, getCartItem } = useCart();
  const cartItem = getCartItem(product.id);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
  };

  // Validate quantity when it changes
  const handleQuantityChange = (newQuantity: number) => {
    const validQuantity = Math.max(
      product.minOrderQty, 
      Math.min(newQuantity, product.maxOrderQty || 50)
    );
    setQuantity(validQuantity);
  };

  const savings = product.price - product.wholesalePrice;
  const savingsPercent = Math.round((savings / product.price) * 100);

  if (viewMode === 'list') {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl hover:shadow-2xl hover:border-gray-600 transition-all duration-300 p-6 transform hover:scale-[1.02] hover:-translate-y-1">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Product Image */}
          <div className="w-full md:w-48 h-48 bg-gray-700/50 backdrop-blur-sm border border-gray-600 rounded-lg flex items-center justify-center relative overflow-hidden group">
            <div className="text-gray-400 text-center transition-all duration-300 group-hover:scale-110">
              <div className="text-4xl mb-2 animate-pulse">🎵</div>
              <div className="text-sm">{product.category}</div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="text-sm text-blue-400 font-semibold mb-1">
                  {product.category} • {product.brand}
                </div>
                <h3 className="text-xl font-bold text-gray-100 mb-2 group">
                  <Link href={`/products/${product.id}`} className="hover:text-blue-400 transition-all duration-300 group-hover:translate-x-1">
                    {product.name}
                  </Link>
                </h3>
                <p className="text-gray-300 mb-3">{product.description}</p>
              </div>
              <div className="flex items-center text-yellow-400 ml-4 group">
                {'★'.repeat(Math.floor(product.rating))}
                <span className="text-gray-400 ml-1 text-sm group-hover:text-gray-300 transition-colors duration-300">
                  ({product.reviewCount})
                </span>
              </div>
            </div>

            {/* Features */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {product.features.slice(0, 4).map((feature, index) => (
                  <span
                    key={`${product.id}-list-feature-${index}`}
                    className="px-2 py-1 bg-gray-700/70 border border-gray-600 text-gray-200 text-xs rounded-full hover:bg-gray-600/70 hover:border-gray-500 transition-all duration-300 hover:scale-105"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Stock and SKU */}
            <div className="flex items-center gap-4 mb-4 text-sm text-gray-300">
              <span>SKU: {product.sku}</span>
              <span className={`px-2 py-1 rounded-full text-xs border ${
                product.inStock > 10 
                  ? 'bg-green-900/50 border-green-700 text-green-300' 
                  : product.inStock > 0
                  ? 'bg-yellow-900/50 border-yellow-700 text-yellow-300'
                  : 'bg-red-900/50 border-red-700 text-red-300'
              }`}>
                {product.inStock > 0 ? `${product.inStock} in stock` : 'Out of stock'}
              </span>
            </div>

            {/* Pricing and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {showWholesalePrice ? (
                  <div>
                    <div className="text-2xl font-bold text-green-400">
                      ${product.wholesalePrice.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-400 line-through">
                      MSRP: ${product.price.toFixed(2)}
                    </div>
                    <div className="text-sm text-green-400">
                      Save {savingsPercent}% (${savings.toFixed(2)})
                    </div>
                  </div>
                ) : (
                  <div className="text-2xl font-bold text-blue-400">
                    ${product.price.toFixed(2)}
                  </div>
                )}
              </div>

              {showWholesalePrice && product.inStock > 0 && (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-200">Số lượng:</label>
                    <select
                      value={quantity}
                      onChange={(e) => handleQuantityChange(Number(e.target.value))}
                      className="px-2 py-1 border border-gray-600 rounded bg-gray-700/50 backdrop-blur-sm text-gray-100 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 hover:border-gray-500 focus:scale-105"
                    >
                      {generateQuantityOptions(product, 'list')}
                    </select>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 border transform hover:scale-105 active:scale-95 ${
                      isInCart(product.id)
                        ? 'bg-green-600/80 border-green-500 text-white hover:bg-green-600 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/25'
                        : 'bg-blue-600/80 border-blue-500 text-white hover:bg-blue-600 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/25'
                    }`}
                  >
                    {isInCart(product.id) ? `Trong Giỏ (${cartItem?.quantity})` : 'Thêm Vào Giỏ'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl hover:shadow-2xl hover:border-gray-600 transition-all duration-300 overflow-hidden transform hover:scale-[1.03] hover:-translate-y-2 group">
      {/* Product Image */}
      <div className="h-48 bg-gray-700/50 backdrop-blur-sm border-b border-gray-600 flex items-center justify-center relative overflow-hidden">
        <div className="text-gray-400 text-center transition-all duration-300 group-hover:scale-110">
          <div className="text-4xl mb-2 animate-pulse group-hover:animate-bounce">🎵</div>
          <div className="text-sm">{product.category}</div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {showWholesalePrice && (
          <div className="absolute top-2 right-2 bg-green-500/90 backdrop-blur-sm border border-green-400 text-white px-2 py-1 rounded-full text-xs font-semibold transform transition-all duration-300 hover:scale-110 animate-pulse">
            Save {savingsPercent}%
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Category and Brand */}
        <div className="text-sm text-blue-400 font-semibold mb-2">
          {product.category} • {product.brand}
        </div>

        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-100 mb-2 group">
          <Link href={`/products/${product.id}`} className="hover:text-blue-400 transition-all duration-300 group-hover:translate-x-1">
            {product.name}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-3 group">
          <div className="flex items-center text-yellow-400 group-hover:animate-pulse">
            {'★'.repeat(Math.floor(product.rating))}
          </div>
          <span className="text-gray-400 ml-1 text-sm group-hover:text-gray-300 transition-colors duration-300">
            ({product.reviewCount})
          </span>
        </div>

        {/* Features */}
        <ul className="space-y-1 mb-4">
          {product.features.slice(0, 3).map((feature, index) => (
            <li key={`${product.id}-grid-feature-${index}`} className="text-sm text-gray-300 flex items-center group hover:text-gray-200 transition-all duration-300">
              <span className="text-green-400 mr-2 group-hover:scale-125 transition-transform duration-300">✓</span>
              {feature}
            </li>
          ))}
        </ul>

        {/* Stock Status */}
        <div className="mb-4">
          <span className={`px-2 py-1 rounded-full text-xs border ${
            product.inStock > 10 
              ? 'bg-green-900/50 border-green-700 text-green-300' 
              : product.inStock > 0
              ? 'bg-yellow-900/50 border-yellow-700 text-yellow-300'
              : 'bg-red-900/50 border-red-700 text-red-300'
          }`}>
            {product.inStock > 0 ? `${product.inStock} in stock` : 'Out of stock'}
          </span>
        </div>

        {/* Pricing */}
        <div className="mb-4">
          {showWholesalePrice ? (
            <div>
              <div className="text-xl font-bold text-green-400">
                ${product.wholesalePrice.toFixed(2)}
              </div>
              <div className="text-sm text-gray-400 line-through">
                MSRP: ${product.price.toFixed(2)}
              </div>
            </div>
          ) : (
            <div className="text-xl font-bold text-blue-400">
              ${product.price.toFixed(2)}
            </div>
          )}
        </div>

        {/* Actions */}
        {showWholesalePrice && product.inStock > 0 ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-200">Số lượng:</label>
              <select
                value={quantity}
                onChange={(e) => handleQuantityChange(Number(e.target.value))}
                className="px-2 py-1 border border-gray-600 rounded bg-gray-700/50 backdrop-blur-sm text-gray-100 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 hover:border-gray-500 focus:scale-105"
              >
                {generateQuantityOptions(product, 'grid')}
              </select>
            </div>
            <button
              onClick={handleAddToCart}
              className={`w-full py-2 rounded-lg font-semibold transition-all duration-200 border transform hover:scale-105 active:scale-95 ${
                isInCart(product.id)
                  ? 'bg-green-600/80 border-green-500 text-white hover:bg-green-600 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/25'
                  : 'bg-blue-600/80 border-blue-500 text-white hover:bg-blue-600 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/25'
              }`}
            >
              {isInCart(product.id) ? `Trong Giỏ (${cartItem?.quantity})` : 'Thêm Vào Giỏ'}
            </button>
          </div>
        ) : (
          <Link
            href={`/products/${product.id}`}
            className="block w-full text-center bg-blue-600/80 border border-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 hover:border-blue-400 transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-blue-500/25"
          >
            Xem Chi Tiết
          </Link>
        )}
      </div>
    </div>
  );
}
