'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WarrantyChecker from '@/components/warranty/WarrantyChecker';
import WarrantyDashboard from '@/components/warranty/WarrantyDashboard';
import WarrantyClaims from '@/components/warranty/WarrantyClaims';
import WarrantyPolicies from '@/components/warranty/WarrantyPolicies';
import WarrantyReports from '@/components/warranty/WarrantyReports';

export default function Warranty() {
  const [activeTab, setActiveTab] = useState('checker');

  const tabs = [
    { id: 'checker', label: 'Kiểm Tra Bảo Hành', icon: '🔍' },
    { id: 'dashboard', label: 'Tổng Quan', icon: '📊' },
    { id: 'claims', label: 'Yêu Cầu Bảo Hành', icon: '📋' },
    { id: 'policies', label: 'Chính Sách', icon: '📜' },
    { id: 'reports', label: 'Báo Cáo', icon: '📈' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16 shadow-lg animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-up">
              Kiểm Tra Bảo Hành
            </h1>
            <p className="text-xl max-w-3xl mx-auto animate-slide-up animation-delay-200">
              Hệ thống quản lý bảo hành toàn diện - Kiểm tra tình trạng, xử lý yêu cầu và theo dõi tiến độ bảo hành
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center animate-fade-in-up animation-delay-300">
              <div className="text-3xl font-bold mb-2">2,847</div>
              <div className="text-sm opacity-90">Sản Phẩm Đang Bảo Hành</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center animate-fade-in-up animation-delay-400">
              <div className="text-3xl font-bold mb-2 text-green-300">156</div>
              <div className="text-sm opacity-90">Yêu Cầu Tháng Này</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center animate-fade-in-up animation-delay-500">
              <div className="text-3xl font-bold mb-2 text-yellow-300">23</div>
              <div className="text-sm opacity-90">Đang Xử Lý</div>
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
                    ? 'bg-green-600 text-white shadow-lg transform scale-105'
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
          {activeTab === 'checker' && <WarrantyChecker />}
          {activeTab === 'dashboard' && <WarrantyDashboard />}
          {activeTab === 'claims' && <WarrantyClaims />}
          {activeTab === 'policies' && <WarrantyPolicies />}
          {activeTab === 'reports' && <WarrantyReports />}
        </div>
      </div>

      {/* Quick Access Floating Menu */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative group">
          <button className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
            <span className="text-2xl">🛠️</span>
          </button>
          
          {/* Quick Actions Menu */}
          <div className="absolute bottom-16 right-0 bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto">
            <div className="space-y-2 whitespace-nowrap">
              <button className="flex items-center space-x-2 text-gray-300 hover:text-white p-2 rounded hover:bg-gray-700 transition-colors w-full text-left">
                <span>🔍</span>
                <span>Kiểm Tra Nhanh</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-300 hover:text-white p-2 rounded hover:bg-gray-700 transition-colors w-full text-left">
                <span>📝</span>
                <span>Tạo Yêu Cầu</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-300 hover:text-white p-2 rounded hover:bg-gray-700 transition-colors w-full text-left">
                <span>📞</span>
                <span>Hỗ Trợ Khẩn Cấp</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-300 hover:text-white p-2 rounded hover:bg-gray-700 transition-colors w-full text-left">
                <span>📊</span>
                <span>Báo Cáo Nhanh</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Support Banner */}
      <section className="bg-red-900/20 border-t border-red-700/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl font-bold text-red-400 mb-3">🚨 Hỗ Trợ Bảo Hành Khẩn Cấp</h2>
          <p className="text-gray-300 mb-4">
            Dành cho các trường hợp sản phẩm gặp sự cố nghiêm trọng ảnh hưởng đến hoạt động kinh doanh
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-6">
            <a
              href="tel:1-800-WARRANTY"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <span>📞</span>
              <span>1-800-WARRANTY</span>
            </a>
            <a
              href="mailto:warranty-emergency@tunezone.com"
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <span>✉️</span>
              <span>warranty-emergency@tunezone.com</span>
            </a>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
              <span>💬</span>
              <span>Chat Trực Tiếp</span>
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
