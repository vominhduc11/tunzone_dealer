'use client';

import { useState } from 'react';

interface WarrantyClaim {
  id: string;
  productName: string;
  model: string;
  serialNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  issueType: string;
  issueDescription: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'approved' | 'in_progress' | 'completed' | 'rejected' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  assignedTechnician?: string;
  estimatedCompletion?: string;
  actualCompletion?: string;
  repairCost: number;
  customerSatisfaction?: number;
  notes: string[];
  attachments: string[];
}

const claims: WarrantyClaim[] = [
  {
    id: 'WC-2024-001',
    productName: 'Sony WH-1000XM5 Wireless Headphones',
    model: 'WH-1000XM5',
    serialNumber: 'SN123456789',
    customerName: 'Nguyễn Văn A',
    customerEmail: 'nguyenvana@email.com',
    customerPhone: '0123456789',
    issueType: 'Lỗi kết nối',
    issueDescription: 'Tai nghe không thể kết nối Bluetooth với điện thoại, đã thử reset nhiều lần nhưng không được.',
    priority: 'high',
    status: 'in_progress',
    createdAt: '2024-01-15 10:30:00',
    updatedAt: '2024-01-15 14:20:00',
    assignedTechnician: 'Trần Văn B',
    estimatedCompletion: '2024-01-17 17:00:00',
    repairCost: 0,
    notes: [
      'Đã xác nhận lỗi kết nối Bluetooth',
      'Cần thay thế module Bluetooth',
      'Linh kiện đã đặt hàng'
    ],
    attachments: ['bluetooth_error.jpg', 'diagnostic_report.pdf']
  },
  {
    id: 'WC-2024-002',
    productName: 'JBL Charge 5 Portable Speaker',
    model: 'Charge 5',
    serialNumber: 'JBL987654321',
    customerName: 'Trần Thị B',
    customerEmail: 'tranthib@email.com',
    customerPhone: '0987654321',
    issueType: 'Lỗi sạc pin',
    issueDescription: 'Loa không sạc được pin, đèn báo không sáng khi cắm sạc.',
    priority: 'medium',
    status: 'pending',
    createdAt: '2024-01-15 14:15:00',
    updatedAt: '2024-01-15 14:15:00',
    repairCost: 0,
    notes: [],
    attachments: ['charging_issue.mp4']
  },
  {
    id: 'WC-2024-003',
    productName: 'Bose QuietComfort 45',
    model: 'QC45',
    serialNumber: 'BOSE456789123',
    customerName: 'Lê Văn C',
    customerEmail: 'levanc@email.com',
    customerPhone: '0456789123',
    issueType: 'Lỗi chống ồn',
    issueDescription: 'Chức năng chống ồn không hoạt động, có tiếng ồn lạ khi bật ANC.',
    priority: 'high',
    status: 'approved',
    createdAt: '2024-01-14 16:45:00',
    updatedAt: '2024-01-15 09:30:00',
    assignedTechnician: 'Phạm Thị D',
    estimatedCompletion: '2024-01-16 12:00:00',
    repairCost: 0,
    notes: [
      'Đã phê duyệt yêu cầu bảo hành',
      'Lên lịch sửa chữa'
    ],
    attachments: ['anc_issue.wav']
  }
];

export default function WarrantyClaims() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClaim, setSelectedClaim] = useState<WarrantyClaim | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-900/30 border-yellow-700';
      case 'approved': return 'text-blue-400 bg-blue-900/30 border-blue-700';
      case 'in_progress': return 'text-purple-400 bg-purple-900/30 border-purple-700';
      case 'completed': return 'text-green-400 bg-green-900/30 border-green-700';
      case 'rejected': return 'text-red-400 bg-red-900/30 border-red-700';
      case 'cancelled': return 'text-gray-400 bg-gray-900/30 border-gray-700';
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
      case 'cancelled': return 'Đã Hủy';
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

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'Khẩn Cấp';
      case 'high': return 'Cao';
      case 'medium': return 'Trung Bình';
      case 'low': return 'Thấp';
      default: return priority;
    }
  };

  const filteredClaims = claims.filter(claim => {
    const matchesStatus = selectedStatus === 'all' || claim.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || claim.priority === selectedPriority;
    const matchesSearch = claim.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const handleViewDetail = (claim: WarrantyClaim) => {
    setSelectedClaim(claim);
    setShowDetailModal(true);
  };

  const handleStatusUpdate = (claimId: string, newStatus: string) => {
    console.log(`Updating claim ${claimId} to status ${newStatus}`);
  };

  const claimCounts = {
    total: claims.length,
    pending: claims.filter(c => c.status === 'pending').length,
    inProgress: claims.filter(c => c.status === 'in_progress').length,
    completed: claims.filter(c => c.status === 'completed').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-gray-100">Quản Lý Yêu Cầu Bảo Hành</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => console.log('Create new claim')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
          >
            <span>➕</span>
            <span>Tạo Yêu Cầu Mới</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
            <span>📊</span>
            <span>Xuất Báo Cáo</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in-up animation-delay-200">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">{claimCounts.total}</div>
          <div className="text-gray-400">Tổng Yêu Cầu</div>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-yellow-400 mb-2">{claimCounts.pending}</div>
          <div className="text-gray-400">Chờ Duyệt</div>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-purple-400 mb-2">{claimCounts.inProgress}</div>
          <div className="text-gray-400">Đang Xử Lý</div>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-green-400 mb-2">{claimCounts.completed}</div>
          <div className="text-gray-400">Hoàn Thành</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 animate-fade-in-up animation-delay-400">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm yêu cầu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 text-gray-100 placeholder-gray-400 transition-all duration-300"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 text-gray-100 transition-all duration-300"
          >
            <option value="all">Tất Cả Trạng Thái</option>
            <option value="pending">Chờ Duyệt</option>
            <option value="approved">Đã Duyệt</option>
            <option value="in_progress">Đang Xử Lý</option>
            <option value="completed">Hoàn Thành</option>
            <option value="rejected">Từ Chối</option>
            <option value="cancelled">Đã Hủy</option>
          </select>

          {/* Priority Filter */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 text-gray-100 transition-all duration-300"
          >
            <option value="all">Tất Cả Mức Độ</option>
            <option value="urgent">Khẩn Cấp</option>
            <option value="high">Cao</option>
            <option value="medium">Trung Bình</option>
            <option value="low">Thấp</option>
          </select>
        </div>
      </div>

      {/* Claims Table */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden animate-fade-in-up animation-delay-600">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50 border-b border-gray-600">
              <tr>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Mã Yêu Cầu</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Sản Phẩm</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Khách Hàng</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Vấn Đề</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Mức Độ</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Trạng Thái</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Ngày Tạo</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredClaims.map((claim) => (
                <tr key={claim.id} className="hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-4">
                    <div className="font-mono text-blue-400">{claim.id}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-medium text-gray-100">{claim.productName}</div>
                    <div className="text-sm text-gray-400">SN: {claim.serialNumber}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-gray-100">{claim.customerName}</div>
                    <div className="text-sm text-gray-400">{claim.customerPhone}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-gray-100">{claim.issueType}</div>
                    <div className="text-sm text-gray-400 max-w-xs truncate">
                      {claim.issueDescription}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-1">
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(claim.priority)}`}></div>
                      <span className={`text-sm ${getPriorityColor(claim.priority)}`}>
                        {getPriorityLabel(claim.priority)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(claim.status)}`}>
                      {getStatusLabel(claim.status)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-gray-300 text-sm">
                      {new Date(claim.createdAt).toLocaleDateString('vi-VN')}
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(claim.createdAt).toLocaleTimeString('vi-VN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetail(claim)}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                        title="Xem chi tiết"
                      >
                        👁️
                      </button>
                      
                      {claim.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(claim.id, 'approved')}
                            className="text-green-400 hover:text-green-300 transition-colors"
                            title="Phê duyệt"
                          >
                            ✅
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(claim.id, 'rejected')}
                            className="text-red-400 hover:text-red-300 transition-colors"
                            title="Từ chối"
                          >
                            ❌
                          </button>
                        </>
                      )}
                      
                      <button
                        className="text-gray-400 hover:text-gray-300 transition-colors"
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

        {filteredClaims.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-xl">Không tìm thấy yêu cầu nào</p>
            <p className="mt-2">Hãy thử thay đổi bộ lọc hoặc tạo yêu cầu mới</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedClaim && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-100">
                  Chi Tiết Yêu Cầu Bảo Hành - {selectedClaim.id}
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
              {/* Product Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-200 mb-3">Thông Tin Sản Phẩm</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tên sản phẩm:</span>
                      <span className="text-gray-300">{selectedClaim.productName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Model:</span>
                      <span className="text-gray-300">{selectedClaim.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Serial Number:</span>
                      <span className="text-gray-300 font-mono">{selectedClaim.serialNumber}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-200 mb-3">Thông Tin Khách Hàng</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tên:</span>
                      <span className="text-gray-300">{selectedClaim.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Email:</span>
                      <span className="text-gray-300">{selectedClaim.customerEmail}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Điện thoại:</span>
                      <span className="text-gray-300">{selectedClaim.customerPhone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Issue Details */}
              <div>
                <h4 className="text-lg font-semibold text-gray-200 mb-3">Chi Tiết Vấn Đề</h4>
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <div className="mb-2">
                    <span className="text-gray-400">Loại vấn đề: </span>
                    <span className="text-gray-100">{selectedClaim.issueType}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Mô tả chi tiết:</span>
                    <p className="text-gray-300 mt-1">{selectedClaim.issueDescription}</p>
                  </div>
                </div>
              </div>

              {/* Status & Progress */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-200 mb-3">Trạng Thái & Tiến Độ</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Trạng thái:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedClaim.status)}`}>
                        {getStatusLabel(selectedClaim.status)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Mức độ ưu tiên:</span>
                      <span className={`text-sm ${getPriorityColor(selectedClaim.priority)}`}>
                        {getPriorityLabel(selectedClaim.priority)}
                      </span>
                    </div>
                    {selectedClaim.assignedTechnician && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Kỹ thuật viên:</span>
                        <span className="text-gray-300">{selectedClaim.assignedTechnician}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-200 mb-3">Thời Gian</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Ngày tạo:</span>
                      <span className="text-gray-300">
                        {new Date(selectedClaim.createdAt).toLocaleString('vi-VN')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Cập nhật cuối:</span>
                      <span className="text-gray-300">
                        {new Date(selectedClaim.updatedAt).toLocaleString('vi-VN')}
                      </span>
                    </div>
                    {selectedClaim.estimatedCompletion && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Dự kiến hoàn thành:</span>
                        <span className="text-blue-400">
                          {new Date(selectedClaim.estimatedCompletion).toLocaleString('vi-VN')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedClaim.notes.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-200 mb-3">Ghi Chú Xử Lý</h4>
                  <div className="space-y-2">
                    {selectedClaim.notes.map((note, index) => (
                      <div key={index} className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-3">
                        <div className="text-gray-300">{note}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Attachments */}
              {selectedClaim.attachments.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-200 mb-3">File Đính Kèm</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {selectedClaim.attachments.map((file, index) => (
                      <div key={index} className="bg-gray-700/30 rounded-lg p-3 text-center">
                        <div className="text-2xl mb-1">📎</div>
                        <div className="text-xs text-gray-300 truncate">{file}</div>
                      </div>
                    ))}
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
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                Chỉnh Sửa
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                Cập Nhật Trạng Thái
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
