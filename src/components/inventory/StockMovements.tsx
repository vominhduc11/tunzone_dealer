'use client';

import { useState } from 'react';

interface StockMovement {
  id: string;
  type: 'in' | 'out' | 'transfer' | 'adjustment';
  productSku: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalValue: number;
  fromLocation?: string;
  toLocation: string;
  reference: string;
  reason: string;
  user: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'cancelled';
  notes?: string;
}

const movements: StockMovement[] = [
  {
    id: '1',
    type: 'in',
    productSku: 'SONY-WH1000XM5',
    productName: 'Sony WH-1000XM5 Wireless Headphones',
    quantity: 50,
    unitPrice: 8500000,
    totalValue: 425000000,
    toLocation: 'Kho A - Kệ A1-01',
    reference: 'PO-2024-001',
    reason: 'Nhập hàng từ nhà cung cấp',
    user: 'Nguyễn Văn A',
    timestamp: '2024-01-15 14:30:00',
    status: 'completed',
    notes: 'Hàng mới từ Sony Vietnam'
  },
  {
    id: '2',
    type: 'out',
    productSku: 'JBL-CHARGE5',
    productName: 'JBL Charge 5 Portable Speaker',
    quantity: 25,
    unitPrice: 3500000,
    totalValue: 87500000,
    fromLocation: 'Kho B - Kệ B2-05',
    toLocation: 'Đơn hàng #TZ-2024-001234',
    reference: 'SO-2024-456',
    reason: 'Xuất hàng cho khách hàng',
    user: 'Trần Thị B',
    timestamp: '2024-01-15 10:15:00',
    status: 'completed'
  },
  {
    id: '3',
    type: 'transfer',
    productSku: 'AT-AT2020',
    productName: 'Audio-Technica AT2020 Microphone',
    quantity: 15,
    unitPrice: 2800000,
    totalValue: 42000000,
    fromLocation: 'Kho A - Kệ A2-03',
    toLocation: 'Kho C - Kệ C1-03',
    reference: 'TR-2024-789',
    reason: 'Chuyển kho để cân bằng tồn kho',
    user: 'Lê Văn C',
    timestamp: '2024-01-14 16:45:00',
    status: 'pending'
  },
  {
    id: '4',
    type: 'adjustment',
    productSku: 'BOSE-QC45',
    productName: 'Bose QuietComfort 45 Headphones',
    quantity: -2,
    unitPrice: 7200000,
    totalValue: -14400000,
    toLocation: 'Kho A - Kệ A1-02',
    reference: 'ADJ-2024-012',
    reason: 'Điều chỉnh sau kiểm kê - hàng hỏng',
    user: 'Phạm Thị D',
    timestamp: '2024-01-14 09:20:00',
    status: 'completed',
    notes: 'Phát hiện 2 sản phẩm bị hỏng trong quá trình kiểm kê'
  },
  {
    id: '5',
    type: 'in',
    productSku: 'YAMAHA-HS8',
    productName: 'Yamaha HS8 Powered Studio Monitor',
    quantity: 20,
    unitPrice: 12500000,
    totalValue: 250000000,
    toLocation: 'Kho A - Kệ A3-01',
    reference: 'PO-2024-002',
    reason: 'Nhập hàng bổ sung',
    user: 'Hoàng Văn E',
    timestamp: '2024-01-13 11:30:00',
    status: 'completed'
  }
];

export default function StockMovements() {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateRange, setDateRange] = useState('7days');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewMovementModal, setShowNewMovementModal] = useState(false);
  const [newMovement, setNewMovement] = useState({
    type: 'in',
    productSku: '',
    quantity: 0,
    unitPrice: 0,
    location: '',
    reference: '',
    reason: '',
    notes: ''
  });

  const dateRanges = [
    { value: '24h', label: '24 Giờ' },
    { value: '7days', label: '7 Ngày' },
    { value: '30days', label: '30 Ngày' },
    { value: '90days', label: '90 Ngày' }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'in': return '📥';
      case 'out': return '📤';
      case 'transfer': return '🔄';
      case 'adjustment': return '⚖️';
      default: return '📋';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'in': return 'Nhập Kho';
      case 'out': return 'Xuất Kho';
      case 'transfer': return 'Chuyển Kho';
      case 'adjustment': return 'Điều Chỉnh';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'in': return 'text-green-400 bg-green-900/30 border-green-700';
      case 'out': return 'text-red-400 bg-red-900/30 border-red-700';
      case 'transfer': return 'text-blue-400 bg-blue-900/30 border-blue-700';
      case 'adjustment': return 'text-yellow-400 bg-yellow-900/30 border-yellow-700';
      default: return 'text-gray-400 bg-gray-900/30 border-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-900/30 border-green-700';
      case 'pending': return 'text-yellow-400 bg-yellow-900/30 border-yellow-700';
      case 'cancelled': return 'text-red-400 bg-red-900/30 border-red-700';
      default: return 'text-gray-400 bg-gray-900/30 border-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Hoàn Thành';
      case 'pending': return 'Đang Xử Lý';
      case 'cancelled': return 'Đã Hủy';
      default: return status;
    }
  };

  const filteredMovements = movements.filter(movement => {
    const matchesType = selectedType === 'all' || movement.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || movement.status === selectedStatus;
    const matchesSearch = movement.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movement.productSku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movement.reference.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesStatus && matchesSearch;
  });

  const totalIn = filteredMovements.filter(m => m.type === 'in').reduce((sum, m) => sum + m.totalValue, 0);
  const totalOut = filteredMovements.filter(m => m.type === 'out').reduce((sum, m) => sum + Math.abs(m.totalValue), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-gray-100">Xuất Nhập Kho</h2>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setShowNewMovementModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
          >
            <span>➕</span>
            <span>Tạo Phiếu Mới</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
            <span>📊</span>
            <span>Xuất Báo Cáo</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up animation-delay-200">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl">📈</div>
            <div className="text-green-400 text-sm">+12.5%</div>
          </div>
          <div className="text-2xl font-bold text-green-400 mb-2">
            ₫{totalIn.toLocaleString()}
          </div>
          <div className="text-gray-400 text-sm">Tổng Nhập Kho</div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl">📉</div>
            <div className="text-red-400 text-sm">-8.3%</div>
          </div>
          <div className="text-2xl font-bold text-red-400 mb-2">
            ₫{totalOut.toLocaleString()}
          </div>
          <div className="text-gray-400 text-sm">Tổng Xuất Kho</div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl">💰</div>
            <div className="text-blue-400 text-sm">Net</div>
          </div>
          <div className="text-2xl font-bold text-blue-400 mb-2">
            ₫{(totalIn - totalOut).toLocaleString()}
          </div>
          <div className="text-gray-400 text-sm">Giá Trị Ròng</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 animate-fade-in-up animation-delay-400">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm giao dịch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-gray-100 placeholder-gray-400 transition-all duration-300"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-gray-100 transition-all duration-300"
          >
            <option value="all">Tất Cả Loại</option>
            <option value="in">Nhập Kho</option>
            <option value="out">Xuất Kho</option>
            <option value="transfer">Chuyển Kho</option>
            <option value="adjustment">Điều Chỉnh</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-gray-100 transition-all duration-300"
          >
            <option value="all">Tất Cả Trạng Thái</option>
            <option value="completed">Hoàn Thành</option>
            <option value="pending">Đang Xử Lý</option>
            <option value="cancelled">Đã Hủy</option>
          </select>

          {/* Date Range */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-gray-100 transition-all duration-300"
          >
            {dateRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Movements Table */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden animate-fade-in-up animation-delay-600">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50 border-b border-gray-600">
              <tr>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Loại</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Sản Phẩm</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Số Lượng</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Giá Trị</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Vị Trí</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Tham Chiếu</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Trạng Thái</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Thời Gian</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredMovements.map((movement) => (
                <tr key={movement.id} className="hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-4">
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(movement.type)}`}>
                      <span className="mr-1">{getTypeIcon(movement.type)}</span>
                      {getTypeLabel(movement.type)}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-medium text-gray-100">{movement.productName}</div>
                    <div className="text-sm text-gray-400">{movement.productSku}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className={`font-medium ${
                      movement.quantity > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                    </div>
                    <div className="text-xs text-gray-400">
                      ₫{movement.unitPrice.toLocaleString()}/unit
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className={`font-medium ${
                      movement.totalValue > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {movement.totalValue > 0 ? '+' : ''}₫{movement.totalValue.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-gray-300 text-sm">
                      {movement.fromLocation && (
                        <div className="text-red-400">Từ: {movement.fromLocation}</div>
                      )}
                      <div className="text-green-400">Đến: {movement.toLocation}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-gray-300 font-mono text-sm">{movement.reference}</div>
                    <div className="text-xs text-gray-400">{movement.reason}</div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(movement.status)}`}>
                      {getStatusLabel(movement.status)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-gray-300 text-sm">
                      {new Date(movement.timestamp).toLocaleDateString('vi-VN')}
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(movement.timestamp).toLocaleTimeString('vi-VN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                    <div className="text-xs text-gray-500">{movement.user}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                        title="Xem chi tiết"
                      >
                        👁️
                      </button>
                      {movement.status === 'pending' && (
                        <>
                          <button
                            className="text-green-400 hover:text-green-300 transition-colors"
                            title="Phê duyệt"
                          >
                            ✅
                          </button>
                          <button
                            className="text-red-400 hover:text-red-300 transition-colors"
                            title="Hủy"
                          >
                            ❌
                          </button>
                        </>
                      )}
                      <button
                        className="text-gray-400 hover:text-gray-300 transition-colors"
                        title="In phiếu"
                      >
                        🖨️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredMovements.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-xl">Không có giao dịch nào</p>
            <p className="mt-2">Hãy thử thay đổi bộ lọc hoặc tạo giao dịch mới</p>
          </div>
        )}
      </div>

      {/* New Movement Modal */}
      {showNewMovementModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-100 mb-6">
              Tạo Phiếu Xuất Nhập Kho
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Loại Giao Dịch
                </label>
                <select
                  value={newMovement.type}
                  onChange={(e) => setNewMovement(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 text-gray-100"
                >
                  <option value="in">Nhập Kho</option>
                  <option value="out">Xuất Kho</option>
                  <option value="transfer">Chuyển Kho</option>
                  <option value="adjustment">Điều Chỉnh</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Mã Sản Phẩm
                </label>
                <input
                  type="text"
                  value={newMovement.productSku}
                  onChange={(e) => setNewMovement(prev => ({ ...prev, productSku: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 text-gray-100"
                  placeholder="VD: SONY-WH1000XM5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Số Lượng
                </label>
                <input
                  type="number"
                  value={newMovement.quantity}
                  onChange={(e) => setNewMovement(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 text-gray-100"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Đơn Giá
                </label>
                <input
                  type="number"
                  value={newMovement.unitPrice}
                  onChange={(e) => setNewMovement(prev => ({ ...prev, unitPrice: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 text-gray-100"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Vị Trí Kho
                </label>
                <input
                  type="text"
                  value={newMovement.location}
                  onChange={(e) => setNewMovement(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 text-gray-100"
                  placeholder="VD: Kho A - Kệ A1-01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Số Tham Chiếu
                </label>
                <input
                  type="text"
                  value={newMovement.reference}
                  onChange={(e) => setNewMovement(prev => ({ ...prev, reference: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 text-gray-100"
                  placeholder="VD: PO-2024-001"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Lý Do
              </label>
              <input
                type="text"
                value={newMovement.reason}
                onChange={(e) => setNewMovement(prev => ({ ...prev, reason: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 text-gray-100"
                placeholder="Mô tả lý do thực hiện giao dịch"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Ghi Chú
              </label>
              <textarea
                value={newMovement.notes}
                onChange={(e) => setNewMovement(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 text-gray-100 resize-none"
                placeholder="Ghi chú thêm (tùy chọn)..."
              />
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => {
                  console.log('New movement:', newMovement);
                  setShowNewMovementModal(false);
                }}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Tạo Phiếu
              </button>
              <button
                onClick={() => setShowNewMovementModal(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
