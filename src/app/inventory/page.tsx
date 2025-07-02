'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InventoryOverview from '@/components/inventory/InventoryOverview';
import StockManagement from '@/components/inventory/StockManagement';
import WarehouseLocations from '@/components/inventory/WarehouseLocations';
import InventoryReports from '@/components/inventory/InventoryReports';
import StockMovements from '@/components/inventory/StockMovements';
import LowStockAlerts from '@/components/inventory/LowStockAlerts';

export default function Inventory() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Tổng Quan', icon: '📊' },
    { id: 'stock', label: 'Quản Lý Tồn Kho', icon: '📦' },
    { id: 'movements', label: 'Xuất Nhập Kho', icon: '🔄' },
    { id: 'locations', label: 'Vị Trí Kho', icon: '🏪' },
    { id: 'alerts', label: 'Cảnh Báo', icon: '⚠️' },
    { id: 'reports', label: 'Báo Cáo', icon: '📈' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16 shadow-lg animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-up">
              Quản Lý Kho Hàng
            </h1>
            <p className="text-xl max-w-3xl mx-auto animate-slide-up animation-delay-200">
              Theo dõi và quản lý tồn kho một cách hiệu quả với hệ thống báo cáo chi tiết và cảnh báo thông minh
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center animate-fade-in-up animation-delay-300">
              <div className="text-3xl font-bold mb-2">1,247</div>
              <div className="text-sm opacity-90">Tổng Sản Phẩm</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center animate-fade-in-up animation-delay-400">
              <div className="text-3xl font-bold mb-2 text-green-300">₫2.8B</div>
              <div className="text-sm opacity-90">Giá Trị Tồn Kho</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center animate-fade-in-up animation-delay-500">
              <div className="text-3xl font-bold mb-2 text-yellow-300">23</div>
              <div className="text-sm opacity-90">Sản Phẩm Sắp Hết</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center animate-fade-in-up animation-delay-600">
              <div className="text-3xl font-bold mb-2 text-blue-300">5</div>
              <div className="text-sm opacity-90">Kho Hàng</div>
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
                    ? 'bg-purple-600 text-white shadow-lg transform scale-105'
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
          {activeTab === 'overview' && <InventoryOverview />}
          {activeTab === 'stock' && <StockManagement />}
          {activeTab === 'movements' && <StockMovements />}
          {activeTab === 'locations' && <WarehouseLocations />}
          {activeTab === 'alerts' && <LowStockAlerts />}
          {activeTab === 'reports' && <InventoryReports />}
        </div>
      </div>

      {/* Quick Actions Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative group">
          <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
            <span className="text-2xl">⚡</span>
          </button>
          
          {/* Quick Actions Menu */}
          <div className="absolute bottom-16 right-0 bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto">
            <div className="space-y-2 whitespace-nowrap">
              <button className="flex items-center space-x-2 text-gray-300 hover:text-white p-2 rounded hover:bg-gray-700 transition-colors w-full text-left">
                <span>📥</span>
                <span>Nhập Kho Nhanh</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-300 hover:text-white p-2 rounded hover:bg-gray-700 transition-colors w-full text-left">
                <span>📤</span>
                <span>Xuất Kho Nhanh</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-300 hover:text-white p-2 rounded hover:bg-gray-700 transition-colors w-full text-left">
                <span>🔍</span>
                <span>Kiểm Kê Nhanh</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-300 hover:text-white p-2 rounded hover:bg-gray-700 transition-colors w-full text-left">
                <span>📊</span>
                <span>Báo Cáo Nhanh</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
