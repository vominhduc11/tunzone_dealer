'use client';

import { useState } from 'react';

interface InventoryMetric {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: string;
  color: string;
}

interface TopProduct {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  value: number;
  movement: 'in' | 'out' | 'stable';
  image: string;
}

const metrics: InventoryMetric[] = [
  {
    title: 'Tổng Giá Trị Tồn Kho',
    value: '₫2,847,500,000',
    change: '+12.5%',
    trend: 'up',
    icon: '💰',
    color: 'text-green-400'
  },
  {
    title: 'Số Lượng Sản Phẩm',
    value: '1,247',
    change: '+8.2%',
    trend: 'up',
    icon: '📦',
    color: 'text-blue-400'
  },
  {
    title: 'Sản Phẩm Sắp Hết',
    value: '23',
    change: '-15.3%',
    trend: 'down',
    icon: '⚠️',
    color: 'text-yellow-400'
  },
  {
    title: 'Tỷ Lệ Luân Chuyển',
    value: '4.2x',
    change: '+0.8x',
    trend: 'up',
    icon: '🔄',
    color: 'text-purple-400'
  },
  {
    title: 'Giá Trị Trung Bình/SP',
    value: '₫2,285,000',
    change: '+3.7%',
    trend: 'up',
    icon: '📊',
    color: 'text-indigo-400'
  },
  {
    title: 'Kho Hàng Hoạt Động',
    value: '5/6',
    change: 'Ổn định',
    trend: 'stable',
    icon: '🏪',
    color: 'text-gray-400'
  }
];

const topProducts: TopProduct[] = [
  {
    id: '1',
    name: 'Sony WH-1000XM5',
    sku: 'SONY-WH1000XM5',
    category: 'Tai Nghe',
    stock: 45,
    value: 135000000,
    movement: 'out',
    image: '🎧'
  },
  {
    id: '2',
    name: 'Bose QuietComfort 45',
    sku: 'BOSE-QC45',
    category: 'Tai Nghe',
    stock: 32,
    value: 96000000,
    movement: 'in',
    image: '🎧'
  },
  {
    id: '3',
    name: 'JBL Charge 5',
    sku: 'JBL-CHARGE5',
    category: 'Loa Bluetooth',
    stock: 78,
    value: 156000000,
    movement: 'stable',
    image: '🔊'
  },
  {
    id: '4',
    name: 'Audio-Technica AT2020',
    sku: 'AT-AT2020',
    category: 'Microphone',
    stock: 15,
    value: 45000000,
    movement: 'out',
    image: '🎤'
  },
  {
    id: '5',
    name: 'Yamaha HS8',
    sku: 'YAMAHA-HS8',
    category: 'Monitor Speaker',
    stock: 28,
    value: 168000000,
    movement: 'in',
    image: '🔈'
  }
];

const recentActivities = [
  {
    id: '1',
    type: 'in',
    description: 'Nhập kho 50 Sony WH-1000XM5 từ nhà cung cấp',
    timestamp: '2 giờ trước',
    user: 'Nguyễn Văn A',
    value: '+₫150,000,000'
  },
  {
    id: '2',
    type: 'out',
    description: 'Xuất kho 25 JBL Charge 5 cho đơn hàng #TZ-2024-001234',
    timestamp: '4 giờ trước',
    user: 'Trần Thị B',
    value: '-₫50,000,000'
  },
  {
    id: '3',
    type: 'adjustment',
    description: 'Điều chỉnh tồn kho Bose QC45 sau kiểm kê',
    timestamp: '6 giờ trước',
    user: 'Lê Văn C',
    value: '-₫6,000,000'
  },
  {
    id: '4',
    type: 'transfer',
    description: 'Chuyển kho 15 Audio-Technica AT2020 từ Kho A sang Kho B',
    timestamp: '1 ngày trước',
    user: 'Phạm Thị D',
    value: '₫0'
  }
];

export default function InventoryOverview() {
  const [selectedPeriod, setSelectedPeriod] = useState('7days');

  const periods = [
    { value: '24h', label: '24 Giờ' },
    { value: '7days', label: '7 Ngày' },
    { value: '30days', label: '30 Ngày' },
    { value: '90days', label: '90 Ngày' }
  ];

  const getMovementIcon = (movement: string) => {
    switch (movement) {
      case 'in': return '📈';
      case 'out': return '📉';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'in': return '📥';
      case 'out': return '📤';
      case 'adjustment': return '⚖️';
      case 'transfer': return '🔄';
      default: return '📋';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'in': return 'text-green-400 bg-green-900/30 border-green-700';
      case 'out': return 'text-red-400 bg-red-900/30 border-red-700';
      case 'adjustment': return 'text-yellow-400 bg-yellow-900/30 border-yellow-700';
      case 'transfer': return 'text-blue-400 bg-blue-900/30 border-blue-700';
      default: return 'text-gray-400 bg-gray-900/30 border-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* Period Selector */}
      <div className="flex justify-between items-center animate-fade-in-up">
        <h2 className="text-2xl font-bold text-gray-100">Tổng Quan Kho Hàng</h2>
        <div className="flex space-x-2">
          {periods.map(period => (
            <button
              key={period.value}
              onClick={() => setSelectedPeriod(period.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedPeriod === period.value
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 border border-gray-600'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up animation-delay-200">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-gray-600 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">{metric.icon}</div>
              <div className={`flex items-center space-x-1 text-sm ${
                metric.trend === 'up' ? 'text-green-400' :
                metric.trend === 'down' ? 'text-red-400' : 'text-gray-400'
              }`}>
                <span>{metric.trend === 'up' ? '↗️' : metric.trend === 'down' ? '↘️' : '➡️'}</span>
                <span>{metric.change}</span>
              </div>
            </div>
            <div className="mb-2">
              <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
            </div>
            <div className="text-gray-400 text-sm">{metric.title}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Products */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 animate-fade-in-up animation-delay-400">
          <h3 className="text-xl font-semibold text-gray-100 mb-6 flex items-center">
            <span className="mr-2">🏆</span>
            Top Sản Phẩm Theo Giá Trị
          </h3>
          <div className="space-y-4">
            {topProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg hover:bg-gray-600/30 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{product.image}</div>
                  <div>
                    <div className="font-medium text-gray-100">{product.name}</div>
                    <div className="text-sm text-gray-400">{product.sku} • {product.category}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-100">
                    {product.stock} units
                  </div>
                  <div className="text-sm text-gray-400">
                    ₫{product.value.toLocaleString()}
                  </div>
                  <div className="text-xs flex items-center justify-end mt-1">
                    <span className="mr-1">{getMovementIcon(product.movement)}</span>
                    <span className={
                      product.movement === 'in' ? 'text-green-400' :
                      product.movement === 'out' ? 'text-red-400' : 'text-gray-400'
                    }>
                      {product.movement === 'in' ? 'Tăng' :
                       product.movement === 'out' ? 'Giảm' : 'Ổn định'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 animate-fade-in-up animation-delay-500">
          <h3 className="text-xl font-semibold text-gray-100 mb-6 flex items-center">
            <span className="mr-2">📋</span>
            Hoạt Động Gần Đây
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-4 p-4 bg-gray-700/30 rounded-lg hover:bg-gray-600/30 transition-all duration-300"
              >
                <div className={`p-2 rounded-lg border ${getActivityColor(activity.type)}`}>
                  <span className="text-lg">{getActivityIcon(activity.type)}</span>
                </div>
                <div className="flex-1">
                  <div className="text-gray-100 text-sm mb-1">{activity.description}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-400">
                      {activity.timestamp} • {activity.user}
                    </div>
                    <div className={`text-sm font-medium ${
                      activity.value.startsWith('+') ? 'text-green-400' :
                      activity.value.startsWith('-') ? 'text-red-400' : 'text-gray-400'
                    }`}>
                      {activity.value}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <button className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">
              Xem Tất Cả Hoạt Động →
            </button>
          </div>
        </div>
      </div>

      {/* Inventory Health Chart */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 animate-fade-in-up animation-delay-600">
        <h3 className="text-xl font-semibold text-gray-100 mb-6 flex items-center">
          <span className="mr-2">📊</span>
          Tình Trạng Tồn Kho
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="absolute inset-0 bg-green-600 rounded-full opacity-20"></div>
              <div className="absolute inset-2 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">78%</span>
              </div>
            </div>
            <div className="text-gray-100 font-medium">Tồn Kho Tốt</div>
            <div className="text-sm text-gray-400">972 sản phẩm</div>
          </div>
          
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="absolute inset-0 bg-yellow-600 rounded-full opacity-20"></div>
              <div className="absolute inset-2 bg-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">15%</span>
              </div>
            </div>
            <div className="text-gray-100 font-medium">Sắp Hết Hàng</div>
            <div className="text-sm text-gray-400">187 sản phẩm</div>
          </div>
          
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="absolute inset-0 bg-red-600 rounded-full opacity-20"></div>
              <div className="absolute inset-2 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">5%</span>
              </div>
            </div>
            <div className="text-gray-100 font-medium">Hết Hàng</div>
            <div className="text-sm text-gray-400">62 sản phẩm</div>
          </div>
          
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="absolute inset-0 bg-blue-600 rounded-full opacity-20"></div>
              <div className="absolute inset-2 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">2%</span>
              </div>
            </div>
            <div className="text-gray-100 font-medium">Thừa Hàng</div>
            <div className="text-sm text-gray-400">26 sản phẩm</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up animation-delay-700">
        <button className="bg-green-600/20 border border-green-600/50 hover:bg-green-600/30 text-green-400 p-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-center">
          <div className="text-3xl mb-2">📥</div>
          <div className="font-medium">Nhập Kho</div>
        </button>
        
        <button className="bg-red-600/20 border border-red-600/50 hover:bg-red-600/30 text-red-400 p-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-center">
          <div className="text-3xl mb-2">📤</div>
          <div className="font-medium">Xuất Kho</div>
        </button>
        
        <button className="bg-blue-600/20 border border-blue-600/50 hover:bg-blue-600/30 text-blue-400 p-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-center">
          <div className="text-3xl mb-2">🔍</div>
          <div className="font-medium">Kiểm Kê</div>
        </button>
        
        <button className="bg-purple-600/20 border border-purple-600/50 hover:bg-purple-600/30 text-purple-400 p-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-center">
          <div className="text-3xl mb-2">📊</div>
          <div className="font-medium">Báo Cáo</div>
        </button>
      </div>
    </div>
  );
}
