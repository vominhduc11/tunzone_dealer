'use client';

import { useState } from 'react';

interface Alert {
  id: string;
  type: 'low_stock' | 'out_of_stock' | 'overstock' | 'expiring';
  productSku: string;
  productName: string;
  currentStock: number;
  minStock: number;
  maxStock?: number;
  location: string;
  priority: 'high' | 'medium' | 'low';
  daysLeft?: number;
  suggestedAction: string;
  createdAt: string;
  status: 'active' | 'acknowledged' | 'resolved';
}

const alerts: Alert[] = [
  {
    id: '1',
    type: 'out_of_stock',
    productSku: 'JBL-CHARGE5',
    productName: 'JBL Charge 5 Portable Speaker',
    currentStock: 0,
    minStock: 20,
    location: 'Kho B - Kệ B2-05',
    priority: 'high',
    suggestedAction: 'Đặt hàng ngay 50 units từ nhà cung cấp',
    createdAt: '2024-01-15 08:00:00',
    status: 'active'
  },
  {
    id: '2',
    type: 'low_stock',
    productSku: 'BOSE-QC45',
    productName: 'Bose QuietComfort 45 Headphones',
    currentStock: 8,
    minStock: 15,
    location: 'Kho A - Kệ A1-02',
    priority: 'high',
    suggestedAction: 'Nhập thêm 25 units trong 3 ngày tới',
    createdAt: '2024-01-15 10:30:00',
    status: 'active'
  },
  {
    id: '3',
    type: 'low_stock',
    productSku: 'SONY-WF1000XM4',
    productName: 'Sony WF-1000XM4 True Wireless Earbuds',
    currentStock: 12,
    minStock: 25,
    location: 'Kho A - Kệ A1-03',
    priority: 'medium',
    suggestedAction: 'Lên kế hoạch nhập hàng trong tuần tới',
    createdAt: '2024-01-14 16:45:00',
    status: 'acknowledged'
  },
  {
    id: '4',
    type: 'overstock',
    productSku: 'AT-AT2020',
    productName: 'Audio-Technica AT2020 Microphone',
    currentStock: 85,
    minStock: 10,
    maxStock: 50,
    location: 'Kho C - Kệ C1-03',
    priority: 'low',
    suggestedAction: 'Xem xét chương trình khuyến mãi để giảm tồn kho',
    createdAt: '2024-01-13 14:20:00',
    status: 'active'
  },
  {
    id: '5',
    type: 'expiring',
    productSku: 'PROMO-BUNDLE-01',
    productName: 'Bundle Khuyến Mãi Tết 2024',
    currentStock: 15,
    minStock: 5,
    location: 'Kho A - Kệ A4-01',
    priority: 'medium',
    daysLeft: 7,
    suggestedAction: 'Tăng cường marketing để bán hết trong 7 ngày',
    createdAt: '2024-01-12 09:15:00',
    status: 'active'
  }
];

export default function LowStockAlerts() {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'low_stock': return '⚠️';
      case 'out_of_stock': return '🚫';
      case 'overstock': return '📈';
      case 'expiring': return '⏰';
      default: return '🔔';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'low_stock': return 'Sắp Hết Hàng';
      case 'out_of_stock': return 'Hết Hàng';
      case 'overstock': return 'Thừa Hàng';
      case 'expiring': return 'Sắp Hết Hạn';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'low_stock': return 'text-yellow-400 bg-yellow-900/30 border-yellow-700';
      case 'out_of_stock': return 'text-red-400 bg-red-900/30 border-red-700';
      case 'overstock': return 'text-blue-400 bg-blue-900/30 border-blue-700';
      case 'expiring': return 'text-orange-400 bg-orange-900/30 border-orange-700';
      default: return 'text-gray-400 bg-gray-900/30 border-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-900/30 border-red-700';
      case 'medium': return 'text-yellow-400 bg-yellow-900/30 border-yellow-700';
      case 'low': return 'text-green-400 bg-green-900/30 border-green-700';
      default: return 'text-gray-400 bg-gray-900/30 border-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-red-400 bg-red-900/30 border-red-700';
      case 'acknowledged': return 'text-yellow-400 bg-yellow-900/30 border-yellow-700';
      case 'resolved': return 'text-green-400 bg-green-900/30 border-green-700';
      default: return 'text-gray-400 bg-gray-900/30 border-gray-700';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesType = selectedType === 'all' || alert.type === selectedType;
    const matchesPriority = selectedPriority === 'all' || alert.priority === selectedPriority;
    const matchesStatus = selectedStatus === 'all' || alert.status === selectedStatus;
    
    return matchesType && matchesPriority && matchesStatus;
  });

  const handleAcknowledge = (alertId: string) => {
    console.log('Acknowledged alert:', alertId);
  };

  const handleResolve = (alertId: string) => {
    console.log('Resolved alert:', alertId);
  };

  const alertCounts = {
    total: alerts.length,
    active: alerts.filter(a => a.status === 'active').length,
    high: alerts.filter(a => a.priority === 'high').length,
    outOfStock: alerts.filter(a => a.type === 'out_of_stock').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-gray-100">Cảnh Báo Tồn Kho</h2>
        <div className="flex space-x-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
            <span>⚙️</span>
            <span>Cài Đặt Cảnh Báo</span>
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
            <span>✅</span>
            <span>Xử Lý Hàng Loạt</span>
          </button>
        </div>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in-up animation-delay-200">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">{alertCounts.total}</div>
          <div className="text-gray-400">Tổng Cảnh Báo</div>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-red-400 mb-2">{alertCounts.active}</div>
          <div className="text-gray-400">Đang Hoạt Động</div>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-orange-400 mb-2">{alertCounts.high}</div>
          <div className="text-gray-400">Ưu Tiên Cao</div>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-purple-400 mb-2">{alertCounts.outOfStock}</div>
          <div className="text-gray-400">Hết Hàng</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 animate-fade-in-up animation-delay-400">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Loại Cảnh Báo</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-gray-100 transition-all duration-300"
            >
              <option value="all">Tất Cả</option>
              <option value="low_stock">Sắp Hết Hàng</option>
              <option value="out_of_stock">Hết Hàng</option>
              <option value="overstock">Thừa Hàng</option>
              <option value="expiring">Sắp Hết Hạn</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Mức Độ Ưu Tiên</label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-gray-100 transition-all duration-300"
            >
              <option value="all">Tất Cả</option>
              <option value="high">Cao</option>
              <option value="medium">Trung Bình</option>
              <option value="low">Thấp</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Trạng Thái</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-gray-100 transition-all duration-300"
            >
              <option value="all">Tất Cả</option>
              <option value="active">Đang Hoạt Động</option>
              <option value="acknowledged">Đã Xác Nhận</option>
              <option value="resolved">Đã Giải Quyết</option>
            </select>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4 animate-fade-in-up animation-delay-600">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <div className="text-6xl mb-4">🎉</div>
            <p className="text-xl">Không có cảnh báo nào</p>
            <p className="mt-2">Tất cả sản phẩm đều trong tình trạng tốt!</p>
          </div>
        ) : (
          filteredAlerts.map((alert, index) => (
            <div
              key={alert.id}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-gray-600 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl">{getTypeIcon(alert.type)}</span>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(alert.type)}`}>
                        {getTypeLabel(alert.type)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(alert.priority)}`}>
                        {alert.priority === 'high' ? 'Cao' : alert.priority === 'medium' ? 'Trung Bình' : 'Thấp'}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(alert.status)}`}>
                        {alert.status === 'active' ? 'Hoạt Động' : 
                         alert.status === 'acknowledged' ? 'Đã Xác Nhận' : 'Đã Giải Quyết'}
                      </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-gray-100 mb-1">{alert.productName}</h3>
                    <div className="text-sm text-gray-400 mb-2">
                      SKU: {alert.productSku} • Vị trí: {alert.location}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-400">Tồn Kho Hiện Tại</div>
                      <div className={`text-lg font-bold ${
                        alert.currentStock === 0 ? 'text-red-400' :
                        alert.currentStock <= alert.minStock ? 'text-yellow-400' : 'text-green-400'
                      }`}>
                        {alert.currentStock} units
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-400">Tồn Kho Tối Thiểu</div>
                      <div className="text-lg font-bold text-gray-300">{alert.minStock} units</div>
                    </div>
                    
                    {alert.daysLeft && (
                      <div>
                        <div className="text-sm text-gray-400">Thời Gian Còn Lại</div>
                        <div className="text-lg font-bold text-orange-400">{alert.daysLeft} ngày</div>
                      </div>
                    )}
                  </div>

                  <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-3 mb-4">
                    <div className="text-sm text-gray-300">
                      <strong className="text-blue-400">Đề xuất:</strong> {alert.suggestedAction}
                    </div>
                  </div>

                  <div className="text-xs text-gray-500">
                    Tạo lúc: {new Date(alert.createdAt).toLocaleString('vi-VN')}
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  {alert.status === 'active' && (
                    <button
                      onClick={() => handleAcknowledge(alert.id)}
                      className="bg-yellow-600/20 border border-yellow-600/50 hover:bg-yellow-600/30 text-yellow-400 px-3 py-1 rounded text-sm transition-all duration-300"
                    >
                      ✓ Xác Nhận
                    </button>
                  )}
                  
                  {alert.status !== 'resolved' && (
                    <button
                      onClick={() => handleResolve(alert.id)}
                      className="bg-green-600/20 border border-green-600/50 hover:bg-green-600/30 text-green-400 px-3 py-1 rounded text-sm transition-all duration-300"
                    >
                      ✅ Giải Quyết
                    </button>
                  )}
                  
                  <button className="bg-blue-600/20 border border-blue-600/50 hover:bg-blue-600/30 text-blue-400 px-3 py-1 rounded text-sm transition-all duration-300">
                    👁️ Chi Tiết
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
