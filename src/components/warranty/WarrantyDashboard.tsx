'use client';

import { useState } from 'react';

interface DashboardMetric {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: string;
  color: string;
}

interface RecentClaim {
  id: string;
  productName: string;
  customerName: string;
  issueType: string;
  status: 'pending' | 'approved' | 'in_progress' | 'completed' | 'rejected';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  estimatedCompletion?: string;
}

interface WarrantyAlert {
  id: string;
  type: 'expiring_soon' | 'high_volume' | 'delayed_claim' | 'quality_issue';
  message: string;
  count: number;
  priority: 'low' | 'medium' | 'high';
  actionRequired: boolean;
}

const metrics: DashboardMetric[] = [
  {
    title: 'Tổng Sản Phẩm Bảo Hành',
    value: '2,847',
    change: '+12.5%',
    trend: 'up',
    icon: '🛡️',
    color: 'text-blue-400'
  },
  {
    title: 'Yêu Cầu Tháng Này',
    value: '156',
    change: '+8.3%',
    trend: 'up',
    icon: '📝',
    color: 'text-green-400'
  },
  {
    title: 'Đang Xử Lý',
    value: '23',
    change: '-15.2%',
    trend: 'down',
    icon: '⏳',
    color: 'text-yellow-400'
  },
  {
    title: 'Tỷ Lệ Hoàn Thành',
    value: '94.2%',
    change: '+2.1%',
    trend: 'up',
    icon: '✅',
    color: 'text-purple-400'
  },
  {
    title: 'Thời Gian Xử Lý TB',
    value: '3.2 ngày',
    change: '-0.8 ngày',
    trend: 'down',
    icon: '⚡',
    color: 'text-orange-400'
  },
  {
    title: 'Tỷ Lệ Hài Lòng',
    value: '98.5%',
    change: '+1.2%',
    trend: 'up',
    icon: '😊',
    color: 'text-pink-400'
  }
];

const recentClaims: RecentClaim[] = [
  {
    id: 'WC-2024-001',
    productName: 'Sony WH-1000XM5',
    customerName: 'Nguyễn Văn A',
    issueType: 'Lỗi kết nối Bluetooth',
    status: 'in_progress',
    priority: 'high',
    createdAt: '2024-01-15 10:30:00',
    estimatedCompletion: '2024-01-17 17:00:00'
  },
  {
    id: 'WC-2024-002',
    productName: 'JBL Charge 5',
    customerName: 'Trần Thị B',
    issueType: 'Không sạc được pin',
    status: 'pending',
    priority: 'medium',
    createdAt: '2024-01-15 14:15:00'
  },
  {
    id: 'WC-2024-003',
    productName: 'Bose QuietComfort 45',
    customerName: 'Lê Văn C',
    issueType: 'Chức năng chống ồn không hoạt động',
    status: 'approved',
    priority: 'high',
    createdAt: '2024-01-14 16:45:00',
    estimatedCompletion: '2024-01-16 12:00:00'
  },
  {
    id: 'WC-2024-004',
    productName: 'Audio-Technica AT2020',
    customerName: 'Phạm Thị D',
    issueType: 'Tiếng ồn khi thu âm',
    status: 'completed',
    priority: 'medium',
    createdAt: '2024-01-13 09:20:00'
  }
];

const alerts: WarrantyAlert[] = [
  {
    id: '1',
    type: 'expiring_soon',
    message: 'sản phẩm sắp hết hạn bảo hành trong 30 ngày tới',
    count: 127,
    priority: 'medium',
    actionRequired: true
  },
  {
    id: '2',
    type: 'high_volume',
    message: 'yêu cầu bảo hành cho Sony WH-1000XM5 tăng cao bất thường',
    count: 15,
    priority: 'high',
    actionRequired: true
  },
  {
    id: '3',
    type: 'delayed_claim',
    message: 'yêu cầu bảo hành đã quá hạn xử lý',
    count: 3,
    priority: 'high',
    actionRequired: true
  },
  {
    id: '4',
    type: 'quality_issue',
    message: 'phản hồi tiêu cực về chất lượng sửa chữa',
    count: 2,
    priority: 'medium',
    actionRequired: false
  }
];

export default function WarrantyDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('30days');

  const periods = [
    { value: '7days', label: '7 Ngày' },
    { value: '30days', label: '30 Ngày' },
    { value: '90days', label: '90 Ngày' },
    { value: '1year', label: '1 Năm' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-900/30 border-yellow-700';
      case 'approved': return 'text-blue-400 bg-blue-900/30 border-blue-700';
      case 'in_progress': return 'text-purple-400 bg-purple-900/30 border-purple-700';
      case 'completed': return 'text-green-400 bg-green-900/30 border-green-700';
      case 'rejected': return 'text-red-400 bg-red-900/30 border-red-700';
      default: return 'text-gray-400 bg-gray-900/30 border-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Chờ Duyệt';
      case 'approved': return 'Đã Duyệt';
      case 'in_progress': return 'Đang Xử Lý';
      case 'completed': return 'Hoàn Thành';
      case 'rejected': return 'Từ Chối';
      default: return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-500';
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'expiring_soon': return 'text-yellow-400 bg-yellow-900/30 border-yellow-700';
      case 'high_volume': return 'text-red-400 bg-red-900/30 border-red-700';
      case 'delayed_claim': return 'text-red-400 bg-red-900/30 border-red-700';
      case 'quality_issue': return 'text-orange-400 bg-orange-900/30 border-orange-700';
      default: return 'text-gray-400 bg-gray-900/30 border-gray-700';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'expiring_soon': return '⏰';
      case 'high_volume': return '📈';
      case 'delayed_claim': return '⚠️';
      case 'quality_issue': return '🔍';
      default: return '🔔';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-gray-100">Dashboard Bảo Hành</h2>
        <div className="flex space-x-2">
          {periods.map(period => (
            <button
              key={period.value}
              onClick={() => setSelectedPeriod(period.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedPeriod === period.value
                  ? 'bg-green-600 text-white shadow-lg'
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

      {/* Alerts */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 animate-fade-in-up animation-delay-400">
        <h3 className="text-xl font-semibold text-gray-100 mb-6 flex items-center">
          <span className="mr-2">🚨</span>
          Cảnh Báo & Thông Báo
        </h3>
        
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-center justify-between p-4 rounded-lg border ${getAlertColor(alert.type)}`}
            >
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{getAlertIcon(alert.type)}</div>
                <div>
                  <div className="font-medium text-gray-100">
                    {alert.count} {alert.message}
                  </div>
                  <div className="text-sm opacity-75">
                    Mức độ: {alert.priority === 'high' ? 'Cao' : alert.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                  </div>
                </div>
              </div>
              
              {alert.actionRequired && (
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Xử Lý Ngay
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Claims */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 animate-fade-in-up animation-delay-600">
          <h3 className="text-xl font-semibold text-gray-100 mb-6 flex items-center">
            <span className="mr-2">📋</span>
            Yêu Cầu Gần Đây
          </h3>
          
          <div className="space-y-4">
            {recentClaims.map((claim) => (
              <div
                key={claim.id}
                className="flex items-start space-x-4 p-4 bg-gray-700/30 rounded-lg hover:bg-gray-600/30 transition-all duration-300"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-gray-100">{claim.productName}</div>
                    <div className="flex items-center space-x-2">
                      <span className={`w-2 h-2 rounded-full ${getPriorityColor(claim.priority)}`}></span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(claim.status)}`}>
                        {getStatusLabel(claim.status)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-400 mb-2">
                    <div>Khách hàng: {claim.customerName}</div>
                    <div>Vấn đề: {claim.issueType}</div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Mã: {claim.id}</span>
                    <span>{new Date(claim.createdAt).toLocaleDateString('vi-VN')}</span>
                  </div>
                  
                  {claim.estimatedCompletion && (
                    <div className="text-xs text-blue-400 mt-1">
                      Dự kiến hoàn thành: {new Date(claim.estimatedCompletion).toLocaleString('vi-VN')}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <button className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors">
              Xem Tất Cả Yêu Cầu →
            </button>
          </div>
        </div>

        {/* Warranty Status Distribution */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 animate-fade-in-up animation-delay-700">
          <h3 className="text-xl font-semibold text-gray-100 mb-6 flex items-center">
            <span className="mr-2">📊</span>
            Phân Bổ Trạng Thái
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-gray-300">Đang Có Hiệu Lực</span>
              </div>
              <div className="text-right">
                <div className="text-gray-100 font-medium">2,456</div>
                <div className="text-xs text-gray-400">86.3%</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="text-gray-300">Sắp Hết Hạn</span>
              </div>
              <div className="text-right">
                <div className="text-gray-100 font-medium">284</div>
                <div className="text-xs text-gray-400">10.0%</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-gray-300">Đã Hết Hạn</span>
              </div>
              <div className="text-right">
                <div className="text-gray-100 font-medium">85</div>
                <div className="text-xs text-gray-400">3.0%</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-gray-300">Đã Gia Hạn</span>
              </div>
              <div className="text-right">
                <div className="text-gray-100 font-medium">22</div>
                <div className="text-xs text-gray-400">0.7%</div>
              </div>
            </div>
          </div>
          
          {/* Visual Chart */}
          <div className="mt-6">
            <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
              <div className="h-full flex">
                <div className="bg-green-500 flex-1" style={{ width: '86.3%' }}></div>
                <div className="bg-yellow-500" style={{ width: '10.0%' }}></div>
                <div className="bg-red-500" style={{ width: '3.0%' }}></div>
                <div className="bg-blue-500" style={{ width: '0.7%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 animate-fade-in-up animation-delay-800">
        <h3 className="text-xl font-semibold text-gray-100 mb-6 flex items-center">
          <span className="mr-2">⚡</span>
          Hiệu Suất Xử Lý
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="absolute inset-0 bg-green-600 rounded-full opacity-20"></div>
              <div className="absolute inset-2 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">94%</span>
              </div>
            </div>
            <div className="text-gray-100 font-medium">Tỷ Lệ Hoàn Thành</div>
            <div className="text-sm text-gray-400">Trong thời hạn cam kết</div>
          </div>
          
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="absolute inset-0 bg-blue-600 rounded-full opacity-20"></div>
              <div className="absolute inset-2 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">3.2</span>
              </div>
            </div>
            <div className="text-gray-100 font-medium">Thời Gian TB</div>
            <div className="text-sm text-gray-400">Ngày xử lý mỗi yêu cầu</div>
          </div>
          
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="absolute inset-0 bg-purple-600 rounded-full opacity-20"></div>
              <div className="absolute inset-2 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">98%</span>
              </div>
            </div>
            <div className="text-gray-100 font-medium">Hài Lòng KH</div>
            <div className="text-sm text-gray-400">Đánh giá tích cực</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up animation-delay-900">
        <button className="bg-green-600/20 border border-green-600/50 hover:bg-green-600/30 text-green-400 p-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-center">
          <div className="text-3xl mb-2">🔍</div>
          <div className="font-medium">Kiểm Tra Bảo Hành</div>
        </button>
        
        <button className="bg-blue-600/20 border border-blue-600/50 hover:bg-blue-600/30 text-blue-400 p-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-center">
          <div className="text-3xl mb-2">📝</div>
          <div className="font-medium">Tạo Yêu Cầu Mới</div>
        </button>
        
        <button className="bg-purple-600/20 border border-purple-600/50 hover:bg-purple-600/30 text-purple-400 p-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-center">
          <div className="text-3xl mb-2">📊</div>
          <div className="font-medium">Xem Báo Cáo</div>
        </button>
        
        <button className="bg-orange-600/20 border border-orange-600/50 hover:bg-orange-600/30 text-orange-400 p-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-center">
          <div className="text-3xl mb-2">⚙️</div>
          <div className="font-medium">Cài Đặt</div>
        </button>
      </div>
    </div>
  );
}
