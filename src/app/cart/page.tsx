'use client';

import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Cart() {
  const { user } = useAuth();
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalItems, 
    getTotalPrice, 
    getWholesaleTotal 
  } = useCart();

  if (user?.isGuest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
          <div className="text-center bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl p-12 animate-scale-in animation-delay-200">
            <div className="text-6xl mb-4 animate-bounce">🔒</div>
            <h1 className="text-3xl font-bold text-gray-100 mb-4 animate-slide-up animation-delay-300">Truy Cập Bị Hạn Chế</h1>
            <p className="text-xl text-gray-300 mb-8 animate-slide-up animation-delay-400">
              Giỏ hàng chỉ dành cho các đại lý được ủy quyền. Vui lòng đăng nhập bằng thông tin đại lý của bạn.
            </p>
          </div>
        </div>
        
        {/* Separator before footer */}
        <div className="border-t border-gray-600 mx-4 sm:mx-6 lg:mx-8 mt-8"></div>
        
        <Footer />
      </div>
    );
  }

  const savings = getTotalPrice() - getWholesaleTotal();
  const savingsPercent = getTotalPrice() > 0 ? Math.round((savings / getTotalPrice()) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-100 mb-8 animate-slide-up">
          Giỏ Hàng ({getTotalItems()} sản phẩm)
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-16 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl animate-scale-in animation-delay-200">
            <div className="text-gray-400 text-6xl mb-4 animate-bounce">🛒</div>
            <h2 className="text-2xl font-semibold text-gray-100 mb-4 animate-slide-up animation-delay-300">
              Giỏ hàng của bạn trống
            </h2>
            <p className="text-gray-300 mb-8 animate-slide-up animation-delay-400">
              Duyệt danh mục bán sỉ của chúng tôi để tìm sản phẩm cho doanh nghiệp của bạn
            </p>
            <Link
              href="/products"
              className="bg-blue-600/80 border border-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-blue-500/25 animate-fade-in animation-delay-500"
            >
              Duyệt Sản Phẩm
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in animation-delay-200">
            {/* Cart Items */}
            <div className="lg:col-span-2 animate-slide-right">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl hover:shadow-2xl hover:border-gray-600 transition-all duration-300">
                <div className="p-6 border-b border-gray-600">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-100">
                      Sản Phẩm Trong Giỏ
                    </h2>
                    <button
                      onClick={clearCart}
                      className="text-red-400 hover:text-red-300 text-sm transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      Xóa Giỏ Hàng
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-gray-600">
                  {items.map((item, index) => (
                    <div key={item.id} className="p-6 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="flex items-center space-x-4">
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-gray-700/50 backdrop-blur-sm border border-gray-600 rounded-lg flex items-center justify-center group hover:border-gray-500 transition-all duration-300">
                          <span className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors duration-300">IMG</span>
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-medium text-gray-100 group-hover:text-blue-400 transition-colors duration-300">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-300">
                            SKU: {item.sku} • {item.category}
                          </p>
                          <div className="mt-2 flex items-center space-x-4">
                            <div className="text-sm text-gray-400">
                              Min order: {item.minOrderQty}
                            </div>
                            <div className="text-sm text-gray-400">
                              In stock: {item.inStock}
                            </div>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-gray-700/50 backdrop-blur-sm border border-gray-600 flex items-center justify-center text-gray-300 hover:bg-gray-600/50 hover:border-gray-500 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
                          >
                            -
                          </button>
                          <span className="text-lg font-medium text-gray-100 w-12 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-gray-700/50 backdrop-blur-sm border border-gray-600 flex items-center justify-center text-gray-300 hover:bg-gray-600/50 hover:border-gray-500 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
                          >
                            +
                          </button>
                        </div>

                        {/* Pricing */}
                        <div className="text-right">
                          <div className="text-lg font-semibold text-green-400">
                            ${(item.wholesalePrice * item.quantity).toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-400 line-through">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          <div className="text-xs text-green-400">
                            Save ${((item.price - item.wholesalePrice) * item.quantity).toFixed(2)}
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover:text-red-300 p-2 transition-all duration-300 hover:scale-110 active:scale-95"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 animate-slide-left animation-delay-300">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl p-6 sticky top-24 hover:shadow-2xl hover:border-gray-600 transition-all duration-300">
                <h2 className="text-xl font-semibold text-gray-100 mb-6">
                  Tóm Tắt Đơn Hàng
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-gray-300">
                    <span>Sản phẩm ({getTotalItems()})</span>
                    <span>${getWholesaleTotal().toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-gray-300">
                    <span>Tổng MSRP</span>
                    <span className="line-through">${getTotalPrice().toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-green-400 font-medium">
                    <span>Bạn Tiết Kiệm ({savingsPercent}%)</span>
                    <span>${savings.toFixed(2)}</span>
                  </div>

                  <div className="border-t border-gray-600 pt-4">
                    <div className="flex justify-between text-gray-300">
                      <span>Thuế Ước Tính</span>
                      <span>${(getWholesaleTotal() * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-300 mt-2">
                      <span>Vận Chuyển</span>
                      <span>Tính khi thanh toán</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-600 pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-100">
                      <span>Tổng Cộng</span>
                      <span>${(getWholesaleTotal() + getWholesaleTotal() * 0.08).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Link
                    href="/checkout"
                    className="block w-full text-center bg-blue-600/80 border border-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-blue-500/25"
                  >
                    Tiến Hành Thanh Toán
                  </Link>
                  <Link
                    href="/products"
                    className="block w-full text-center border border-gray-600 text-gray-200 py-3 rounded-lg font-semibold hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    Tiếp Tục Mua Sắm
                  </Link>
                </div>

                {/* Wholesale Benefits */}
                <div className="mt-6 p-4 bg-green-900/30 backdrop-blur-sm border border-green-700/50 rounded-lg">
                  <h3 className="text-sm font-semibold text-green-300 mb-2">
                    Lợi Ích Bán Sỉ
                  </h3>
                  <ul className="text-xs text-green-400 space-y-1">
                    <li>• Giảm giá số lượng lớn</li>
                    <li>• Vận chuyển ưu tiên</li>
                    <li>• Bảo hành mở rộng</li>
                    <li>• Hỗ trợ chuyên dụng</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Separator before footer */}
      <div className="border-t border-gray-600 mx-4 sm:mx-6 lg:mx-8 mt-8"></div>

      <Footer />
    </div>
  );
}
