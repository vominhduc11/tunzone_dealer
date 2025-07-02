'use client';

import { useState } from 'react';

interface PolicySection {
  id: string;
  title: string;
  icon: string;
  content: string[];
  important?: boolean;
}

interface ProductCategory {
  name: string;
  warrantyPeriod: string;
  coverage: string[];
  exclusions: string[];
  icon: string;
}

const policySections: PolicySection[] = [
  {
    id: 'general',
    title: 'Điều Khoản Chung',
    icon: '📋',
    content: [
      'Bảo hành có hiệu lực từ ngày mua hàng được ghi trên hóa đơn chính thức.',
      'Sản phẩm phải được sử dụng đúng mục đích và theo hướng dẫn của nhà sản xuất.',
      'Khách hàng cần bảo quản hóa đơn mua hàng và phiếu bảo hành trong suốt thời gian bảo hành.',
      'Bảo hành chỉ áp dụng cho khách hàng mua hàng chính thức tại TuneZone hoặc đại lý ủy quyền.',
      'Thời gian bảo hành được tính từ ngày giao hàng thành công cho khách hàng.'
    ]
  },
  {
    id: 'coverage',
    title: 'Phạm Vi Bảo Hành',
    icon: '🛡️',
    content: [
      'Lỗi kỹ thuật do nhà sản xuất (manufacturing defects).',
      'Hư hỏng linh kiện điện tử trong điều kiện sử dụng bình thường.',
      'Sự cố phần mềm firmware của sản phẩm.',
      'Lỗi kết nối và tương thích với thiết bị khác.',
      'Thay thế miễn phí nếu sản phẩm không thể sửa chữa được.',
      'Chi phí vận chuyển 2 chiều trong thời gian bảo hành.'
    ],
    important: true
  },
  {
    id: 'exclusions',
    title: 'Không Bảo Hành',
    icon: '❌',
    content: [
      'Hư hỏng do tác động vật lý: rơi, va đập, ngâm nước, cháy nổ.',
      'Hư hỏng do sử dụng sai mục đích hoặc không đúng hướng dẫn.',
      'Tự ý tháo rời, sửa chữa hoặc can thiệp vào cấu trúc sản phẩm.',
      'Hư hỏng do thiên tai, hỏa hoạn, lũ lụt, sét đánh.',
      'Hao mòn tự nhiên: pin, đệm tai nghe, vỏ bọc, dây cáp.',
      'Sản phẩm đã hết thời hạn bảo hành hoặc không có hóa đơn chính thức.'
    ],
    important: true
  },
  {
    id: 'process',
    title: 'Quy Trình Bảo Hành',
    icon: '🔄',
    content: [
      'Bước 1: Liên hệ hotline bảo hành hoặc đến trực tiếp cửa hàng.',
      'Bước 2: Cung cấp thông tin sản phẩm và mô tả sự cố.',
      'Bước 3: Gửi sản phẩm về trung tâm bảo hành (có thể pickup tại nhà).',
      'Bước 4: Kỹ thuật viên kiểm tra và đánh giá tình trạng sản phẩm.',
      'Bước 5: Thông báo kết quả và thời gian sửa chữa dự kiến.',
      'Bước 6: Sửa chữa hoặc thay thế sản phẩm.',
      'Bước 7: Kiểm tra chất lượng và giao trả sản phẩm cho khách hàng.'
    ]
  },
  {
    id: 'timeline',
    title: 'Thời Gian Xử Lý',
    icon: '⏰',
    content: [
      'Tiếp nhận và kiểm tra ban đầu: 24 giờ.',
      'Chẩn đoán và báo giá (nếu hết bảo hành): 1-2 ngày làm việc.',
      'Sửa chữa thông thường: 3-5 ngày làm việc.',
      'Sửa chữa phức tạp hoặc chờ linh kiện: 7-14 ngày làm việc.',
      'Thay thế sản phẩm mới: 1-3 ngày làm việc.',
      'Giao trả sản phẩm: Trong ngày hoặc 1 ngày làm việc.'
    ]
  },
  {
    id: 'rights',
    title: 'Quyền Lợi Khách Hàng',
    icon: '👤',
    content: [
      'Được kiểm tra sản phẩm trước khi nhận lại.',
      'Được gia hạn bảo hành nếu sửa chữa quá 15 ngày.',
      'Được đổi sản phẩm mới nếu sửa chữa không thành công sau 3 lần.',
      'Được hỗ trợ kỹ thuật miễn phí trong thời gian bảo hành.',
      'Được thông báo tiến độ sửa chữa qua SMS/Email.',
      'Được bồi thường nếu có lỗi từ phía trung tâm bảo hành.'
    ]
  }
];

const productCategories: ProductCategory[] = [
  {
    name: 'Tai Nghe Cao Cấp',
    warrantyPeriod: '24 tháng',
    coverage: [
      'Lỗi driver âm thanh',
      'Hư hỏng mạch điện tử',
      'Lỗi kết nối Bluetooth/có dây',
      'Sự cố phần mềm',
      'Thay thế đệm tai miễn phí (1 lần)'
    ],
    exclusions: [
      'Đệm tai nghe hao mòn tự nhiên',
      'Dây cáp bị đứt do sử dụng',
      'Vỏ ngoài trầy xước'
    ],
    icon: '🎧'
  },
  {
    name: 'Loa Bluetooth',
    warrantyPeriod: '18 tháng',
    coverage: [
      'Lỗi driver loa',
      'Hư hỏng mạch khuếch đại',
      'Sự cố kết nối Bluetooth',
      'Lỗi sạc pin',
      'Thay thế pin (nếu có lỗi kỹ thuật)'
    ],
    exclusions: [
      'Pin hao mòn tự nhiên',
      'Vỏ ngoài va đập',
      'Lưới loa bị rách'
    ],
    icon: '🔊'
  },
  {
    name: 'Microphone',
    warrantyPeriod: '12 tháng',
    coverage: [
      'Lỗi capsule microphone',
      'Hư hỏng mạch tiền khuếch đại',
      'Sự cố kết nối XLR/USB',
      'Lỗi phantom power',
      'Thay thế shock mount'
    ],
    exclusions: [
      'Foam chống gió hao mòn',
      'Dây cáp XLR/USB',
      'Chân đế microphone'
    ],
    icon: '🎤'
  },
  {
    name: 'Monitor Speaker',
    warrantyPeriod: '24 tháng',
    coverage: [
      'Lỗi driver tweeter/woofer',
      'Hư hỏng mạch khuếch đại',
      'Sự cố crossover',
      'Lỗi kết nối đầu vào',
      'Thay thế linh kiện điện tử'
    ],
    exclusions: [
      'Vỏ gỗ trầy xước',
      'Lưới bảo vệ loa',
      'Chân đế loa'
    ],
    icon: '🔈'
  }
];

export default function WarrantyPolicies() {
  const [activeSection, setActiveSection] = useState('general');
  const [showProductDetails, setShowProductDetails] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center animate-fade-in-up">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">Chính Sách Bảo Hành</h2>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Tìm hiểu chi tiết về chính sách bảo hành của TuneZone để đảm bảo quyền lợi tốt nhất cho khách hàng
        </p>
      </div>

      {/* Quick Navigation */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 animate-fade-in-up animation-delay-200">
        <h3 className="text-lg font-semibold text-gray-100 mb-4">Điều Hướng Nhanh</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {policySections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`p-3 rounded-lg border transition-all duration-300 text-center ${
                activeSection === section.id
                  ? 'border-green-500 bg-green-900/30 text-green-400'
                  : 'border-gray-600 bg-gray-700/30 text-gray-300 hover:border-gray-500'
              }`}
            >
              <div className="text-2xl mb-1">{section.icon}</div>
              <div className="text-xs font-medium">{section.title}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Policy Content */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 animate-fade-in-up animation-delay-400">
        {policySections.map((section) => (
          activeSection === section.id && (
            <div key={section.id}>
              <div className="flex items-center mb-6">
                <span className="text-3xl mr-3">{section.icon}</span>
                <h3 className="text-2xl font-bold text-gray-100">{section.title}</h3>
                {section.important && (
                  <span className="ml-3 px-2 py-1 bg-red-900/30 border border-red-700 text-red-400 text-xs rounded-full">
                    Quan Trọng
                  </span>
                )}
              </div>
              
              <div className="space-y-4">
                {section.content.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-3 p-4 rounded-lg transition-all duration-300 hover:scale-105 ${
                      section.important 
                        ? 'bg-red-900/10 border border-red-700/30 hover:border-red-600/50' 
                        : 'bg-gray-700/30 border border-gray-600/30 hover:border-gray-500/50'
                    }`}
                  >
                    <div className={`text-lg mt-0.5 ${
                      section.important ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {section.id === 'exclusions' ? '❌' : 
                       section.id === 'process' ? `${index + 1}.` : '✅'}
                    </div>
                    <div className="text-gray-300 leading-relaxed">{item}</div>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>

      {/* Product Categories */}
      <div className="space-y-6 animate-fade-in-up animation-delay-600">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-100">Bảo Hành Theo Danh Mục Sản Phẩm</h3>
          <button
            onClick={() => setShowProductDetails(!showProductDetails)}
            className="text-green-400 hover:text-green-300 transition-colors flex items-center space-x-2"
          >
            <span>{showProductDetails ? 'Thu Gọn' : 'Xem Chi Tiết'}</span>
            <span>{showProductDetails ? '⬆️' : '⬇️'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {productCategories.map((category, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-gray-600 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{category.icon}</span>
                <div>
                  <h4 className="text-lg font-semibold text-gray-100">{category.name}</h4>
                  <div className="text-green-400 font-medium">Bảo hành: {category.warrantyPeriod}</div>
                </div>
              </div>

              {showProductDetails && (
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-200 mb-2 flex items-center">
                      <span className="mr-2">✅</span>
                      Được Bảo Hành
                    </h5>
                    <div className="space-y-1">
                      {category.coverage.map((item, idx) => (
                        <div key={idx} className="text-sm text-gray-300 pl-4">
                          • {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-200 mb-2 flex items-center">
                      <span className="mr-2">❌</span>
                      Không Bảo Hành
                    </h5>
                    <div className="space-y-1">
                      {category.exclusions.map((item, idx) => (
                        <div key={idx} className="text-sm text-gray-400 pl-4">
                          • {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-6 animate-fade-in-up animation-delay-800">
        <h3 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
          <span className="mr-2">📞</span>
          Liên Hệ Bảo Hành
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl mb-2">📞</div>
            <div className="font-medium text-gray-100">Hotline Bảo Hành</div>
            <div className="text-blue-400">1-800-WARRANTY</div>
            <div className="text-xs text-gray-400">24/7 - Miễn phí</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl mb-2">✉️</div>
            <div className="font-medium text-gray-100">Email Hỗ Trợ</div>
            <div className="text-blue-400">warranty@tunezone.com</div>
            <div className="text-xs text-gray-400">Phản hồi trong 2h</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl mb-2">💬</div>
            <div className="font-medium text-gray-100">Chat Trực Tiếp</div>
            <div className="text-blue-400">tunezone.com/chat</div>
            <div className="text-xs text-gray-400">8:00 - 22:00 hàng ngày</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl mb-2">🏪</div>
            <div className="font-medium text-gray-100">Trung Tâm Bảo Hành</div>
            <div className="text-blue-400">15+ địa điểm</div>
            <div className="text-xs text-gray-400">Toàn quốc</div>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-6 animate-fade-in-up animation-delay-900">
        <h3 className="text-xl font-semibold text-yellow-400 mb-4 flex items-center">
          <span className="mr-2">⚠️</span>
          Lưu Ý Quan Trọng
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-100 mb-2">Trước Khi Gửi Bảo Hành:</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• Sao lưu dữ liệu quan trọng (nếu có)</li>
              <li>• Tháo rời phụ kiện không liên quan</li>
              <li>• Chụp ảnh tình trạng sản phẩm</li>
              <li>• Chuẩn bị hóa đơn và phiếu bảo hành</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-100 mb-2">Trong Quá Trình Bảo Hành:</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• Theo dõi tiến độ qua SMS/Email</li>
              <li>• Liên hệ nếu quá thời gian cam kết</li>
              <li>• Kiểm tra kỹ sản phẩm khi nhận lại</li>
              <li>• Đánh giá chất lượng dịch vụ</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in-up animation-delay-1000">
        <button className="bg-green-600/20 border border-green-600/50 hover:bg-green-600/30 text-green-400 p-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-center">
          <div className="text-3xl mb-2">🔍</div>
          <div className="font-medium">Kiểm Tra Bảo Hành</div>
          <div className="text-sm opacity-75">Tra cứu thông tin bảo hành</div>
        </button>
        
        <button className="bg-blue-600/20 border border-blue-600/50 hover:bg-blue-600/30 text-blue-400 p-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-center">
          <div className="text-3xl mb-2">📝</div>
          <div className="font-medium">Tạo Yêu Cầu</div>
          <div className="text-sm opacity-75">Gửi yêu cầu bảo hành mới</div>
        </button>
        
        <button className="bg-purple-600/20 border border-purple-600/50 hover:bg-purple-600/30 text-purple-400 p-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-center">
          <div className="text-3xl mb-2">📄</div>
          <div className="font-medium">Tải Chính Sách</div>
          <div className="text-sm opacity-75">Tải file PDF chi tiết</div>
        </button>
      </div>
    </div>
  );
}
