'use client';

import Link from 'next/link';
import AnimationWrapper from './AnimationWrapper';
import { useProducts } from '@/contexts/ProductContext';

export default function FeaturedProducts() {
  const { products } = useProducts();
  
  // Get featured products (first 4 products from different categories)
  const featuredProducts = products.slice(0, 4);
  return (
    <section className="py-16 bg-gray-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimationWrapper animation="animate-fade-in-up" delay={100}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
              Danh Mục Sản Phẩm Nổi Bật
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Khám phá dải sản phẩm âm thanh toàn diện của chúng tôi với giá bán sỉ
            </p>
          </div>
        </AnimationWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <AnimationWrapper 
              key={product.id} 
              animation="animate-slide-in-up" 
              delay={200 + (index * 100)}
            >
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-gray-600 hover-lift hover-glow group transform hover:scale-[1.02]">
                <div className="h-48 bg-gray-700/50 backdrop-blur-sm border-b border-gray-600 flex items-center justify-center relative overflow-hidden">
                  <div className="text-gray-400 text-center z-10 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-4xl mb-2 animate-float">🎵</div>
                    <div className="text-sm">{product.category}</div>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-blue-400 font-semibold mb-2 group-hover:text-blue-300 transition-colors">
                    {product.category} • {product.brand}
                  </div>
                  <h3 className="text-xl font-bold text-gray-100 mb-2 group-hover:text-white transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-300 mb-4 group-hover:text-gray-200 transition-colors line-clamp-2">
                    {product.description}
                  </p>
                  
                  {/* Price */}
                  <div className="mb-4">
                    <div className="text-lg font-bold text-green-400">
                      {product.wholesalePrice.toLocaleString('vi-VN')}₫
                    </div>
                    <div className="text-sm text-gray-400 line-through">
                      {product.price.toLocaleString('vi-VN')}₫
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-1 mb-4">
                    {product.features.slice(0, 3).map((feature, featureIndex) => (
                      <li 
                        key={`${product.id}-feature-${featureIndex}`} 
                        className="text-sm text-gray-400 flex items-center group-hover:text-gray-300 transition-colors"
                        style={{transitionDelay: `${featureIndex * 50}ms`}}
                      >
                        <span className="text-green-400 mr-2 group-hover:text-green-300 transition-colors">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Stock status */}
                  <div className="mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs border ${
                      product.inStock > 10 
                        ? 'bg-green-900/50 border-green-700 text-green-300' 
                        : product.inStock > 0
                        ? 'bg-yellow-900/50 border-yellow-700 text-yellow-300'
                        : 'bg-red-900/50 border-red-700 text-red-300'
                    }`}>
                      {product.inStock > 0 ? `Còn ${product.inStock} sản phẩm` : 'Hết hàng'}
                    </span>
                  </div>

                  <Link 
                    href={`/products/${product.id}`}
                    className="inline-block bg-blue-600/80 border border-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                  >
                    Xem Chi Tiết
                  </Link>
                </div>
              </div>
            </AnimationWrapper>
          ))}
        </div>

        <AnimationWrapper animation="animate-zoom-in" delay={800}>
          <div className="text-center mt-12">
            <Link 
              href="/products" 
              className="bg-blue-600/80 border border-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:border-blue-400 transition-all duration-300 hover-lift transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            >
              Xem Tất Cả Sản Phẩm
            </Link>
          </div>
        </AnimationWrapper>
      </div>
    </section>
  );
}
