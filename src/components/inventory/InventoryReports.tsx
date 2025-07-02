'use client';

import { useState } from 'react';

interface ReportData {
  period: string;
  totalValue: number;
  totalProducts: number;
  inbound: number;
  outbound: number;
  adjustments: number;
}

interface CategoryReport {
  category: string;
  value: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
  products: number;
}

const reportData: ReportData[] = [
  { period: 'T1/2024', totalValue: 2847500000, totalProducts: 1247, inbound: 425000000, outbound: 312000000, adjustments: -8500000 },
  { period: 'T12/2023', totalValue: 2654000000, totalProducts: 1189, inbound: 380000000, outbound: 295000000, adjustments: -12000000 },
  { period: 'T11/2023', totalValue: 2589000000, totalProducts: 1156, inbound: 356000000, outbound: 278000000, adjustments: -5500000 },
  { period: 'T10/2023', totalValue: 2511000000, totalProducts: 1134, inbound: 334000000, outbound: 267000000, adjustments: -7800000 }
];

const categoryReports: CategoryReport[] = [
  { category: 'Tai Nghe', value: 1138000000, percentage: 40, trend: 'up', products: 487 },
  { category: 'Loa Bluetooth', value: 854000000, percentage: 30, trend: 'stable', products: 312 },
  { category: 'Microphone', value: 427000000, percentage: 15, trend: 'up', products: 198 },
  { category: 'Monitor Speaker', value: 285000000, percentage: 10, trend: 'down', products: 156 },
  { category: 'Phụ Kiện', value: 142000000, percentage: 5, trend: 'stable', products: 94 }
];

export default function InventoryReports() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedReport, setSelectedReport] = useState('overview');

  const periods = [
    { value: 'daily', label: 'Hàng Ngày' },
    { value: 'weekly', label: 'Hàng Tuần' },
    { value: 'monthly', label: 'Hàng Tháng' },
    { value: 'quarterly', label: 'Hàng Quý' },
    { value: 'yearly', label: 'Hàng Năm' }
  ];

  const reportTypes = [
    { value: 'overview', label: 'Tổng Quan', icon: '📊' },
    { value: 'movement', label: 'Xuất Nhập Kho', icon: '🔄' },
    { value: 'valuation', label: 'Định Giá Tồn Kho', icon: '💰' },
    { value: 'turnover', label: 'Luân Chuyển Hàng', icon: '🔁' },
    { value: 'aging', label: 'Phân Tích Tuổi Hàng', icon: '📅' }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      case 'stable': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const exportReport = (format: string) => {
    console.log(`Exporting report in ${format} format`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-gray-100">Báo Cáo Kho Hàng</h2>
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
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-gray-100 transition-all duration-300"
            >
              {periods.map(period => (
                <option key={period.value} value={period.value}>{period.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Loại Báo Cáo</label>
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-gray-100 transition-all duration-300"
            >
              {reportTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.icon} {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in-up animation-delay-400">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl">💰</div>
            <div className="text-green-400 text-sm">+7.3%</div>
          </div>
          <div className="text-2xl font-bold text-green-400 mb-2">
            ₫{reportData[0].totalValue.toLocaleString()}
          </div>
          <div className="text-gray-400 text-sm">Tổng Giá Trị Tồn Kho</div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl">📦</div>
            <div className="text-blue-400 text-sm">+4.9%</div>
          </div>
          <div className="text-2xl font-bold text-blue-400 mb-2">
            {reportData[0].totalProducts.toLocaleString()}
          </div>
          <div className="text-gray-400 text-sm">Tổng Số Sản Phẩm</div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl">📈</div>
            <div className="text-purple-400 text-sm">+11.8%</div>
          </div>
          <div className="text-2xl font-bold text-purple-400 mb-2">
            ₫{reportData[0].inbound.toLocaleString()}
          </div>
          <div className="text-gray-400 text-sm">Tổng Nhập Kho</div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl">📉</div>
            <div className="text-orange-400 text-sm">+5.8%</div>
          </div>
          <div className="text-2xl font-bold text-orange-400 mb-2">
            ₫{reportData[0].outbound.toLocaleString()}
          </div>
          <div className="text-gray-400 text-sm">Tổng Xuất Kho</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trend Chart */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 animate-fade-in-up animation-delay-600">
          <h3 className="text-xl font-semibold text-gray-100 mb-6 flex items-center">
            <span className="mr-2">📈</span>
            Xu Hướng Giá Trị Tồn Kho
          </h3>
          
          <div className="space-y-4">
            {reportData.map((data, index) => (
              <div key={data.period} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                <div>
                  <div className="font-medium text-gray-100">{data.period}</div>
                  <div className="text-sm text-gray-400">{data.totalProducts} sản phẩm</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-100">
                    ₫{data.totalValue.toLocaleString()}
                  </div>
                  <div className={`text-sm ${index === 0 ? 'text-green-400' : 'text-gray-400'}`}>
                    {index === 0 ? '+7.3%' : index === 1 ? '+2.5%' : index === 2 ? '+3.1%' : '+1.8%'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 animate-fade-in-up animation-delay-700">
          <h3 className="text-xl font-semibold text-gray-100 mb-6 flex items-center">
            <span className="mr-2">🎯</span>
            Phân Bổ Theo Danh Mục
          </h3>
          
          <div className="space-y-4">
            {categoryReports.map((category, index) => (
              <div key={category.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-100">{category.category}</span>
                    <span className={`text-sm ${getTrendColor(category.trend)}`}>
                      {getTrendIcon(category.trend)}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-100">
                      ₫{category.value.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">{category.products} SP</div>
                  </div>
                </div>
                
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      index === 0 ? 'bg-blue-500' :
                      index === 1 ? 'bg-green-500' :
                      index === 2 ? 'bg-yellow-500' :
                      index === 3 ? 'bg-purple-500' : 'bg-gray-500'
                    }`}
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{category.percentage}%</span>
                  <span>của tổng giá trị</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Reports Table */}
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
                <th className="px-6 py-3 text-left text-gray-200 font-medium">Kỳ</th>
                <th className="px-6 py-3 text-left text-gray-200 font-medium">Tổng Giá Trị</th>
                <th className="px-6 py-3 text-left text-gray-200 font-medium">Số Sản Phẩm</th>
                <th className="px-6 py-3 text-left text-gray-200 font-medium">Nhập Kho</th>
                <th className="px-6 py-3 text-left text-gray-200 font-medium">Xuất Kho</th>
                <th className="px-6 py-3 text-left text-gray-200 font-medium">Điều Chỉnh</th>
                <th className="px-6 py-3 text-left text-gray-200 font-medium">Tăng Trưởng</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {reportData.map((data, index) => (
                <tr key={data.period} className="hover:bg-gray-700/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-100">{data.period}</td>
                  <td className="px-6 py-4 text-gray-300">₫{data.totalValue.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-300">{data.totalProducts.toLocaleString()}</td>
                  <td className="px-6 py-4 text-green-400">+₫{data.inbound.toLocaleString()}</td>
                  <td className="px-6 py-4 text-red-400">-₫{data.outbound.toLocaleString()}</td>
                  <td className="px-6 py-4 text-yellow-400">₫{data.adjustments.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      index === 0 ? 'text-green-400 bg-green-900/30' :
                      index === 1 ? 'text-blue-400 bg-blue-900/30' :
                      'text-gray-400 bg-gray-900/30'
                    }`}>
                      {index === 0 ? '+7.3%' : index === 1 ? '+2.5%' : index === 2 ? '+3.1%' : '+1.8%'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in-up animation-delay-900">
        <button className="bg-blue-600/20 border border-blue-600/50 hover:bg-blue-600/30 text-blue-400 p-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-center">
          <div className="text-3xl mb-2">📊</div>
          <div className="font-medium">Tạo Báo Cáo Tùy Chỉnh</div>
        </button>
        
        <button className="bg-green-600/20 border border-green-600/50 hover:bg-green-600/30 text-green-400 p-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-center">
          <div className="text-3xl mb-2">📅</div>
          <div className="font-medium">Lên Lịch Báo Cáo</div>
        </button>
        
        <button className="bg-purple-600/20 border border-purple-600/50 hover:bg-purple-600/30 text-purple-400 p-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-center">
          <div className="text-3xl mb-2">🔍</div>
          <div className="font-medium">Phân Tích Nâng Cao</div>
        </button>
      </div>
    </div>
  );
}
