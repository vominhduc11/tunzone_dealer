'use client';

import { useState } from 'react';

interface SalesRecord {
  id: string;
  customerName: string;
  customerPhone: string;
  customerType: 'individual' | 'business';
  items: {
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: 'paid' | 'partial' | 'pending';
  saleDate: string;
  deliveryDate?: string;
  status: 'completed' | 'processing' | 'cancelled';
  commission: number;
  notes?: string;
}

const salesRecords: SalesRecord[] = [
  {
    id: 'TZ-2024-001',
    customerName: 'Nguyễn Văn A',
    customerPhone: '0123456789',
    customerType: 'individual',
    items: [
      { productName: 'Sony WH-1000XM5', quantity: 1, unitPrice: 8500000, totalPrice: 8500000 },
      { productName: 'JBL Charge 5', quantity: 2, unitPrice: 3500000, totalPrice: 7000000 }
    ],
    totalAmount: 15500000,
    paymentMethod: 'Thẻ tín dụng',
    paymentStatus: 'paid',
    saleDate: '2024-01-15',
    deliveryDate: '2024-01-17',
    status: 'completed',
    commission: 775000,
    notes: 'Khách hàng VIP, ưu tiên giao hàng'
  },
  {
    id: 'TZ-2024-002',
    customerName: 'Trần Thị B',
    customerPhone: '0987654321',
    customerType: 'business',
    items: [
      { productName: 'Audio-Technica AT2020', quantity: 5, unitPrice: 2800000, totalPrice: 14000000 }
    ],
    totalAmount: 14000000,
    paymentMethod: 'Chuyển khoản',
    paymentStatus: 'paid',
    saleDate: '2024-01-14',
    status: 'completed',
    commission: 700000
  },
  {
    id: 'TZ-2024-003',
    customerName: 'Lê Văn C',
    customerPhone: '0456789123',
    customerType: 'individual',
    items: [
      { productName: 'Yamaha HS8', quantity: 1, unitPrice: 12500000, totalPrice: 12500000 }
    ],
    totalAmount: 12500000,
    paymentMethod: 'Tiền mặt',
    paymentStatus: 'partial',
    saleDate: '2024-01-13',
    status: 'processing',
    commission: 625000,
    notes: 'Đã thanh toán 50%, còn lại thanh toán khi giao hàng'
  },
  {
    id: 'TZ-2024-004',
    customerName: 'Phạm Thị D',
    customerPhone: '0789123456',
    customerType: 'individual',
    items: [
      { productName: 'Bose QuietComfort 45', quantity: 2, unitPrice: 7200000, totalPrice: 14400000 }
    ],
    totalAmount: 14400000,
    paymentMethod: 'Trả góp',
    paymentStatus: 'pending',
    saleDate: '2024-01-12',
    status: 'processing',
    commission: 720000
  }
];

export default function SalesHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('all');
  const [dateRange, setDateRange] = useState('30days');
  const [selectedRecord, setSelectedRecord] = useState<SalesRecord | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const dateRanges = [
    { value: '7days', label: '7 Ngày Qua' },
    { value: '30days', label: '30 Ngày Qua' },
    { value: '90days', label: '90 Ngày Qua' },
    { value: 'custom', label: 'Tùy Chỉnh' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-900/30 border-green-700';
      case 'processing': return 'text-yellow-400 bg-yellow-900/30 border-yellow-700';
      case 'cancelled': return 'text-red-400 bg-red-900/30 border-red-700';
      default: return 'text-gray-400 bg-gray-900/30 border-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Hoàn Thành';
      case 'processing': return 'Đang Xử Lý';
      case 'cancelled': return 'Đã Hủy';
      default: return status;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-400 bg-green-900/30 border-green-700';
      case 'partial': return 'text-yellow-400 bg-yellow-900/30 border-yellow-700';
      case 'pending': return 'text-red-400 bg-red-900/30 border-red-700';
      default: return 'text-gray-400 bg-gray-900/30 border-gray-700';
    }
  };

  const getPaymentStatusLabel = (status: string) => {
    switch (status) {
      case 'paid': return 'Đã Thanh Toán';
      case 'partial': return 'Thanh Toán Một Phần';
      case 'pending': return 'Chưa Thanh Toán';
      default: return status;
    }
  };

  const filteredRecords = salesRecords.filter(record => {
    const matchesSearch = record.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.customerPhone.includes(searchTerm) ||
                         record.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || record.status === selectedStatus;
    const matchesPaymentStatus = selectedPaymentStatus === 'all' || record.paymentStatus === selectedPaymentStatus;
    
    return matchesSearch && matchesStatus && matchesPaymentStatus;
  });

  const handleViewDetail = (record: SalesRecord) => {
    setSelectedRecord(record);
    setShowDetailModal(true);
  };

  const totalSales = filteredRecords.reduce((sum, record) => sum + record.totalAmount, 0);
  const totalCommission = filteredRecords.reduce((sum, record) => sum + record.commission, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-gray-100">Lịch Sử Bán Hàng</h2>
        <div className="flex space-x-2">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
            <span>📊</span>
            <span>Xuất Excel</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
            <span>📄</span>
            <span>In Báo Cáo</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in-up animation-delay-200">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">{filteredRecords.length}</div>
          <div className="text-gray-400">Tổng Đơn Hàng</div>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-green-400 mb-2">₫{totalSales.toLocaleString()}</div>
          <div className="text-gray-400">Tổng Doanh Thu</div>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-purple-400 mb-2">₫{totalCommission.toLocaleString()}</div>
          <div className="text-gray-400">Tổng Hoa Hồng</div>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-yellow-400 mb-2">
            ₫{filteredRecords.length > 0 ? Math.round(totalSales / filteredRecords.length).toLocaleString() : '0'}
          </div>
          <div className="text-gray-400">Giá Trị TB/Đơn</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 animate-fade-in-up animation-delay-400">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm khách hàng, SĐT, mã đơn..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-gray-100 placeholder-gray-400 transition-all duration-300"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-gray-100 transition-all duration-300"
          >
            <option value="all">Tất Cả Trạng Thái</option>
            <option value="completed">Hoàn Thành</option>
            <option value="processing">Đang Xử Lý</option>
            <option value="cancelled">Đã Hủy</option>
          </select>

          {/* Payment Status Filter */}
          <select
            value={selectedPaymentStatus}
            onChange={(e) => setSelectedPaymentStatus(e.target.value)}
            className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-gray-100 transition-all duration-300"
          >
            <option value="all">Tất Cả Thanh Toán</option>
            <option value="paid">Đã Thanh Toán</option>
            <option value="partial">Thanh Toán Một Phần</option>
            <option value="pending">Chưa Thanh Toán</option>
          </select>

          {/* Date Range */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-gray-100 transition-all duration-300"
          >
            {dateRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Sales Records Table */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden animate-fade-in-up animation-delay-600">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50 border-b border-gray-600">
              <tr>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Mã Đơn</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Khách Hàng</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Sản Phẩm</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Tổng Tiền</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Thanh Toán</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Trạng Thái</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Hoa Hồng</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Ngày Bán</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-4">
                    <div className="font-mono text-blue-400">{record.id}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-medium text-gray-100">{record.customerName}</div>
                    <div className="text-sm text-gray-400">{record.customerPhone}</div>
                    <div className="text-xs text-gray-500">
                      {record.customerType === 'business' ? '🏢 Doanh nghiệp' : '👤 Cá nhân'}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-gray-300">
                      {record.items.length} sản phẩm
                    </div>
                    <div className="text-sm text-gray-400">
                      {record.items[0]?.productName}
                      {record.items.length > 1 && ` +${record.items.length - 1} khác`}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-semibold text-green-400">
                      ₫{record.totalAmount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-gray-300 text-sm mb-1">{record.paymentMethod}</div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPaymentStatusColor(record.paymentStatus)}`}>
                      {getPaymentStatusLabel(record.paymentStatus)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(record.status)}`}>
                      {getStatusLabel(record.status)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-semibold text-purple-400">
                      ₫{record.commission.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-gray-300 text-sm">
                      {new Date(record.saleDate).toLocaleDateString('vi-VN')}
                    </div>
                    {record.deliveryDate && (
                      <div className="text-xs text-gray-400">
                        Giao: {new Date(record.deliveryDate).toLocaleDateString('vi-VN')}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetail(record)}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                        title="Xem chi tiết"
                      >
                        👁️
                      </button>
                      <button
                        className="text-green-400 hover:text-green-300 transition-colors"
                        title="In hóa đơn"
                      >
                        🖨️
                      </button>
                      <button
                        className="text-yellow-400 hover:text-yellow-300 transition-colors"
                        title="Chỉnh sửa"
                      >
                        ✏️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRecords.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-xl">Không tìm thấy đơn hàng nào</p>
            <p className="mt-2">Hãy thử thay đổi bộ lọc hoặc tạo đơn hàng mới</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedRecord && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-100">
                  Chi Tiết Đơn Hàng - {selectedRecord.id}
                </h3>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                >
                  ❌
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-200 mb-3">Thông Tin Khách Hàng</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tên:</span>
                      <span className="text-gray-300">{selectedRecord.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Điện thoại:</span>
                      <span className="text-gray-300">{selectedRecord.customerPhone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Loại:</span>
                      <span className="text-gray-300">
                        {selectedRecord.customerType === 'business' ? 'Doanh nghiệp' : 'Cá nhân'}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-200 mb-3">Thông Tin Đơn Hàng</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Ngày bán:</span>
                      <span className="text-gray-300">{new Date(selectedRecord.saleDate).toLocaleDateString('vi-VN')}</span>
                    </div>
                    {selectedRecord.deliveryDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Ngày giao:</span>
                        <span className="text-gray-300">{new Date(selectedRecord.deliveryDate).toLocaleDateString('vi-VN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-400">Thanh toán:</span>
                      <span className="text-gray-300">{selectedRecord.paymentMethod}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div>
                <h4 className="text-lg font-semibold text-gray-200 mb-4">Danh Sách Sản Phẩm</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-700/50 border-b border-gray-600">
                      <tr>
                        <th className="px-4 py-2 text-left text-gray-200 text-sm">Sản Phẩm</th>
                        <th className="px-4 py-2 text-left text-gray-200 text-sm">Số Lượng</th>
                        <th className="px-4 py-2 text-left text-gray-200 text-sm">Đơn Giá</th>
                        <th className="px-4 py-2 text-left text-gray-200 text-sm">Thành Tiền</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {selectedRecord.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 text-gray-300">{item.productName}</td>
                          <td className="px-4 py-2 text-gray-300">{item.quantity}</td>
                          <td className="px-4 py-2 text-gray-300">₫{item.unitPrice.toLocaleString()}</td>
                          <td className="px-4 py-2 text-green-400 font-semibold">₫{item.totalPrice.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gray-700/30 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-400">₫{selectedRecord.totalAmount.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">Tổng Tiền</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-400">₫{selectedRecord.commission.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">Hoa Hồng</div>
                  </div>
                  <div>
                    <div className={`text-2xl font-bold ${getStatusColor(selectedRecord.status).split(' ')[0]}`}>
                      {getStatusLabel(selectedRecord.status)}
                    </div>
                    <div className="text-sm text-gray-400">Trạng Thái</div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedRecord.notes && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-200 mb-2">Ghi Chú</h4>
                  <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-3">
                    <div className="text-gray-300">{selectedRecord.notes}</div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-700 flex justify-end space-x-3">
              <button
                onClick={() => setShowDetailModal(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Đóng
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                In Hóa Đơn
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                Chỉnh Sửa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
