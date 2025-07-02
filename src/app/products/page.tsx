'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useProducts, Product } from '@/contexts/ProductContext';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';

export default function Products() {
  const { user } = useAuth();
  const { 
    filteredProducts, 
    searchTerm, 
    setSearchTerm, 
    sortBy, 
    setSortBy, 
    sortOrder, 
    setSortOrder 
  } = useProducts();
  const { addToCart } = useCart();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const handleAddToCart = (product: Product, quantity = 1) => {
    if (user?.isGuest) {
      alert('Please sign in as a dealer to add items to cart');
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      wholesalePrice: product.wholesalePrice,
      image: product.images[0],
      category: product.category,
      sku: product.sku,
      minOrderQty: product.minOrderQty,
      maxOrderQty: product.maxOrderQty,
      inStock: product.inStock
    }, quantity);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 shadow-lg animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-up">Sản Phẩm Bán Sỉ</h1>
          <p className="text-xl max-w-3xl mx-auto animate-slide-up animation-delay-200">
            Khám phá dải sản phẩm thiết bị âm thanh cao cấp với giá bán sỉ toàn diện của chúng tôi
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in animation-delay-300">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 animate-slide-right ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <ProductFilters />
          </div>

          {/* Main Content */}
          <div className="flex-1 animate-slide-left animation-delay-200">
            {/* Search and Controls */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl p-6 mb-6 animate-scale-in animation-delay-400 hover:shadow-2xl hover:border-gray-600 transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search */}
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-700/50 backdrop-blur-sm text-gray-100 placeholder-gray-400 transition-all duration-300 focus:scale-105 hover:border-gray-500"
                    />
                    <div className="absolute left-3 top-2.5 text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center space-x-4">
                  {/* Mobile Filter Toggle */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden bg-gray-700/70 hover:bg-gray-600/70 text-gray-200 px-4 py-2 rounded-lg transition-all duration-200 border border-gray-600 hover:border-gray-500 hover:scale-105 active:scale-95"
                  >
                    Filters
                  </button>

                  {/* Sort */}
                  <select
                    value={`${sortBy}-${sortOrder}`}
                    onChange={(e) => {
                      const [field, order] = e.target.value.split('-');
                      setSortBy(field);
                      setSortOrder(order as 'asc' | 'desc');
                    }}
                    className="px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-700/50 backdrop-blur-sm text-gray-100 transition-all duration-300 hover:border-gray-500 focus:scale-105"
                  >
                    <option value="name-asc">Name A-Z</option>
                    <option value="name-desc">Name Z-A</option>
                    <option value="price-asc">Price Low-High</option>
                    <option value="price-desc">Price High-Low</option>
                    <option value="rating-desc">Rating High-Low</option>
                    <option value="stock-desc">Stock High-Low</option>
                  </select>

                  {/* View Mode */}
                  <div className="flex bg-gray-700/50 backdrop-blur-sm border border-gray-600 rounded-lg p-1 hover:border-gray-500 transition-all duration-300">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded transition-all duration-200 transform hover:scale-110 active:scale-95 ${viewMode === 'grid' ? 'bg-gray-600 text-white shadow-md' : 'text-gray-300 hover:text-white hover:bg-gray-600/50'}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded transition-all duration-200 transform hover:scale-110 active:scale-95 ${viewMode === 'list' ? 'bg-gray-600 text-white shadow-md' : 'text-gray-300 hover:text-white hover:bg-gray-600/50'}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <div className="mt-4 text-sm text-gray-300">
                Showing {filteredProducts.length} products
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700 animate-fade-in animation-delay-600">
                <div className="text-gray-400 text-6xl mb-4 animate-bounce">🔍</div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2 animate-slide-up animation-delay-700">
                  Không tìm thấy sản phẩm
                </h3>
                <p className="text-gray-300 animate-slide-up animation-delay-800">
                  Hãy thử điều chỉnh tiêu chí tìm kiếm hoặc bộ lọc của bạn
                </p>
              </div>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }>
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${Math.min(index * 100, 1000)}ms` }}
                  >
                    <ProductCard
                      product={product}
                      viewMode={viewMode}
                      onAddToCart={handleAddToCart}
                      showWholesalePrice={!user?.isGuest}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Separator before footer */}
      <div className="border-t border-gray-600 mx-4 sm:mx-6 lg:mx-8 mt-8"></div>

      <Footer />
    </div>
  );
}
