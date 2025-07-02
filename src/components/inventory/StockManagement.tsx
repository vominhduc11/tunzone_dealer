'use client';

import { useState } from 'react';

interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  brand: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unitPrice: number;
  totalValue: number;
  location: string;
  lastUpdated: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'overstock';
  image: string;
}

const products: Product[] = [
  {
    id: '1',
    sku: 'SONY-WH1000XM5',
    name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
    category: 'Tai Nghe',
    brand: 'Sony',
    currentStock: 45,
    minStock: 10,
    maxStock: 100,
    unitPrice: 8500000,
    totalValue: 382500000,
    location: 'Kho A - Kệ A1-01',
    lastUpdated: '2024-01-15 14:30',
    status: 'in_stock',
    image: '🎧'
  },
  {
    id: '2',
    sku: 'BOSE-QC45',
    name: 'Bose QuietComfort 45 Headphones',
    category: 'Tai Nghe',
    brand: 'Bose',
    currentStock: 8,
    minStock: 15,
    maxStock: 80,
    unitPrice: 7200000,
    totalValue: 57600000,
    location: 'Kho A - Kệ A1-02',
    lastUpdated: '2024-01-15 10:15',
    status: 'low_stock',
    image: '🎧'
  },
  {
    id: '3',
    sku: 'JBL-CHARGE5',
    name: 'JBL Charge 5 Portable Bluetooth Speaker',
    category: 'Loa Bluetooth',
    brand: 'JBL',
    currentStock: 0,
    minStock: 20,
    maxStock: 150,
    unitPrice: 3500000,
    totalValue: 0,
    location: 'Kho B - Kệ B2-05',
    lastUpdated: '2024-01-14 16:45',
    status: 'out_of_stock',
    image: '🔊'
  },
  {
    id: '4',
    sku: 'AT-AT2020',
    name: 'Audio-Technica AT2020 Cardioid Condenser Microphone',
    category: 'Microphone',
    brand: 'Audio-Technica',
    currentStock: 85,
    minStock: 10,
    maxStock: 50,
    unitPrice: 2800000,
    totalValue: 238000000,
    location: 'Kho C - Kệ C1-03',
    lastUpdated: '2024-01-15 09:20',
    status: 'overstock',
    image: '🎤'
  },
  {
    id: '5',
    sku: 'YAMAHA-HS8',
    name: 'Yamaha HS8 Powered Studio Monitor',
    category: 'Monitor Speaker',
    brand: 'Yamaha',
    currentStock: 28,
    minStock: 8,
    maxStock: 40,
    unitPrice: 12500000,
    totalValue: 350000000,
    location: 'Kho A - Kệ A3-01',
    lastUpdated: '2024-01-15 11:30',
    status: 'in_stock',
    image: '🔈'
  }
];

export default function StockManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showStockModal, setShowStockModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [stockAdjustment, setStockAdjustment] = useState({
    type: 'add',
    quantity: 0,
    reason: '',
    notes: ''
  });

  const categories = ['all', 'Tai Nghe', 'Loa Bluetooth', 'Microphone', 'Monitor Speaker'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock': return 'text-green-400 bg-green-900/30 border-green-700';
      case 'low_stock': return 'text-yellow-400 bg-yellow-900/30 border-yellow-700';
      case 'out_of_stock': return 'text-red-400 bg-red-900/30 border-red-700';
      case 'overstock': return 'text-blue-400 bg-blue-900/30 border-blue-700';
      default: return 'text-gray-400 bg-gray-900/30 border-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'in_stock': return 'Còn Hàng';
      case 'low_stock': return 'Sắp Hết';
      case 'out_of_stock': return 'Hết Hàng';
      case 'overstock': return 'Thừa Hàng';
      default: return status;
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'stock':
        aValue = a.currentStock;
        bValue = b.currentStock;
        break;
      case 'value':
        aValue = a.totalValue;
        bValue = b.totalValue;
        break;
      case 'updated':
        aValue = new Date(a.lastUpdated).getTime();
        bValue = new Date(b.lastUpdated).getTime();
        break;
      default:
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === sortedProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(sortedProducts.map(p => p.id));
    }
  };

  const handleStockAdjustment = (product: Product) => {
    setSelectedProduct(product);
    setShowStockModal(true);
    setStockAdjustment({
      type: 'add',
      quantity: 0,
      reason: '',
      notes: ''
    });
  };

  const submitStockAdjustment = () => {
    console.log('Stock adjustment:', {
      product: selectedProduct,
      adjustment: stockAdjustment
    });
    setShowStockModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-gray-100">Quản Lý Tồn Kho</h2>
        <div className="flex flex-wrap gap-2">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
            <span>📥</span>
            <span>Nhập Kho</span>
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
            <span>📤</span>
            <span>Xuất Kho</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
            <span>📊</span>
            <span>Xuất Excel</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 animate-fade-in-up animation-delay-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-gray-100 placeholder-gray-400 transition-all duration-300"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-gray-100 transition-all duration-300"
          >
            <option value="all">Tất Cả Danh Mục</option>
            {categories.slice(1).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-gray-100 transition-all duration-300"
          >
            <option value="all">Tất Cả Trạng Thái</option>
            <option value="in_stock">Còn Hàng</option>
            <option value="low_stock">Sắp Hết</option>
            <option value="out_of_stock">Hết Hàng</option>
            <option value="overstock">Thừa Hàng</option>
          </select>

          {/* Sort */}
          <div className="flex space-x-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-gray-100 transition-all duration-300"
            >
              <option value="name">Tên Sản Phẩm</option>
              <option value="stock">Số Lượng</option>
              <option value="value">Giá Trị</option>
              <option value="updated">Cập Nhật</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg hover:bg-gray-600/50 text-gray-300 transition-all duration-300"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedProducts.length > 0 && (
          <div className="flex items-center justify-between bg-purple-900/30 border border-purple-700/50 rounded-lg p-4">
            <span className="text-purple-300">
              Đã chọn {selectedProducts.length} sản phẩm
            </span>
            <div className="flex space-x-2">
              <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors">
                Nhập Kho Hàng Loạt
              </button>
              <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors">
                Xuất Kho Hàng Loạt
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                Cập Nhật Giá
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Products Table */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden animate-fade-in-up animation-delay-400">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50 border-b border-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === sortedProducts.length && sortedProducts.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500"
                  />
                </th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Sản Phẩm</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Tồn Kho</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Giá Trị</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Vị Trí</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Trạng Thái</th>
                <th className="px-4 py-3 text-left text-gray-200 font-medium">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {sortedProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleSelectProduct(product.id)}
                      className="rounded border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{product.image}</div>
                      <div>
                        <div className="font-medium text-gray-100">{product.name}</div>
                        <div className="text-sm text-gray-400">{product.sku} • {product.brand}</div>
                        <div className="text-xs text-gray-500">{product.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-gray-100 font-medium">{product.currentStock}</div>
                    <div className="text-xs text-gray-400">
                      Min: {product.minStock} | Max: {product.maxStock}
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                      <div 
                        className={`h-1.5 rounded-full ${
                          product.currentStock <= product.minStock ? 'bg-red-500' :
                          product.currentStock >= product.maxStock ? 'bg-blue-500' : 'bg-green-500'
                        }`}
                        style={{ 
                          width: `${Math.min((product.currentStock / product.maxStock) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-gray-100 font-medium">
                      ₫{product.totalValue.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400">
                      ₫{product.unitPrice.toLocaleString()}/unit
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-gray-300 text-sm">{product.location}</div>
                    <div className="text-xs text-gray-400">
                      Cập nhật: {new Date(product.lastUpdated).toLocaleDateString('vi-VN')}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.status)}`}>
                      {getStatusLabel(product.status)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleStockAdjustment(product)}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                        title="Điều chỉnh tồn kho"
                      >
                        ⚖️
                      </button>
                      <button
                        className="text-green-400 hover:text-green-300 transition-colors"
                        title="Nhập kho"
                      >
                        📥
                      </button>
                      <button
                        className="text-red-400 hover:text-red-300 transition-colors"
                        title="Xuất kho"
                      >
                        📤
                      </button>
                      <button
                        className="text-gray-400 hover:text-gray-300 transition-colors"
                        title="Chi tiết"
                      >
                        👁️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-xl">Không tìm thấy sản phẩm</p>
            <p className="mt-2">Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          </div>
        )}
      </div>

      {/* Stock Adjustment Modal */}
      {showStockModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">
              Điều Chỉnh Tồn Kho
            </h3>
            
            <div className="mb-4">
              <div className="text-gray-300 font-medium">{selectedProduct.name}</div>
              <div className="text-sm text-gray-400">
                Tồn kho hiện tại: {selectedProduct.currentStock} units
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Loại Điều Chỉnh
                </label>
                <select
                  value={stockAdjustment.type}
                  onChange={(e) => setStockAdjustment(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 text-gray-100"
                >
                  <option value="add">Tăng Tồn Kho</option>
                  <option value="subtract">Giảm Tồn Kho</option>
                  <option value="set">Đặt Tồn Kho</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Số Lượng
                </label>
                <input
                  type="number"
                  value={stockAdjustment.quantity}
                  onChange={(e) => setStockAdjustment(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 text-gray-100"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Lý Do
                </label>
                <select
                  value={stockAdjustment.reason}
                  onChange={(e) => setStockAdjustment(prev => ({ ...prev, reason: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 text-gray-100"
                >
                  <option value="">Chọn lý do...</option>
                  <option value="inventory_count">Kiểm kê định kỳ</option>
                  <option value="damaged">Hàng hỏng</option>
                  <option value="lost">Mất hàng</option>
                  <option value="return">Hàng trả lại</option>
                  <option value="correction">Điều chỉnh sai số</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Ghi Chú
                </label>
                <textarea
                  value={stockAdjustment.notes}
                  onChange={(e) => setStockAdjustment(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 text-gray-100 resize-none"
                  placeholder="Ghi chú thêm (tùy chọn)..."
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={submitStockAdjustment}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Xác Nhận
              </button>
              <button
                onClick={() => setShowStockModal(false)}
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
