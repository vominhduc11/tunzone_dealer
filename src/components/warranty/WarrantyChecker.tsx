'use client';

import { useState } from 'react';

interface WarrantyInfo {
  productName: string;
  model: string;
  serialNumber: string;
  purchaseDate: string;
  warrantyPeriod: number;
  warrantyType: string;
  status: 'active' | 'expired' | 'void' | 'extended';
  remainingDays: number;
  coverageDetails: string[];
  purchaseLocation: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  serviceHistory: ServiceRecord[];
}

interface ServiceRecord {
  id: string;
  date: string;
  type: 'repair' | 'replacement' | 'inspection' | 'maintenance';
  description: string;
  technician: string;
  cost: number;
  status: 'completed' | 'in_progress' | 'pending';
}

const sampleWarrantyData: WarrantyInfo = {
  productName: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
  model: 'WH-1000XM5',
  serialNumber: 'SN123456789',
  purchaseDate: '2023-06-15',
  warrantyPeriod: 24,
  warrantyType: 'Bảo hành chính hãng quốc tế',
  status: 'active',
  remainingDays: 387,
  coverageDetails: [
    'Lỗi kỹ thuật do nhà sản xuất',
    'Hư hỏng linh kiện điện tử',
    'Sự cố phần mềm',
    'Thay thế miễn phí nếu không sửa được'
  ],
  purchaseLocation: 'TuneZone Store - Hà Nội',
  customerInfo: {
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0123456789'
  },
  serviceHistory: [
    {
      id: '1',
      date: '2023-12-10',
      type: 'inspection',
      description: 'Kiểm tra định kỳ - Tất cả chức năng hoạt động bình thường',
      technician: 'Trần Văn B',
      cost: 0,
      status: 'completed'
    },
    {
      id: '2',
      date: '2023-08-20',
      type: 'repair',
      description: 'Thay thế đệm tai nghe bị mòn',
      technician: 'Lê Thị C',
      cost: 0,
      status: 'completed'
    }
  ]
};

export default function WarrantyChecker() {
  const [searchMethod, setSearchMethod] = useState<'serial' | 'order' | 'qr'>('serial');
  const [searchValue, setSearchValue] = useState('');
  const [warrantyInfo, setWarrantyInfo] = useState<WarrantyInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchValue.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo, return sample data if search value matches
    if (searchValue.toLowerCase().includes('sn123456789') || 
        searchValue.toLowerCase().includes('wh-1000xm5')) {
      setWarrantyInfo(sampleWarrantyData);
    } else {
      setWarrantyInfo(null);
    }
    
    setIsLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-900/30 border-green-700';
      case 'expired': return 'text-red-400 bg-red-900/30 border-red-700';
      case 'void': return 'text-gray-400 bg-gray-900/30 border-gray-700';
      case 'extended': return 'text-blue-400 bg-blue-900/30 border-blue-700';
      default: return 'text-gray-400 bg-gray-900/30 border-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Đang Có Hiệu Lực';
      case 'expired': return 'Đã Hết Hạn';
      case 'void': return 'Đã Hủy';
      case 'extended': return 'Đã Gia Hạn';
      default: return status;
    }
  };

  const getServiceTypeIcon = (type: string) => {
    switch (type) {
      case 'repair': return '🔧';
      case 'replacement': return '🔄';
      case 'inspection': return '🔍';
      case 'maintenance': return '⚙️';
      default: return '📋';
    }
  };

  const getServiceTypeLabel = (type: string) => {
    switch (type) {
      case 'repair': return 'Sửa Chữa';
      case 'replacement': return 'Thay Thế';
      case 'inspection': return 'Kiểm Tra';
      case 'maintenance': return 'Bảo Trì';
      default: return type;
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Section */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-gray-100 mb-6 flex items-center">
          <span className="mr-3">🔍</span>
          Kiểm Tra Thông Tin Bảo Hành
        </h2>

        {/* Search Method Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => setSearchMethod('serial')}
            className={`p-4 rounded-lg border transition-all duration-300 ${
              searchMethod === 'serial'
                ? 'border-green-500 bg-green-900/30 text-green-400'
                : 'border-gray-600 bg-gray-700/30 text-gray-300 hover:border-gray-500'
            }`}
          >
            <div className="text-2xl mb-2">🏷️</div>
            <div className="font-medium">Số Serial</div>
            <div className="text-sm opacity-75">Nhập số serial sản phẩm</div>
          </button>

          <button
            onClick={() => setSearchMethod('order')}
            className={`p-4 rounded-lg border transition-all duration-300 ${
              searchMethod === 'order'
                ? 'border-green-500 bg-green-900/30 text-green-400'
                : 'border-gray-600 bg-gray-700/30 text-gray-300 hover:border-gray-500'
            }`}
          >
            <div className="text-2xl mb-2">📦</div>
            <div className="font-medium">Mã Đơn Hàng</div>
            <div className="text-sm opacity-75">Nhập mã đơn hàng</div>
          </button>

          <button
            onClick={() => setSearchMethod('qr')}
            className={`p-4 rounded-lg border transition-all duration-300 ${
              searchMethod === 'qr'
                ? 'border-green-500 bg-green-900/30 text-green-400'
                : 'border-gray-600 bg-gray-700/30 text-gray-300 hover:border-gray-500'
            }`}
          >
            <div className="text-2xl mb-2">📱</div>
            <div className="font-medium">Quét QR Code</div>
            <div className="text-sm opacity-75">Quét mã QR trên sản phẩm</div>
          </button>
        </div>

        {/* Search Input */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder={
                searchMethod === 'serial' ? 'Nhập số serial (VD: SN123456789)' :
                searchMethod === 'order' ? 'Nhập mã đơn hàng (VD: TZ-2024-001234)' :
                'Nhấn nút quét để mở camera'
              }
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 text-gray-100 placeholder-gray-400 transition-all duration-300"
              disabled={searchMethod === 'qr'}
            />
          </div>
          
          {searchMethod === 'qr' ? (
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
              <span>📷</span>
              <span>Quét QR</span>
            </button>
          ) : (
            <button
              onClick={handleSearch}
              disabled={isLoading || !searchValue.trim()}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Đang Tìm...</span>
                </>
              ) : (
                <>
                  <span>🔍</span>
                  <span>Kiểm Tra</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Quick Examples */}
        <div className="mt-4 text-sm text-gray-400">
          <span className="mr-2">Thử với:</span>
          <button
            onClick={() => setSearchValue('SN123456789')}
            className="text-green-400 hover:text-green-300 underline mr-4"
          >
            SN123456789
          </button>
          <button
            onClick={() => setSearchValue('WH-1000XM5')}
            className="text-green-400 hover:text-green-300 underline"
          >
            WH-1000XM5
          </button>
        </div>
      </div>

      {/* Warranty Information */}
      {warrantyInfo && (
        <div className="space-y-6 animate-fade-in-up animation-delay-300">
          {/* Product Info */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-100 mb-2">{warrantyInfo.productName}</h3>
                <div className="space-y-1 text-gray-400">
                  <div>Model: <span className="text-gray-300">{warrantyInfo.model}</span></div>
                  <div>Serial: <span className="text-gray-300 font-mono">{warrantyInfo.serialNumber}</span></div>
                  <div>Ngày mua: <span className="text-gray-300">{new Date(warrantyInfo.purchaseDate).toLocaleDateString('vi-VN')}</span></div>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(warrantyInfo.status)} mb-2`}>
                  {getStatusLabel(warrantyInfo.status)}
                </div>
                <div className="text-gray-400 text-sm">
                  Còn lại: <span className="text-green-400 font-bold">{warrantyInfo.remainingDays} ngày</span>
                </div>
              </div>
            </div>

            {/* Warranty Progress */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Tiến độ bảo hành</span>
                <span className="text-gray-300">
                  {Math.round(((warrantyInfo.warrantyPeriod * 30 - warrantyInfo.remainingDays) / (warrantyInfo.warrantyPeriod * 30)) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${((warrantyInfo.warrantyPeriod * 30 - warrantyInfo.remainingDays) / (warrantyInfo.warrantyPeriod * 30)) * 100}%` 
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{new Date(warrantyInfo.purchaseDate).toLocaleDateString('vi-VN')}</span>
                <span>{new Date(new Date(warrantyInfo.purchaseDate).getTime() + warrantyInfo.warrantyPeriod * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN')}</span>
              </div>
            </div>

            {/* Coverage Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-200 mb-3">Thông Tin Bảo Hành</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Loại bảo hành:</span>
                    <span className="text-gray-300">{warrantyInfo.warrantyType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Thời hạn:</span>
                    <span className="text-gray-300">{warrantyInfo.warrantyPeriod} tháng</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Nơi mua:</span>
                    <span className="text-gray-300">{warrantyInfo.purchaseLocation}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-200 mb-3">Thông Tin Khách Hàng</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tên:</span>
                    <span className="text-gray-300">{warrantyInfo.customerInfo.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Email:</span>
                    <span className="text-gray-300">{warrantyInfo.customerInfo.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Điện thoại:</span>
                    <span className="text-gray-300">{warrantyInfo.customerInfo.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coverage Details */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-200 mb-4 flex items-center">
              <span className="mr-2">🛡️</span>
              Phạm Vi Bảo Hành
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {warrantyInfo.coverageDetails.map((detail, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-green-900/20 border border-green-700/50 rounded-lg">
                  <span className="text-green-400">✅</span>
                  <span className="text-gray-300">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Service History */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-200 mb-4 flex items-center">
              <span className="mr-2">📋</span>
              Lịch Sử Bảo Hành ({warrantyInfo.serviceHistory.length})
            </h4>
            
            {warrantyInfo.serviceHistory.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <div className="text-4xl mb-2">🎉</div>
                <p>Sản phẩm chưa từng có sự cố nào!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {warrantyInfo.serviceHistory.map((record) => (
                  <div key={record.id} className="flex items-start space-x-4 p-4 bg-gray-700/30 rounded-lg">
                    <div className="text-2xl">{getServiceTypeIcon(record.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-gray-100">{getServiceTypeLabel(record.type)}</div>
                        <div className="text-sm text-gray-400">{new Date(record.date).toLocaleDateString('vi-VN')}</div>
                      </div>
                      <div className="text-gray-300 text-sm mb-2">{record.description}</div>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>Kỹ thuật viên: {record.technician}</span>
                        <span className={record.cost === 0 ? 'text-green-400' : 'text-yellow-400'}>
                          {record.cost === 0 ? 'Miễn phí' : `₫${record.cost.toLocaleString()}`}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => console.log('Create warranty claim')}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <span>📝</span>
              <span>Tạo Yêu Cầu Bảo Hành</span>
            </button>
            
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
              <span>📄</span>
              <span>In Giấy Chứng Nhận</span>
            </button>
            
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
              <span>📧</span>
              <span>Gửi Email Khách Hàng</span>
            </button>
            
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
              <span>🔄</span>
              <span>Gia Hạn Bảo Hành</span>
            </button>
          </div>
        </div>
      )}

      {/* No Results */}
      {!warrantyInfo && searchValue && !isLoading && (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 text-center animate-fade-in-up animation-delay-300">
          <div className="text-6xl mb-4">❌</div>
          <h3 className="text-xl font-semibold text-gray-100 mb-2">Không Tìm Thấy Thông Tin</h3>
          <p className="text-gray-400 mb-6">
            Không tìm thấy thông tin bảo hành cho &quot;{searchValue}&quot;. Vui lòng kiểm tra lại thông tin hoặc liên hệ hỗ trợ.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
              📞 Liên Hệ Hỗ Trợ
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
              📝 Đăng Ký Bảo Hành Mới
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
