'use client';

import { useState } from 'react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    category: 'Tài Khoản & Đăng Ký',
    question: 'Làm thế nào để trở thành nhà phân phối của TuneZone?',
    answer: 'Để trở thành nhà phân phối, bạn cần: 1) Điền form đăng ký tại trang "Trở Thành Nhà Phân Phối", 2) Cung cấp giấy phép kinh doanh hợp lệ, 3) Chờ đội ngũ của chúng tôi xem xét và phê duyệt (thường trong 2-3 ngày làm việc), 4) Hoàn thành quá trình xác minh và ký hợp đồng.'
  },
  {
    id: '2',
    category: 'Tài Khoản & Đăng Ký',
    question: 'Tôi quên mật khẩu, làm sao để đặt lại?',
    answer: 'Tại trang đăng nhập, nhấp vào "Quên mật khẩu?". Nhập email đã đăng ký, chúng tôi sẽ gửi link đặt lại mật khẩu. Link có hiệu lực trong 24 giờ. Nếu không nhận được email, kiểm tra thư mục spam hoặc liên hệ hỗ trợ.'
  },
  {
    id: '3',
    category: 'Đặt Hàng & Thanh Toán',
    question: 'Các phương thức thanh toán nào được chấp nhận?',
    answer: 'Chúng tôi chấp nhận: Thẻ tín dụng (Visa, MasterCard, American Express), Chuyển khoản ngân hàng, PayPal, và thanh toán qua QR code. Đối với đơn hàng lớn, chúng tôi cũng hỗ trợ thanh toán theo hạn với điều kiện tín dụng phù hợp.'
  },
  {
    id: '4',
    category: 'Đặt Hàng & Thanh Toán',
    question: 'Làm thế nào để theo dõi đơn hàng của tôi?',
    answer: 'Sau khi đặt hàng thành công, bạn sẽ nhận được email xác nhận với mã theo dõi. Bạn có thể theo dõi đơn hàng tại trang "Đơn Hàng Của Tôi" trong dashboard hoặc sử dụng mã theo dõi trên website của đơn vị vận chuyển.'
  },
  {
    id: '5',
    category: 'Vận Chuyển & Giao Hàng',
    question: 'Thời gian giao hàng là bao lâu?',
    answer: 'Thời gian giao hàng phụ thuộc vào địa điểm: Nội thành các thành phố lớn: 1-2 ngày, Tỉnh thành khác: 2-4 ngày, Vùng sâu vùng xa: 4-7 ngày. Đối với sản phẩm đặc biệt hoặc số lượng lớn, thời gian có thể lâu hơn và sẽ được thông báo cụ thể.'
  },
  {
    id: '6',
    category: 'Vận Chuyển & Giao Hàng',
    question: 'Chi phí vận chuyển được tính như thế nào?',
    answer: 'Chi phí vận chuyển được tính dựa trên: Trọng lượng và kích thước đơn hàng, Khoảng cách giao hàng, Phương thức vận chuyển (tiêu chuẩn/nhanh). Miễn phí vận chuyển cho đơn hàng trên 10 triệu VNĐ trong nội thành.'
  },
  {
    id: '7',
    category: 'Sản Phẩm & Giá Cả',
    question: 'Làm thế nào để xem giá bán sỉ?',
    answer: 'Giá bán sỉ chỉ hiển thị sau khi bạn đăng nhập với tài khoản nhà phân phối đã được phê duyệt. Giá sẽ tự động cập nhật dựa trên cấp độ đối tác và số lượng đặt hàng của bạn.'
  },
  {
    id: '8',
    category: 'Sản Phẩm & Giá Cả',
    question: 'Có chính sách giảm giá cho đơn hàng lớn không?',
    answer: 'Có, chúng tôi có chính sách giảm giá theo số lượng: 50-99 sản phẩm: giảm 5%, 100-499 sản phẩm: giảm 10%, 500+ sản phẩm: giảm 15%. Ngoài ra còn có ưu đãi đặc biệt cho khách hàng VIP và đơn hàng theo mùa.'
  },
  {
    id: '9',
    category: 'Hỗ Trợ Kỹ Thuật',
    question: 'Tôi cần hỗ trợ kỹ thuật cho sản phẩm đã mua, làm thế nào?',
    answer: 'Bạn có thể: 1) Tạo ticket hỗ trợ tại trang này với thông tin chi tiết, 2) Gọi hotline kỹ thuật: 1-800-TECH123, 3) Chat trực tiếp với kỹ thuật viên, 4) Email: tech@tunezone.com. Chúng tôi cam kết phản hồi trong vòng 2 giờ.'
  },
  {
    id: '10',
    category: 'Bảo Hành & Đổi Trả',
    question: 'Chính sách bảo hành như thế nào?',
    answer: 'Tất cả sản phẩm đều có bảo hành chính hãng: Thiết bị âm thanh: 12-24 tháng, Phụ kiện: 6-12 tháng. Bảo hành bao gồm lỗi kỹ thuật, không bao gồm hư hỏng do sử dụng sai cách. Quy trình bảo hành nhanh chóng với dịch vụ đổi mới trong 7 ngày đầu.'
  }
];

const categories = ['Tất Cả', 'Tài Khoản & Đăng Ký', 'Đặt Hàng & Thanh Toán', 'Vận Chuyển & Giao Hàng', 'Sản Phẩm & Giá Cả', 'Hỗ Trợ Kỹ Thuật', 'Bảo Hành & Đổi Trả'];

export default function FAQSection() {
  const [selectedCategory, setSelectedCategory] = useState('Tất Cả');
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQs = faqData.filter(item => {
    const matchesCategory = selectedCategory === 'Tất Cả' || item.category === selectedCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative animate-fade-in-up">
        <input
          type="text"
          placeholder="Tìm kiếm câu hỏi..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 pl-12 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-100 placeholder-gray-400 transition-all duration-300"
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          🔍
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 animate-fade-in-up animation-delay-200">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white border border-gray-600 hover:border-gray-500'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* FAQ Items */}
      <div className="space-y-4 animate-fade-in-up animation-delay-400">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <div className="text-6xl mb-4">🤔</div>
            <p className="text-xl">Không tìm thấy câu hỏi phù hợp</p>
            <p className="mt-2">Hãy thử tìm kiếm với từ khóa khác hoặc liên hệ hỗ trợ trực tiếp</p>
          </div>
        ) : (
          filteredFAQs.map((item, index) => (
            <div
              key={item.id}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden hover:border-gray-600 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-700/30 transition-all duration-300"
              >
                <div className="flex-1">
                  <div className="text-sm text-blue-400 mb-1">{item.category}</div>
                  <div className="text-gray-100 font-medium">{item.question}</div>
                </div>
                <div className={`text-2xl transition-transform duration-300 ${
                  openItems.includes(item.id) ? 'transform rotate-180' : ''
                }`}>
                  ⌄
                </div>
              </button>
              
              {openItems.includes(item.id) && (
                <div className="px-6 pb-4 border-t border-gray-700/50 animate-slide-up">
                  <div className="pt-4 text-gray-300 leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Contact CTA */}
      <div className="bg-blue-900/30 backdrop-blur-sm border border-blue-700/50 rounded-lg p-6 text-center animate-fade-in-up animation-delay-600">
        <h3 className="text-xl font-semibold text-gray-100 mb-2">
          Không tìm thấy câu trả lời?
        </h3>
        <p className="text-gray-300 mb-4">
          Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
            💬 Chat Trực Tiếp
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
            🎫 Tạo Ticket Hỗ Trợ
          </button>
        </div>
      </div>
    </div>
  );
}
