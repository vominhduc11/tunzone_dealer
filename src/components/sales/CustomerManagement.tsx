'use client';

import { useState } from 'react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  customerType: 'individual' | 'business';
  businessName?: string;
  taxCode?: string;
  totalPurchases: number;
  totalSpent: number;
  lastPurchase: string;
  status: 'active' | 'inactive' | 'vip';
  notes?: string;
  createdAt: string;
}

const customers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0123456789',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    customerType: 'individual',
    totalPurchases: 5,
    totalSpent: 45000000,
    lastPurchase: '2024-01-15',
    status: 'vip',
    notes: 'Khách hàng VIP, ưu tiên phục vụ',
    createdAt: '2023-06-15'
  },
  {
    id: 'CUST-002',
    name: 'Trần Thị B',
    email: 'tranthib@company.com',
    phone: '0987654321',
    address: '456 Đường XYZ, Quận 3, TP.HCM',
    customerType: 'business',
    businessName: 'Công Ty TNHH ABC',
    taxCode: '0123456789',
    totalPurchases: 8,
    totalSpent: 120000000,
    lastPurchase: '2024-01-14',
    status: 'active',
    createdAt: '2023-03-20'
  },
  {
    id: 'CUST-003',
    name: 'Lê Văn C',
    email: 'levanc@email.com',
    phone: '0456789123',
    address: '789 Đường DEF, Quận 7, TP.HCM',
    customerType: 'individual',
    totalPurchases: 2,
    totalSpent: 18000000,
    lastPurchase: '2024-01-10',
    status: 'active',
    createdAt: '2023-11-05'
  }
];

export default function CustomerManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    customerType: 'individual' as 'individual' | 'business',
    businessName: '',
    taxCode: '',
    notes: ''
  });

  const statuses = ['all', 'active', 'inactive', 'vip'];
  const types = ['all', 'individual', 'business'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-900/30 border-green-700';
      case 'inactive': return 'text-gray-400 bg-gray-900/30 border-gray-700';
      case 'vip': return 'text-yellow-400 bg-yellow-900/30 border-yellow-700';
      default: return 'text-gray-400 bg-gray-900/30 border-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Hoạt Động';
      case 'inactive': return 'Không Hoạt Động';
      case 'vip': return 'VIP';
      default: return status;
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || customer.status === selectedStatus;
    const matchesType = selectedType === 'all' || customer.customerType === selectedType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleAddCustomer = () => {
    console.log('Adding customer:', newCustomer);
    setShowAddModal(false);
    setNewCustomer({
      name: '',
      email: '',
      phone: '',
      address: '',
      customerType: 'individual',
      businessName: '',
      taxCode: '',
      notes: ''
    });
  };

  const handleViewDetail = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowDetailModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-gray-100">Quản Lý Khách Hàng</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
          >
            <span>➕</span>
            <span>Thêm Khách Hàng</span>
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
            <span>📊</span>
            <span>Xuất Excel</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in-up animation-delay-200">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">{customers.length}</div>
          <div className="text-gray-400">Tổng Khách Hàng</div>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-green-400 mb-2">{customers.filter(c => c.status === 'active').length}</div>
          <div className="text-gray-400">Đang Hoạt Động</div>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-yellow-400 mb-2">{customers.filter(c => c.status === 'vip').length}</div>
          <div className="text-gray-400">Khách Hàng VIP</div>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-purple-400 mb-2">{customers.filter(c => c.customerType === 'business').length}</div>
          <div className="text-gray-400">Doanh Nghiệp</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 animate-fade-in-up animation-delay-400">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm khách hàng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-gray-100 placeholder-gray-400 transition-all duration-300"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</div>
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-gray-100 transition-all duration-300"
          >
            <option value="all">Tất Cả Trạng Thái</option>
            <option value="active">Hoạt Động</option>
            <option value="inactive">Không Hoạt Động</option>
            <option value="vip">VIP</option>
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-gray-100 transition-all duration-300"
          >
            <option value="all">Tất Cả Loại</option>
            <option value="individual">Cá Nhân</option>
            <option value="business">Doanh Nghiệp</option>
          </select>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden animate-fade-in-up animation-delay-600">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50 border-b border-gray-600">
              <tr>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Khách Hàng</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Liên Hệ</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Loại</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Tổng Mua</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Tổng Chi</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Mua Cuối</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Trạng Thái</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-4">
                    <div className="font-medium text-gray-100">{customer.name}</div>
                    <div className="text-sm text-gray-400">{customer.id}</div>
                    {customer.businessName && (
                      <div className="text-xs text-blue-400">{customer.businessName}</div>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-gray-300">{customer.phone}</div>
                    <div className="text-sm text-gray-400">{customer.email}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-gray-300">
                      {customer.customerType === 'business' ? '🏢 Doanh nghiệp' : '👤 Cá nhân'}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-semibold text-blue-400">{customer.totalPurchases}</div>
                    <div className="text-xs text-gray-400">đơn hàng</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-semibold text-green-400">₫{customer.totalSpent.toLocaleString()}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-gray-300 text-sm">
                      {new Date(customer.lastPurchase).toLocaleDateString('vi-VN')}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(customer.status)}`}>
                      {getStatusLabel(customer.status)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetail(customer)}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                        title="Xem chi tiết"
                      >
                        👁️
                      </button>
                      <button
                        className="text-green-400 hover:text-green-300 transition-colors"
                        title="Chỉnh sửa"
                      >
                        ✏️
                      </button>
                      <button
                        className="text-purple-400 hover:text-purple-300 transition-colors"
                        title="Lịch sử mua hàng"
                      >
                        📋
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-gray-100">Thêm Khách Hàng Mới</h3>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Tên *</label>
                  <input
                    type="text"
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Điện thoại *</label>
                  <input
                    type="tel"
                    value={newCustomer.phone}
                    onChange={(e) => setNewCustomer(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 text-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Email</label>
                <input
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 text-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Địa chỉ</label>
                <input
                  type="text"
                  value={newCustomer.address}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 text-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Loại khách hàng</label>
                <select
                  value={newCustomer.customerType}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, customerType: e.target.value as 'individual' | 'business' }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 text-gray-100"
                >
                  <option value="individual">Cá nhân</option>
                  <option value="business">Doanh nghiệp</option>
                </select>
              </div>

              {newCustomer.customerType === 'business' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">Tên công ty</label>
                    <input
                      type="text"
                      value={newCustomer.businessName}
                      onChange={(e) => setNewCustomer(prev => ({ ...prev, businessName: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">Mã số thuế</label>
                    <input
                      type="text"
                      value={newCustomer.taxCode}
                      onChange={(e) => setNewCustomer(prev => ({ ...prev, taxCode: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 text-gray-100"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Ghi chú</label>
                <textarea
                  rows={3}
                  value={newCustomer.notes}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 text-gray-100 resize-none"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-700 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleAddCustomer}
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Thêm Khách Hàng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-100">
                  Chi Tiết Khách Hàng - {selectedCustomer.name}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-200 mb-3">Thông Tin Cơ Bản</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Mã KH:</span>
                      <span className="text-gray-300">{selectedCustomer.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tên:</span>
                      <span className="text-gray-300">{selectedCustomer.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Email:</span>
                      <span className="text-gray-300">{selectedCustomer.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Điện thoại:</span>
                      <span className="text-gray-300">{selectedCustomer.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Địa chỉ:</span>
                      <span className="text-gray-300">{selectedCustomer.address}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-200 mb-3">Thống Kê Mua Hàng</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tổng đơn hàng:</span>
                      <span className="text-blue-400 font-semibold">{selectedCustomer.totalPurchases}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tổng chi tiêu:</span>
                      <span className="text-green-400 font-semibold">₫{selectedCustomer.totalSpent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Mua hàng cuối:</span>
                      <span className="text-gray-300">{new Date(selectedCustomer.lastPurchase).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Trạng thái:</span>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(selectedCustomer.status)}`}>
                        {getStatusLabel(selectedCustomer.status)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedCustomer.notes && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-200 mb-2">Ghi Chú</h4>
                  <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-3">
                    <div className="text-gray-300">{selectedCustomer.notes}</div>
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
                Chỉnh Sửa
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                Xem Lịch Sử
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
