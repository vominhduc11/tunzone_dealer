import AnimationWrapper from './AnimationWrapper';

const benefits = [
  {
    icon: "🏪",
    title: "Giá Bán Sỉ",
    description: "Truy cập giá bán sỉ độc quyền với mức tiết kiệm đáng kể cho tất cả sản phẩm âm thanh cao cấp."
  },
  {
    icon: "🛠️",
    title: "Hỗ Trợ Chuyên Nghiệp",
    description: "Hỗ trợ kỹ thuật chuyên môn và hướng dẫn sản phẩm từ các chuyên gia âm thanh được chứng nhận."
  },
  {
    icon: "🔧",
    title: "Bảo Hành Toàn Diện",
    description: "Bảo hành mở rộng và dịch vụ hỗ trợ cho tất cả sản phẩm được mua thông qua nền tảng của chúng tôi."
  },
  {
    icon: "💰",
    title: "Giảm Giá Số Lượng Lớn",
    description: "Giảm giá bổ sung cho đơn hàng số lượng lớn với điều khoản thanh toán linh hoạt và tùy chọn tài chính."
  },
  {
    icon: "📦",
    title: "Dải Sản Phẩm Rộng",
    description: "Truy cập hàng nghìn sản phẩm từ các thương hiệu hàng đầu trong âm thanh ô tô, rạp hát tại nhà và âm thanh chuyên nghiệp."
  },
  {
    icon: "🚚",
    title: "Giao Hàng Nhanh",
    description: "Xử lý và giao hàng nhanh chóng với theo dõi cho tất cả đơn hàng trên toàn quốc."
  }
];

export default function Benefits() {
  return (
    <section className="py-16 bg-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimationWrapper animation="animate-fade-in-up" delay={100}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
              Tại Sao Chọn Nền Tảng Bán Sỉ Của Chúng Tôi?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Trải nghiệm lợi ích của việc làm việc trực tiếp với các nhà sản xuất và phân phối âm thanh cao cấp
            </p>
          </div>
        </AnimationWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <AnimationWrapper 
              key={index} 
              animation="animate-fade-in-up" 
              delay={200 + (index * 100)}
            >
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-gray-600 hover-lift hover-glow group transform hover:scale-[1.02]">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 animate-float" 
                     style={{animationDelay: `${index * 0.2}s`}}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-100 mb-3 group-hover:text-white transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                  {benefit.description}
                </p>
              </div>
            </AnimationWrapper>
          ))}
        </div>

        {/* Call to Action */}
        <AnimationWrapper animation="animate-zoom-in" delay={800}>
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-center text-white relative overflow-hidden">
            {/* Background animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 animate-gradient opacity-80"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Sẵn Sàng Bắt Đầu Đặt Hàng?
              </h3>
              <p className="text-xl mb-6 max-w-2xl mx-auto opacity-90">
                Duyệt qua danh mục rộng lớn các sản phẩm âm thanh cao cấp với giá bán sỉ.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/products" 
                  className="bg-white/90 backdrop-blur-sm text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition-all duration-300 hover-lift transform hover:scale-105 border border-white/20"
                >
                  Xem Sản Phẩm
                </a>
                <a 
                  href="/contact" 
                  className="border-2 border-white/80 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 hover:border-white transition-all duration-300 hover-lift transform hover:scale-105"
                >
                  Liên Hệ Hỗ Trợ
                </a>
              </div>
            </div>
          </div>
        </AnimationWrapper>
      </div>
    </section>
  );
}
