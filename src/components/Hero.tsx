'use client';

import Link from 'next/link';
import AnimationWrapper from './AnimationWrapper';
import CounterAnimation from './CounterAnimation';
import { useProducts } from '@/contexts/ProductContext';
import { useAuth } from '@/contexts/AuthContext';

export default function Hero() {
  const { products } = useProducts();
  const { user } = useAuth();
  
  // Get the first featured product for the main CTA
  const featuredProduct = products[0];

  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-float"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-white rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center">
          <AnimationWrapper animation="animate-fade-in-down" delay={200}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-gradient bg-clip-text text-transparent">
              Nền Tảng Âm Thanh Cao Cấp Bán Sỉ
            </h1>
          </AnimationWrapper>
          
          <AnimationWrapper animation="animate-fade-in-up" delay={400}>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Truy cập giá bán sỉ cho thiết bị âm thanh cao cấp với hỗ trợ chuyên nghiệp 
              và giao hàng nhanh chóng cho nhu cầu kinh doanh của bạn.
            </p>
          </AnimationWrapper>
          
          <AnimationWrapper animation="animate-zoom-in" delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {featuredProduct ? (
                <Link 
                  href={`/products/${featuredProduct.id}`}
                  className="bg-white/90 backdrop-blur-sm text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition-all duration-300 hover-lift hover-glow transform hover:scale-105 border border-white/20"
                >
                  Xem Sản Phẩm Nổi Bật
                </Link>
              ) : (
                <Link 
                  href="/products" 
                  className="bg-white/90 backdrop-blur-sm text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition-all duration-300 hover-lift hover-glow transform hover:scale-105 border border-white/20"
                >
                  Xem Sản Phẩm
                </Link>
              )}
              
              {!user?.isGuest ? (
                <Link 
                  href="/sales" 
                  className="bg-green-600/90 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-all duration-300 hover-lift hover-glow transform hover:scale-105 border border-green-500/20"
                >
                  💰 Ghi Nhận Bán Hàng
                </Link>
              ) : (
                <Link 
                  href="/products" 
                  className="border-2 border-white/80 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 hover:border-white transition-all duration-300 hover-lift transform hover:scale-105"
                >
                  Tất Cả Sản Phẩm
                </Link>
              )}
            </div>
          </AnimationWrapper>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="bg-blue-900 bg-opacity-80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <AnimationWrapper animation="animate-bounce-in" delay={100} className="animate-stagger-1">
              <div>
                <div className="text-3xl font-bold mb-2">
                  <CounterAnimation end={products.length} suffix="+" />
                </div>
                <div className="text-blue-200">Sản Phẩm Có Sẵn</div>
              </div>
            </AnimationWrapper>
            
            <AnimationWrapper animation="animate-bounce-in" delay={200} className="animate-stagger-2">
              <div>
                <div className="text-3xl font-bold mb-2">
                  <CounterAnimation end={[...new Set(products.map(p => p.brand))].length} suffix="+" />
                </div>
                <div className="text-blue-200">Thương Hiệu Đối Tác</div>
              </div>
            </AnimationWrapper>
            
            <AnimationWrapper animation="animate-bounce-in" delay={300} className="animate-stagger-3">
              <div>
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-blue-200">Hỗ Trợ Khách Hàng</div>
              </div>
            </AnimationWrapper>
            
            <AnimationWrapper animation="animate-bounce-in" delay={400} className="animate-stagger-4">
              <div>
                <div className="text-3xl font-bold mb-2">
                  <CounterAnimation end={products.reduce((sum, p) => sum + p.inStock, 0)} />
                </div>
                <div className="text-blue-200">Sản Phẩm Trong Kho</div>
              </div>
            </AnimationWrapper>
          </div>
        </div>
      </div>
    </section>
  );
}
