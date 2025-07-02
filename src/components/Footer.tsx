import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">TuneZone Nhà Phân Phối</h3>
            <p className="text-gray-300 mb-4 max-w-md">
              Đối tác bán sỉ đáng tin cậy của bạn cho thiết bị âm thanh cao cấp. Cung cấp cho doanh nghiệp 
              các sản phẩm chất lượng, giá cạnh tranh và dịch vụ đặc biệt trên toàn quốc.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                📘
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                🐦
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                📷
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                💼
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên Kết Nhanh</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white transition-colors">
                  Sản Phẩm
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-300 hover:text-white transition-colors">
                  Hỗ Trợ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Liên Hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Hỗ Trợ</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-300 hover:text-white transition-colors">
                  Trung Tâm Trợ Giúp
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-gray-300 hover:text-white transition-colors">
                  Bảo Hành
                </Link>
              </li>
              <li>
                <Link href="/installation" className="text-gray-300 hover:text-white transition-colors">
                  Hướng Dẫn Lắp Đặt
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">
                  Câu Hỏi Thường Gặp
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2024 TuneZone Nhà Phân Phối. Tất cả quyền được bảo lưu.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Chính Sách Bảo Mật
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Điều Khoản Dịch Vụ
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                Chính Sách Cookie
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
