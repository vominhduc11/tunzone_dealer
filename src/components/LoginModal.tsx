'use client';

import { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (credentials: { email: string; password: string }) => void;
}

export default function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation for demo purposes
      if (formData.email === 'dealer@tunezone.com' && formData.password === 'password123') {
        onLogin(formData);
        onClose();
      } else {
        setError('Email hoặc mật khẩu không hợp lệ. Thử: dealer@tunezone.com / password123');
      }
    } catch {
      setError('Đăng nhập thất bại. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ email: '', password: '' });
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl z-10 transition-colors duration-200"
        aria-label="Đóng"
      >
        ×
      </button>

      {/* Modal */}
      <div className="relative bg-gray-800/90 backdrop-blur-md border border-gray-700 rounded-lg shadow-2xl w-full max-w-md mx-4 p-6 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-blue-400 mb-2">🎵 TuneZone</div>
          <h2 className="text-2xl font-bold text-gray-100 mb-2">Chào Mừng Trở Lại</h2>
          <p className="text-gray-400">Vui lòng đăng nhập để truy cập cổng thông tin đại lý</p>
        </div>

        {/* Demo Credentials */}
        <div className="mb-4 p-3 bg-blue-900/30 border border-blue-700 rounded-lg">
          <p className="text-sm text-blue-300 font-medium mb-1">Thông tin đăng nhập demo:</p>
          <p className="text-xs text-blue-400">Email: dealer@tunezone.com</p>
          <p className="text-xs text-blue-400">Mật khẩu: password123</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded-lg">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-gray-100 placeholder-gray-400"
              placeholder="dealer@tunezone.com"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Mật Khẩu
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-gray-100 placeholder-gray-400"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang đăng nhập...
              </>
            ) : (
              'Đăng Nhập'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-400">
            Cần trợ giúp truy cập tài khoản?{' '}
            <button
              onClick={() => {
                onClose();
                // Navigate to contact page
                window.location.href = '/contact';
              }}
              className="text-blue-400 hover:text-blue-300 hover:underline font-medium transition-colors duration-200"
              disabled={isLoading}
            >
              Liên Hệ Hỗ Trợ
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
