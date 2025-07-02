'use client';

import { useState } from 'react';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'guide' | 'video' | 'pdf' | 'faq' | 'tool';
  icon: string;
  url: string;
  downloadSize?: string;
  duration?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'Hướng Dẫn Đăng Ký Nhà Phân Phối',
    description: 'Quy trình chi tiết để trở thành nhà phân phối chính thức của TuneZone',
    category: 'Bắt Đầu',
    type: 'guide',
    icon: '📋',
    url: '/guides/dealer-registration',
    difficulty: 'beginner',
    tags: ['đăng ký', 'nhà phân phối', 'bắt đầu']
  },
  {
    id: '2',
    title: 'Video: Cách Sử Dụng Dashboard',
    description: 'Video hướng dẫn sử dụng dashboard nhà phân phối từ A-Z',
    category: 'Hướng Dẫn Sử Dụng',
    type: 'video',
    icon: '🎥',
    url: '/videos/dashboard-tutorial',
    duration: '15 phút',
    difficulty: 'beginner',
    tags: ['dashboard', 'video', 'hướng dẫn']
  },
  {
    id: '3',
    title: 'Catalog Sản Phẩm 2024',
    description: 'Danh mục đầy đủ tất cả sản phẩm với thông số kỹ thuật và giá bán sỉ',
    category: 'Sản Phẩm',
    type: 'pdf',
    icon: '📄',
    url: '/downloads/product-catalog-2024.pdf',
    downloadSize: '25 MB',
    difficulty: 'beginner',
    tags: ['catalog', 'sản phẩm', '2024']
  },
  {
    id: '4',
    title: 'API Documentation',
    description: 'Tài liệu API cho tích hợp hệ thống và tự động hóa đơn hàng',
    category: 'Kỹ Thuật',
    type: 'guide',
    icon: '⚙️',
    url: '/docs/api',
    difficulty: 'advanced',
    tags: ['api', 'tích hợp', 'kỹ thuật']
  },
  {
    id: '5',
    title: 'Công Cụ Tính Giá Tự Động',
    description: 'Tool tính toán giá bán lẻ dựa trên giá bán sỉ và tỷ suất lợi nhuận',
    category: 'Công Cụ',
    type: 'tool',
    icon: '🧮',
    url: '/tools/price-calculator',
    difficulty: 'intermediate',
    tags: ['công cụ', 'giá', 'tính toán']
  },
  {
    id: '6',
    title: 'Hướng Dẫn Xử Lý Đơn Hàng',
    description: 'Quy trình xử lý đơn hàng từ nhận đơn đến giao hàng',
    category: 'Quy Trình',
    type: 'guide',
    icon: '📦',
    url: '/guides/order-processing',
    difficulty: 'intermediate',
    tags: ['đơn hàng', 'quy trình', 'giao hàng']
  },
  {
    id: '7',
    title: 'Video: Cài Đặt Thiết Bị Âm Thanh',
    description: 'Series video hướng dẫn cài đặt và cấu hình các loại thiết bị âm thanh',
    category: 'Kỹ Thuật',
    type: 'video',
    icon: '🔧',
    url: '/videos/audio-setup',
    duration: '45 phút',
    difficulty: 'intermediate',
    tags: ['cài đặt', 'âm thanh', 'kỹ thuật']
  },
  {
    id: '8',
    title: 'Chính Sách Bảo Hành & Đổi Trả',
    description: 'Tài liệu chi tiết về chính sách bảo hành và quy trình đổi trả',
    category: 'Chính Sách',
    type: 'pdf',
    icon: '🛡️',
    url: '/downloads/warranty-policy.pdf',
    downloadSize: '2 MB',
    difficulty: 'beginner',
    tags: ['bảo hành', 'đổi trả', 'chính sách']
  },
  {
    id: '9',
    title: 'Marketing Kit cho Nhà Phân Phối',
    description: 'Bộ tài liệu marketing, banner, brochure để hỗ trợ bán hàng',
    category: 'Marketing',
    type: 'pdf',
    icon: '🎨',
    url: '/downloads/marketing-kit.zip',
    downloadSize: '150 MB',
    difficulty: 'beginner',
    tags: ['marketing', 'banner', 'brochure']
  },
  {
    id: '10',
    title: 'Troubleshooting Guide',
    description: 'Hướng dẫn xử lý các sự cố thường gặp với thiết bị âm thanh',
    category: 'Kỹ Thuật',
    type: 'guide',
    icon: '🔍',
    url: '/guides/troubleshooting',
    difficulty: 'advanced',
    tags: ['troubleshooting', 'sự cố', 'kỹ thuật']
  }
];

const categories = ['Tất Cả', 'Bắt Đầu', 'Hướng Dẫn Sử Dụng', 'Sản Phẩm', 'Kỹ Thuật', 'Công Cụ', 'Quy Trình', 'Chính Sách', 'Marketing'];
const types = ['Tất Cả', 'guide', 'video', 'pdf', 'tool'];
const difficulties = ['Tất Cả', 'beginner', 'intermediate', 'advanced'];

export default function SupportResources() {
  const [selectedCategory, setSelectedCategory] = useState('Tất Cả');
  const [selectedType, setSelectedType] = useState('Tất Cả');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Tất Cả');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'Tất Cả' || resource.category === selectedCategory;
    const matchesType = selectedType === 'Tất Cả' || resource.type === selectedType;
    const matchesDifficulty = selectedDifficulty === 'Tất Cả' || resource.difficulty === selectedDifficulty;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesType && matchesDifficulty && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 bg-green-900/30 border-green-700';
      case 'intermediate': return 'text-yellow-400 bg-yellow-900/30 border-yellow-700';
      case 'advanced': return 'text-red-400 bg-red-900/30 border-red-700';
      default: return 'text-gray-400 bg-gray-900/30 border-gray-700';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'Cơ Bản';
      case 'intermediate': return 'Trung Cấp';
      case 'advanced': return 'Nâng Cao';
      default: return difficulty;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'guide': return 'Hướng Dẫn';
      case 'video': return 'Video';
      case 'pdf': return 'PDF';
      case 'tool': return 'Công Cụ';
      default: return type;
    }
  };

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative animate-fade-in-up">
          <input
            type="text"
            placeholder="Tìm kiếm tài liệu, video, công cụ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-100 placeholder-gray-400 transition-all duration-300"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in-up animation-delay-200">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Danh Mục</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-100 transition-all duration-300"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Loại Tài Liệu</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-100 transition-all duration-300"
            >
              {types.map(type => (
                <option key={type} value={type}>
                  {type === 'Tất Cả' ? type : getTypeLabel(type)}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Độ Khó</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-100 transition-all duration-300"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === 'Tất Cả' ? difficulty : getDifficultyLabel(difficulty)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-gray-400 animate-fade-in-up animation-delay-300">
        Tìm thấy {filteredResources.length} tài liệu
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up animation-delay-400">
        {filteredResources.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-400">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-xl">Không tìm thấy tài liệu phù hợp</p>
            <p className="mt-2">Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          </div>
        ) : (
          filteredResources.map((resource, index) => (
            <div
              key={resource.id}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-gray-600 hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{resource.icon}</div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(resource.difficulty)}`}>
                  {getDifficultyLabel(resource.difficulty)}
                </div>
              </div>

              {/* Content */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-100 mb-2">{resource.title}</h3>
                <p className="text-gray-300 text-sm mb-3">{resource.description}</p>
                
                {/* Meta Info */}
                <div className="flex flex-wrap gap-2 text-xs text-gray-400 mb-3">
                  <span className="bg-gray-700/50 px-2 py-1 rounded">{resource.category}</span>
                  <span className="bg-blue-900/30 px-2 py-1 rounded">{getTypeLabel(resource.type)}</span>
                  {resource.duration && (
                    <span className="bg-green-900/30 px-2 py-1 rounded">⏱️ {resource.duration}</span>
                  )}
                  {resource.downloadSize && (
                    <span className="bg-purple-900/30 px-2 py-1 rounded">📦 {resource.downloadSize}</span>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {resource.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs bg-gray-700/30 text-gray-400 px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => window.open(resource.url, '_blank')}
                className="w-full bg-blue-600/80 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
              >
                {resource.type === 'pdf' && <span>📄</span>}
                {resource.type === 'video' && <span>▶️</span>}
                {resource.type === 'guide' && <span>📖</span>}
                {resource.type === 'tool' && <span>🚀</span>}
                <span>
                  {resource.type === 'pdf' ? 'Tải Xuống' : 
                   resource.type === 'video' ? 'Xem Video' :
                   resource.type === 'tool' ? 'Sử Dụng' : 'Xem Chi Tiết'}
                </span>
              </button>
            </div>
          ))
        )}
      </div>

      {/* Quick Links */}
      <div className="bg-blue-900/30 backdrop-blur-sm border border-blue-700/50 rounded-lg p-6 animate-fade-in-up animation-delay-600">
        <h3 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
          <span className="mr-2">⚡</span>
          Liên Kết Nhanh
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/downloads/quick-start-guide.pdf"
            className="flex items-center p-3 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-all duration-300 transform hover:scale-105"
          >
            <span className="text-2xl mr-3">🚀</span>
            <div>
              <div className="font-medium text-gray-100">Quick Start</div>
              <div className="text-sm text-gray-400">Bắt đầu nhanh</div>
            </div>
          </a>
          
          <a
            href="/contact"
            className="flex items-center p-3 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-all duration-300 transform hover:scale-105"
          >
            <span className="text-2xl mr-3">📞</span>
            <div>
              <div className="font-medium text-gray-100">Liên Hệ</div>
              <div className="text-sm text-gray-400">Hỗ trợ trực tiếp</div>
            </div>
          </a>
          
          <a
            href="/dealer-dashboard"
            className="flex items-center p-3 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-all duration-300 transform hover:scale-105"
          >
            <span className="text-2xl mr-3">📊</span>
            <div>
              <div className="font-medium text-gray-100">Dashboard</div>
              <div className="text-sm text-gray-400">Quản lý tài khoản</div>
            </div>
          </a>
          
          <a
            href="/products"
            className="flex items-center p-3 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-all duration-300 transform hover:scale-105"
          >
            <span className="text-2xl mr-3">🎵</span>
            <div>
              <div className="font-medium text-gray-100">Sản Phẩm</div>
              <div className="text-sm text-gray-400">Danh mục đầy đủ</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
