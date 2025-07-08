'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SalesForm from '@/components/sales/SalesForm';
import SalesHistory from '@/components/sales/SalesHistory';
import SalesAnalytics from '@/components/sales/SalesAnalytics';
import CustomerManagement from '@/components/sales/CustomerManagement';

export default function Sales() {
  const [activeTab, setActiveTab] = useState('form');

  const tabs = [
    { id: 'form', label: 'Ghi Nhận Bán Hàng', icon: '📝' },
    { id: 'history', label: 'Lịch Sử Bán Hàng', icon: '📋' },
    { id: 'customers', label: 'Quản Lý Khách Hàng', icon: '👥' },
    { id: 'analytics', label: 'Thống Kê & Báo Cáo', icon: '📊' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 shadow-lg animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-up">
              Quản Lý Bán Hàng
            </h1>
            <p className="text-xl max-w-3xl mx-auto animate-slide-up animation-delay-200">
              Ghi nhận và quản lý thông tin bán hàng một cách chuyên nghiệp với hệ thống theo dõi khách hàng và báo cáo chi tiết
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center animate-fade-in-up animation-delay-300">
              <div className="text-3xl font-bold mb-2">₫2.8B</div>
              <div className="text-sm opacity-90">Doanh Thu Tháng Này</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center animate-fade-in-up animation-delay-400">
              <div className="text-3xl font-bold mb-2 text-green-300">156</div>
              <div className="text-sm opacity-90">Đơn Hàng Mới</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center animate-fade-in-up animation-delay-500">
              <div className="text-3xl font-bold mb-2 text-yellow-300">847</div>
              <div className="text-sm opacity-90">Khách Hàng</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center animate-fade-in-up animation-delay-600">
              <div className="text-3xl font-bold mb-2 text-blue-300">98.5%</div>
              <div className="text-sm opacity-90">Tỷ Lệ Hài Lòng</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-12 animate-fade-in animation-delay-300">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-2 inline-flex flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 m-1 ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in animation-delay-500">
          {activeTab === 'form' && <SalesForm />}
          {activeTab === 'history' && <SalesHistory />}
          {activeTab === 'customers' && <CustomerManagement />}
          {activeTab === 'analytics' && <SalesAnalytics />}
        </div>
      </div>

      {/* Quick Actions Floating Menu */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative group">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
            <span className="text-2xl">💼</span>
          </button>
          
          {/* Quick Actions Menu */}
          <div className="absolute bottom-16 right-0 bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto">
            <div className="space-y-2 whitespace-nowrap">
              <button className="flex items-center space-x-2 text-gray-300 hover:text-white p-2 rounded hover:bg-gray-700 transition-colors w-full text-left">
                <span>📝</span>
                <span>Ghi Nhận Nhanh</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-300 hover:text-white p-2 rounded hover:bg-gray-700 transition-colors w-full text-left">
                <span>👤</span>
                <span>Thêm Khách Hàng</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-300 hover:text-white p-2 rounded hover:bg-gray-700 transition-colors w-full text-left">
                <span>📊</span>
                <span>Xem Báo Cáo</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-300 hover:text-white p-2 rounded hover:bg-gray-700 transition-colors w-full text-left">
                <span>📞</span>
                <span>Liên Hệ Hỗ Trợ</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Tips Banner */}
      <section className="bg-green-900/20 border-t border-green-700/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-green-400 mb-3">💡 Mẹo Bán Hàng Hiệu Quả</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-medium text-gray-100 mb-2">Tư Vấn Chính Xác</div>
              <div className="text-sm text-gray-300">Hiểu rõ nhu cầu khách hàng để đưa ra lời khuyên phù hợp nhất</div>
            </div>
            
            <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🤝</div>
              <div className="font-medium text-gray-100 mb-2">Xây Dựng Mối Quan Hệ</div>
              <div className="text-sm text-gray-300">Duy trì liên lạc và chăm sóc khách hàng sau bán hàng</div>
            </div>
            
            <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">📈</div>
              <div className="font-medium text-gray-100 mb-2">Theo Dõi Hiệu Suất</div>
              <div className="text-sm text-gray-300">Phân tích dữ liệu bán hàng để cải thiện chiến lược</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
