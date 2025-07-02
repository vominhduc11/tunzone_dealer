'use client';

import { useState } from 'react';

interface ReportMetric {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: string;
  color: string;
}

interface IssueReport {
  issueType: string;
  count: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
  avgResolutionTime: number;
}

interface ProductReport {
  productName: string;
  totalClaims: number;
  successRate: number;
  avgResolutionTime: number;
  customerSatisfaction: number;
  trend: 'up' | 'down' | 'stable';
}

interface MonthlyData {
  month: string;
  totalClaims: number;
  completed: number;
  avgResolutionTime: number;
  customerSatisfaction: number;
}

const metrics: ReportMetric[] = [
  {
    title: 'Tổng Yêu Cầu Bảo Hành',
    value: '1,247',
    change: '+8.3%',
    trend: 'up',
    icon: '📊',
    color: 'text-blue-400'
  },
  {
    title: 'Tỷ Lệ Hoàn Thành',
    value: '94.2%',
    change: '+2.1%',
    trend: 'up',
    icon: '✅',
    color: 'text-green-400'
  },
  {
    title: 'Thời Gian Xử Lý TB',
    value: '3.2 ngày',
    change: '-0.8 ngày',
    trend: 'down',
    icon: '⚡',
    color: 'text-purple-400'
  },
  {
    title: 'Tỷ Lệ Hài Lòng',
    value: '98.5%',
    change: '+1.2%',
    trend: 'up',
    icon: '😊',
    color: 'text-yellow-400'
  },
  {
    title: 'Chi Phí Bảo Hành',
    value: '₫125M',
    change: '-5.4%',
    trend: 'down',
    icon: '💰',
    color: 'text-orange-400'
  },
  {
    title: 'Tỷ Lệ Lặp Lại',
    value: '2.1%',
    change: '-0.3%',
    trend: 'down',
    icon: '🔄',
    color: 'text-pink-400'
  }
];

const issueReports: IssueReport[] = [
  {
    issueType: 'Lỗi kết nối Bluetooth',
    count: 156,
    percentage: 32.5,
    trend: 'up',
    avgResolutionTime: 2.8
  },
  {
    issueType: 'Sự cố sạc pin',
    count: 98,
    percentage: 20.4,
    trend: 'stable',
    avgResolutionTime: 3.2
  },
  {
    issueType: 'Lỗi âm thanh',
    count: 87,
    percentage: 18.1,
    trend: 'down',
    avgResolutionTime: 4.1
  },
  {
    issueType: 'Hư hỏng vật lý',
    count: 65,
    percentage: 13.5,
    trend: 'down',
    avgResolutionTime: 5.6
  },
  {
    issueType: 'Lỗi phần mềm',
    count: 45,
    percentage: 9.4,
    trend: 'up',
    avgResolutionTime: 1.9
  },
  {
    issueType: 'Khác',
    count: 29,
    percentage: 6.1,
    trend: 'stable',
    avgResolutionTime: 3.8
  }
];

const productReports: ProductReport[] = [
  {
    productName: 'Sony WH-1000XM5',
    totalClaims: 89,
    successRate: 96.6,
    avgResolutionTime: 2.8,
    customerSatisfaction: 4.7,
    trend: 'up'
  },
  {
    productName: 'JBL Charge 5',
    totalClaims: 67,
    successRate: 94.0,
    avgResolutionTime: 3.1,
    customerSatisfaction: 4.5,
    trend: 'stable'
  },
  {
    productName: 'Bose QuietComfort 45',
    totalClaims: 54,
    successRate: 98.1,
    avgResolutionTime: 2.5,
    customerSatisfaction: 4.8,
    trend: 'down'
  },
  {
    productName: 'Audio-Technica AT2020',
    totalClaims: 43,
    successRate: 90.7,
    avgResolutionTime: 4.2,
    customerSatisfaction: 4.3,
    trend: 'up'
  },
  {
    productName: 'Yamaha HS8',
    totalClaims: 32,
    successRate: 93.8,
    avgResolutionTime: 3.8,
    customerSatisfaction: 4.6,
    trend: 'stable'
  }
];

const monthlyData: MonthlyData[] = [
  { month: 'T7/2023', totalClaims: 98, completed: 92, avgResolutionTime: 3.8, customerSatisfaction: 4.2 },
  { month: 'T8/2023', totalClaims: 112, completed: 105, avgResolutionTime: 3.6, customerSatisfaction: 4.3 },
  { month: 'T9/2023', totalClaims: 134, completed: 128, avgResolutionTime: 3.4, customerSatisfaction: 4.4 },
  { month: 'T10/2023', totalClaims: 145, completed: 138, avgResolutionTime: 3.2, customerSatisfaction: 4.5 },
  { month: 'T11/2023', totalClaims: 156, completed: 149, avgResolutionTime: 3.1, customerSatisfaction: 4.6 },
  { month: 'T12/2023', totalClaims: 167, completed: 158, avgResolutionTime: 3.0, customerSatisfaction: 4.7 },
  { month: 'T1/2024', totalClaims: 178, completed: 169, avgResolutionTime: 2.9, customerSatisfaction: 4.8 }
];

export default function WarrantyReports() {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedReport, setSelectedReport] = useState('overview');

  const periods = [
    { value: '1month', label: '1 Tháng' },
    { value: '3months', label: '3 Tháng' },
    { value: '6months', label: '6 Tháng' },
    { value: '1year', label: '1 Năm' },
    { value: 'custom', label: 'Tùy Chỉnh' }
  ];

  const reportTypes = [
    { value: 'overview', label: 'Tổng Quan', icon: '📊' },
    { value: 'performance', label: 'Hiệu Suất', icon: '⚡' },
    { value: 'satisfaction', label: 'Hài Lòng KH', icon: '😊' },
    { value: 'cost', label: 'Chi Phí', icon: '💰' },
    { value: 'trends', label: 'Xu Hướng', icon: '📈' }
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
    console.log(`Exporting warranty report in ${format} format`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-gray-100">Báo Cáo Bảo Hành</h2>
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
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 text-gray-100 transition-all duration-300"
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
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 text-gray-100 transition-all duration-300"
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
                <span>{getTrendIcon(metric.trend)}</span>
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
        {/* Issue Analysis */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 animate-fade-in-up animation-delay-600">
          <h3 className="text-xl font-semibold text-gray-100 mb-6 flex items-center">
            <span className="mr-2">🔍</span>
            Phân Tích Vấn Đề
          </h3>
          
          <div className="space-y-4">
            {issueReports.map((issue, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-100">{issue.issueType}</span>
                    <span className={`text-sm ${getTrendColor(issue.trend)}`}>
                      {getTrendIcon(issue.trend)}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-100">{issue.count}</div>
                    <div className="text-sm text-gray-400">{issue.avgResolutionTime} ngày</div>
                  </div>
                </div>
                
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      index === 0 ? 'bg-red-500' :
                      index === 1 ? 'bg-orange-500' :
                      index === 2 ? 'bg-yellow-500' :
                      index === 3 ? 'bg-green-500' :
                      index === 4 ? 'bg-blue-500' : 'bg-purple-500'
                    }`}
                    style={{ width: `${issue.percentage}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{issue.percentage}%</span>
                  <span>TB: {issue.avgResolutionTime} ngày</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Performance */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 animate-fade-in-up animation-delay-700">
          <h3 className="text-xl font-semibold text-gray-100 mb-6 flex items-center">
            <span className="mr-2">🎯</span>
            Hiệu Suất Theo Sản Phẩm
          </h3>
          
          <div className="space-y-4">
            {productReports.map((product, index) => (
              <div key={index} className="p-4 bg-gray-700/30 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-medium text-gray-100">{product.productName}</div>
                  <div className="flex items-center space-x-1">
                    <span className={`text-sm ${getTrendColor(product.trend)}`}>
                      {getTrendIcon(product.trend)}
                    </span>
                    <span className="text-sm text-gray-400">{product.totalClaims} yêu cầu</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-green-400 font-semibold">{product.successRate}%</div>
                    <div className="text-gray-400">Thành công</div>
                  </div>
                  <div className="text-center">
                    <div className="text-blue-400 font-semibold">{product.avgResolutionTime}</div>
                    <div className="text-gray-400">Ngày TB</div>
                  </div>
                  <div className="text-center">
                    <div className="text-yellow-400 font-semibold">{product.customerSatisfaction}/5</div>
                    <div className="text-gray-400">Hài lòng</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 animate-fade-in-up animation-delay-800">
        <h3 className="text-xl font-semibold text-gray-100 mb-6 flex items-center">
          <span className="mr-2">📈</span>
          Xu Hướng Theo Tháng
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50 border-b border-gray-600">
              <tr>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Tháng</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Tổng YC</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Hoàn Thành</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Tỷ Lệ</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Thời Gian TB</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Hài Lòng</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {monthlyData.map((data, index) => (
                <tr key={index} className="hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-100">{data.month}</td>
                  <td className="px-4 py-3 text-gray-300">{data.totalClaims}</td>
                  <td className="px-4 py-3 text-green-400">{data.completed}</td>
                  <td className="px-4 py-3">
                    <span className="text-gray-300">
                      {((data.completed / data.totalClaims) * 100).toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-blue-400">{data.avgResolutionTime} ngày</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-400">{data.customerSatisfaction}/5</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`text-sm ${
                              star <= data.customerSatisfaction ? 'text-yellow-400' : 'text-gray-600'
                            }`}
                          >
                            ⭐
                          </span>
                        ))}
                      </div>
                    </div>
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
          <span className="mr-2">🏆</span>
          Tóm Tắt Hiệu Suất
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="absolute inset-0 bg-green-600 rounded-full opacity-20"></div>
              <div className="absolute inset-2 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">94%</span>
              </div>
            </div>
            <div className="text-gray-100 font-medium">Tỷ Lệ Giải Quyết</div>
            <div className="text-sm text-gray-400">Trong thời hạn cam kết</div>
          </div>
          
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="absolute inset-0 bg-blue-600 rounded-full opacity-20"></div>
              <div className="absolute inset-2 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">3.2</span>
              </div>
            </div>
            <div className="text-gray-100 font-medium">Thời Gian Trung Bình</div>
            <div className="text-sm text-gray-400">Ngày xử lý mỗi yêu cầu</div>
          </div>
          
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="absolute inset-0 bg-yellow-600 rounded-full opacity-20"></div>
              <div className="absolute inset-2 bg-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">4.8</span>
              </div>
            </div>
            <div className="text-gray-100 font-medium">Điểm Hài Lòng</div>
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
          <div className="text-3xl mb-2">📈</div>
          <div className="font-medium">Phân Tích Nâng Cao</div>
        </button>
        
        <button className="bg-orange-600/20 border border-orange-600/50 hover:bg-orange-600/30 text-orange-400 p-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-center">
          <div className="text-3xl mb-2">🔔</div>
          <div className="font-medium">Cảnh Báo Tự Động</div>
        </button>
      </div>
    </div>
  );
}
