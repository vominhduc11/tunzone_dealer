'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import CartDropdown from './CartDropdown';
import NotificationCenter from './notifications/NotificationCenter';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, logout, setShowLoginModal } = useAuth();
  const { getTotalItems } = useCart();

  return (
    <header className="bg-gray-900/95 backdrop-blur-sm shadow-xl sticky top-0 z-50 border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
              TuneZone Nhà Phân Phối
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-200 hover:text-blue-400 transition-colors">
              Trang Chủ
            </Link>
            <Link href="/products" className="text-gray-200 hover:text-blue-400 transition-colors">
              Sản Phẩm
            </Link>
            {!user?.isGuest && (
              <>
                <Link href="/orders" className="text-gray-200 hover:text-blue-400 transition-colors">
                  Đơn Hàng
                </Link>
                <Link href="/sales" className="text-gray-200 hover:text-blue-400 transition-colors">
                  Bán Hàng
                </Link>
              </>
            )}
            <Link href="/support" className="text-gray-200 hover:text-blue-400 transition-colors">
              Hỗ Trợ
            </Link>
            <Link href="/contact" className="text-gray-200 hover:text-blue-400 transition-colors">
              Liên Hệ
            </Link>
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <NotificationCenter />

            {/* Shopping Cart */}
            {!user?.isGuest && (
              <div className="relative">
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="p-2 rounded-lg text-gray-200 hover:bg-gray-800/50 hover:text-blue-400 transition-all duration-300 relative transform hover:scale-110"
                  aria-label="Giỏ hàng"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
                  </svg>
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </button>
                <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
              </div>
            )}

            {/* User Menu / Login */}
            <div className="hidden md:flex items-center space-x-4">
              {user?.isGuest ? (
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Đăng Nhập Đại Lý
                </button>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                    </div>
                    <span className="font-medium">{user?.name || 'Đại Lý'}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800/90 backdrop-blur-md border border-gray-700 rounded-lg shadow-xl py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-700">
                        <p className="text-sm font-medium text-gray-100">{user?.name || 'Đại Lý'}</p>
                        <p className="text-sm text-gray-400">{user?.email}</p>
                      </div>
                      <Link 
                        href="/dealer-dashboard" 
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-gray-100 transition-colors duration-200"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Bảng Điều Khiển
                      </Link>
                      <Link 
                        href="/orders" 
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Đơn Hàng
                      </Link>
                      <Link 
                        href="/inventory" 
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Kho Hàng
                      </Link>
                      <Link 
                        href="/warranty-check" 
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Kiểm Tra Bảo Hành
                      </Link>
                      <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                        <button
                          onClick={() => {
                            logout();
                            setIsUserMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          Đăng Xuất
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800/90 backdrop-blur-md border-t border-gray-700">
              <Link href="/" className="block px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-gray-700/50 rounded transition-colors duration-200">
                Trang Chủ
              </Link>
              <Link href="/products" className="block px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-gray-700/50 rounded transition-colors duration-200">
                Sản Phẩm
              </Link>
              {!user?.isGuest && (
                <>
                  <Link href="/orders" className="block px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-gray-700/50 rounded transition-colors duration-200">
                    Đơn Hàng
                  </Link>
                  <Link href="/sales" className="block px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-gray-700/50 rounded transition-colors duration-200">
                    Bán Hàng
                  </Link>
                </>
              )}
              <Link href="/support" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                Hỗ Trợ
              </Link>
              <Link href="/contact" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                Liên Hệ
              </Link>
              {user?.isGuest ? (
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className="block mx-3 my-2 px-3 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Đăng Nhập Đại Lý
                </button>
              ) : (
                <button
                  onClick={logout}
                  className="block mx-3 my-2 px-3 py-2 bg-red-600 text-white rounded-lg"
                >
                  Đăng Xuất
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
