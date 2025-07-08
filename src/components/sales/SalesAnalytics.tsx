'use client';

import { useState } from 'react';

interface SalesMetric {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: string;
  color: string;
}

interface MonthlyData {
  month: string;
  sales: number;
  orders: number;
  commission: number;
  customers: number;
}

interface ProductPerformance {
  productName: string;
  quantity: number;
  revenue: number;
  commission: number;
  percentage: number;
}

const metrics: SalesMetric[] = [
  {
    title: 'Doanh Thu Tháng Này',
    value: '₫2,847,500,000',
    change: '+18.5%',
    trend: 'up',
    icon: '💰',
    color: 'text-green-400'
  },
  {
    title: 'Số Đơn Hàng',
    value: '156',
    change: '+12.3%',
    trend: 'up',
    icon: '📦',
    color: 'text-blue-400'
  },
  {
    title: 'Hoa Hồng Tích Lũy',
    value: '₫142,375,000',
    change: '+15.7%',
    trend: 'up',
    icon: '💎',
    color: 'text-purple-400'
  },
  {
    title: 'Khách Hàng Mới',
    value: '23',
    change: '+8.9%',
    trend: 'up',
    icon: '👥',
    color: 'text-yellow-400'
  },
  {
    title: 'Giá Trị TB/Đơn',
    value: '₫18,253,000',
    change: '+5.2%',
    trend: 'up',
    icon: '📊',
    color: 'text-indigo-400'
  },
  {
    title: 'Tỷ Lệ Chuyển Đổi',
    value: '68.5%',
    change: '+3.1%',
    trend: 'up',
    icon: '🎯',
    color: 'text-orange-400'
  }
];

const monthlyData: MonthlyData[] = [
  { month: 'T7/2023', sales: 1850000000, orders: 98, commission: 92500000, customers: 15 },
  { month: 'T8/2023', sales: 2100000000, orders: 112, commission: 105000000, customers: 18 },
  { month: 'T9/2023', sales: 2350000000, orders: 128, commission: 117500000, customers: 21 },
  { month: 'T10/2023', sales: 2200000000, orders: 115, commission: 110000000, customers: 19 },
  { month: 'T11/2023', sales: 2650000000, orders: 142, commission: 132500000, customers: 25 },
  { month: 'T12/2023', sales: 2400000000, orders: 135, commission: 120000000, customers: 22 },
  { month: 'T1/2024', sales: 2847500000, orders: 156, commission: 142375000, customers: 28 }
];

const productPerformance: ProductPerformance[] = [
  { productName: 'Sony WH-1000XM5', quantity: 45, revenue: 382500000, commission: 19125000, percentage: 13.4 },
  { productName: 'JBL Charge 5', quantity: 78, revenue: 273000000, commission: 13650000, percentage: 9.6 },
  { productName: 'Yamaha HS8', quantity: 28, revenue: 350000000, commission: 17500000, percentage: 12.3 },
  { productName: 'Bose QuietComfort 45', quantity: 32, revenue: 230400000, commission: 11520000, percentage: 8.1 },
  { productName: 'Audio-Technica AT2020', quantity: 65, revenue: 182000000, commission: 9100000, percentage: 6.4 }
];

export default function SalesAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedChart, setSelectedChart] = useState('revenue');

  const periods = [
    { value: 'daily', label: 'Hàng Ngày' },
    { value: 'weekly', label: 'Hàng Tuần' },
    { value: 'monthly', label: 'Hàng Tháng' },
    { value: 'quarterly', label: 'Hàng Quý' },
    { value: 'yearly', label: 'Hàng Năm' }
  ];

  const chartTypes = [
    { value: 'revenue', label: 'Doanh Thu', icon: '💰' },
    { value: 'orders', label: 'Đơn Hàng', icon: '📦' },
    { value: 'commission', label: 'Hoa Hồng', icon: '💎' },
    { value: 'customers', label: 'Khách Hàng', icon: '👥' }
  ];

  const exportReport = (format: string) => {
    console.log(`Exporting sales report in ${format} format`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-gray-100">Thống Kê & Báo Cáo Bán Hàng</h2>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => exportReport('pdf')}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
          >
            <span>📄</span>
            <span>PDF</span>
          </button>
          <button 
            onClick={() => exportReport('excel')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
          >
            <span>📊</span>
            <span>Excel</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
            <span>📧</span>
            <span>Email</span>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 animate-fade-in-up animation-delay-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Kỳ Báo Cáo</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-gray-100 transition-all duration-300"
            >
              {periods.map(period => (
                <option key={period.value} value={period.value}>{period.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Loại Biểu Đồ</label>
            <select
              value={selectedChart}
              onChange={(e) => setSelectedChart(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-gray-100 transition-all duration-300"
            >
              {chartTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.icon} {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up animation-delay-400">
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Trend */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 animate-fade-in-up animation-delay-600">
          <h3 className="text-xl font-semibold text-gray-100 mb-6 flex items-center">
            <span className="mr-2">📈</span>
            Xu Hướng Theo Tháng
          </h3>
          
          <div className="space-y-4">
            {monthlyData.map((data) => (
              <div key={data.month} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                <div>
                  <div className="font-medium text-gray-100">{data.month}</div>
                  <div className="text-sm text-gray-400">{data.orders} đơn hàng</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-400">
                    ₫{data.sales.toLocaleString()}
                  </div>
                  <div className="text-sm text-purple-400">
                    HH: ₫{data.commission.toLocaleString()}
                  </div>
                </div>
                <div className="w-20 bg-gray-600 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${(data.sales / Math.max(...monthlyData.map(d => d.sales))) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Performance */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 animate-fade-in-up animation-delay-700">
          <h3 className="text-xl font-semibold text-gray-100 mb-6 flex items-center">
            <span className="mr-2">🏆</span>
            Top Sản Phẩm Bán Chạy
          </h3>
          
          <div className="space-y-4">
            {productPerformance.map((product, index) => (
              <div key={product.productName} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">#{index + 1}</span>
                    <span className="font-medium text-gray-100">{product.productName}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-400">
                      ₫{product.revenue.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">{product.quantity} sản phẩm</div>
                  </div>
                </div>
                
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      index === 0 ? 'bg-yellow-500' :
                      index === 1 ? 'bg-green-500' :
                      index === 2 ? 'bg-blue-500' :
                      index === 3 ? 'bg-purple-500' : 'bg-gray-500'
                    }`}
                    style={{ width: `${product.percentage * 5}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{product.percentage}% tổng doanh thu</span>
                  <span>HH: ₫{product.commission.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Analytics Table */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden animate-fade-in-up animation-delay-800">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-xl font-semibold text-gray-100 flex items-center">
            <span className="mr-2">📋</span>
            Báo Cáo Chi Tiết - {selectedPeriod === 'monthly' ? 'Hàng Tháng' : 'Tùy Chọn'}
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50 border-b border-gray-600">
              <tr>
                <th className="px-6 py-3 text-left text-gray-200 font-medium">Tháng</th>
                <th className="px-6 py-3 text-left text-gray-200 font-medium">Doanh Thu</th>
                <th className="px-6 py-3 text-left text-gray-200 font-medium">Đơn Hàng</th>
                <th className="px-6 py-3 text-left text-gray-200 font-medium">Khách Hàng</th>
                <th className="px-6 py-3 text-left text-gray-200 font-medium">Hoa Hồng</th>
                <th className="px-6 py-3 text-left text-gray-200 font-medium">TB/Đơn</th>
                <th className="px-6 py-3 text-left text-gray-200 font-medium">Tăng Trưởng</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {monthlyData.map((data) => (
                <tr key={data.month} className="hover:bg-gray-700/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-100">{data.month}</td>
                  <td className="px-6 py-4 text-green-400 font-semibold">₫{data.sales.toLocaleString()}</td>
                  <td className="px-6 py-4 text-blue-400">{data.orders}</td>
                  <td className="px-6 py-4 text-yellow-400">{data.customers}</td>
                  <td className="px-6 py-4 text-purple-400">₫{data.commission.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-300">₫{Math.round(data.sales / data.orders).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      index === 0 ? 'text-green-400 bg-green-900/30' :
                      index === 1 ? 'text-blue-400 bg-blue-900/30' :
                      'text-gray-400 bg-gray-900/30'
                    }`}>
                      {index === 0 ? '+18.5%' : index === 1 ? '+12.3%' : index === 2 ? '+8.7%' : '+5.2%'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 animate-fade-in-up animation-delay-900">
        <h3 className="text-xl font-semibold text-gray-100 mb-6 flex items-center">
          <span className="mr-2">🎯</span>
          Tóm Tắt Hiệu Suất
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="absolute inset-0 bg-green-600 rounded-full opacity-20"></div>
              <div className="absolute inset-2 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">85%</span>
              </div>
            </div>
            <div className="text-gray-100 font-medium">Đạt Mục Tiêu</div>
            <div className="text-sm text-gray-400">Doanh thu tháng này</div>
          </div>
          
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="absolute inset-0 bg-blue-600 rounded-full opacity-20"></div>
              <div className="absolute inset-2 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">92%</span>
              </div>
            </div>
            <div className="text-gray-100 font-medium">Tỷ Lệ Thành Công</div>
            <div className="text-sm text-gray-400">Chốt đơn thành công</div>
          </div>
          
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="absolute inset-0 bg-purple-600 rounded-full opacity-20"></div>
              <div className="absolute inset-2 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">5.0%</span>
              </div>
            </div>
            <div className="text-gray-100 font-medium">Tỷ Lệ Hoa Hồng</div>
            <div className="text-sm text-gray-400">Trung bình trên doanh thu</div>
          </div>
          
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="absolute inset-0 bg-yellow-600 rounded-full opacity-20"></div>
              <div className="absolute inset-2 bg-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">4.8</span>
              </div>
            </div>
            <div className="text-gray-100 font-medium">Đánh Giá KH</div>
            <div className="text-sm text-gray-400">Trên thang điểm 5</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up animation-delay-1000">
        <button className="bg-green-600/20 border border-green-600/50 hover:bg-green-600/30 text-green-400 p-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-center">
          <div className="text-3xl mb-2">📊</div>
          <div className="font-medium">Báo Cáo Tùy Chỉnh</div>
        </button>
        
        <button className="bg-blue-600/20 border border-blue-600/50 hover:bg-blue-600/30 text-blue-400 p-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-center">
          <div className="text-3xl mb-2">📅</div>
          <div className="font-medium">Lên Lịch Báo Cáo</div>
        </button>
        
        <button className="bg-purple-600/20 border border-purple-600/50 hover:bg-purple-600/30 text-purple-400 p-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-center">
          <div className="text-3xl mb-2">🎯</div>
          <div className="font-medium">Đặt Mục Tiêu</div>
        </button>
        
        <button className="bg-orange-600/20 border border-orange-600/50 hover:bg-orange-600/30 text-orange-400 p-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-center">
          <div className="text-3xl mb-2">📈</div>
          <div className="font-medium">Dự Báo Doanh Thu</div>
        </button>
      </div>
    </div>
  );
}
