'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useProducts, Product } from '@/contexts/ProductContext';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

export default function ProductDetail() {
  const params = useParams();
  const { user } = useAuth();
  const { products } = useProducts();
  const { addToCart, isInCart, getCartItem } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id && products.length > 0) {
      const foundProduct = products.find(p => p.id === params.id);
      if (foundProduct) {
        setProduct(foundProduct);
        setQuantity(Math.max(foundProduct.minOrderQty, 1));
      }
      setLoading(false);
    }
  }, [params.id, products]);

  const handleAddToCart = () => {
    if (!product) return;
    
    if (user?.isGuest) {
      alert('Vui lòng đăng nhập với tài khoản đại lý để thêm sản phẩm vào giỏ hàng');
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      wholesalePrice: product.wholesalePrice,
      image: product.images[0],
      category: product.category,
      sku: product.sku,
      minOrderQty: product.minOrderQty,
      maxOrderQty: product.maxOrderQty,
      inStock: product.inStock
    }, quantity);
  };

  const generateQuantityOptions = () => {
    if (!product) return [];
    const minQty = product.minOrderQty;
    const maxQty = Math.min(product.maxOrderQty || 50, minQty + 19);
    const options = [];
    
    for (let qty = minQty; qty <= maxQty; qty++) {
      options.push(
        <option key={qty} value={qty}>
          {qty}
        </option>
      );
    }
    
    return options;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-3xl font-bold text-white mb-4">Không tìm thấy sản phẩm</h1>
          <p className="text-gray-300 mb-8">Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <Link 
            href="/products"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Quay lại danh sách sản phẩm
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const cartItem = getCartItem(product.id);
  const isProductInCart = isInCart(product.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex text-sm text-gray-400">
          <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-white transition-colors">Sản phẩm</Link>
          <span className="mx-2">/</span>
          <span className="text-white">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === index 
                        ? 'border-blue-500 ring-2 ring-blue-500/50' 
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-600'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-gray-300">({product.rating})</span>
                </div>
                <span className="text-gray-400">SKU: {product.sku}</span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              {!user?.isGuest && (
                <div className="text-3xl font-bold text-green-400">
                  {product.wholesalePrice.toLocaleString('vi-VN')}₫
                  <span className="text-sm text-gray-400 ml-2">(Giá bán sỉ)</span>
                </div>
              )}
              <div className={`text-xl ${!user?.isGuest ? 'text-gray-400 line-through' : 'text-white font-bold'}`}>
                Giá lẻ: {product.price.toLocaleString('vi-VN')}₫
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                product.inStock > 0 
                  ? 'bg-green-900/50 text-green-300 border border-green-700' 
                  : 'bg-red-900/50 text-red-300 border border-red-700'
              }`}>
                {product.inStock > 0 ? `Còn hàng (${product.inStock})` : 'Hết hàng'}
              </div>
            </div>

            {/* Order Quantity Info */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Thông tin đặt hàng</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div>Số lượng tối thiểu: <span className="text-white font-medium">{product.minOrderQty}</span></div>
                <div>Số lượng tối đa: <span className="text-white font-medium">{product.maxOrderQty || 'Không giới hạn'}</span></div>
              </div>
            </div>

            {/* Add to Cart */}
            {product.inStock > 0 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="text-white font-medium">Số lượng:</label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {generateQuantityOptions()}
                  </select>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={user?.isGuest}
                    className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                      user?.isGuest
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 active:scale-95'
                    }`}
                  >
                    {isProductInCart ? `Đã có trong giỏ (${cartItem?.quantity})` : 'Thêm vào giỏ hàng'}
                  </button>
                  
                  <button className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 hover:text-white transition-colors duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                {user?.isGuest && (
                  <p className="text-yellow-400 text-sm">
                    Vui lòng đăng nhập với tài khoản đại lý để thêm sản phẩm vào giỏ hàng
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-700">
            <nav className="flex space-x-8">
              {[
                { id: 'description', label: 'Mô tả sản phẩm' },
                { id: 'specifications', label: 'Thông số kỹ thuật' },
                { id: 'reviews', label: 'Đánh giá' },
                { id: 'warranty', label: 'Bảo hành' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose prose-invert max-w-none">
                <div className="text-gray-300 leading-relaxed">
                  {product.description || 'Chưa có mô tả chi tiết cho sản phẩm này.'}
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Thông số cơ bản</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Thương hiệu:</span>
                      <span className="text-white">{product.brand || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Model:</span>
                      <span className="text-white">{product.model || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Trọng lượng:</span>
                      <span className="text-white">{product.weight ? `${product.weight} kg` : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Kích thước:</span>
                      <span className="text-white">
                        {product.dimensions 
                          ? `${product.dimensions.length} x ${product.dimensions.width} x ${product.dimensions.height} cm`
                          : 'N/A'
                        }
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Thông số kỹ thuật</h3>
                  <div className="space-y-3">
                    {product.specifications ? (
                      Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-400 capitalize">{key}:</span>
                          <span className="text-white">{value}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400">Chưa có thông số kỹ thuật chi tiết.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Đánh giá từ khách hàng</h3>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="text-3xl font-bold text-white">{product.rating}</div>
                    <div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-600'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <div className="text-gray-400 text-sm">Dựa trên đánh giá của khách hàng</div>
                    </div>
                  </div>
                  <p className="text-gray-400">Chức năng đánh giá chi tiết sẽ được cập nhật trong phiên bản tiếp theo.</p>
                </div>
              </div>
            )}

            {activeTab === 'warranty' && (
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Thông tin bảo hành</h3>
                <div className="space-y-4 text-gray-300">
                  <div>
                    <h4 className="font-medium text-white mb-2">Thời gian bảo hành:</h4>
                    <p>
                      {product.warranty && typeof product.warranty === 'object' 
                        ? `${product.warranty.duration} tháng` 
                        : product.warranty || '12 tháng'}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">Loại bảo hành:</h4>
                    <p>
                      {product.warranty && typeof product.warranty === 'object' 
                        ? product.warranty.type 
                        : 'Bảo hành tiêu chuẩn'}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">Phạm vi bảo hành:</h4>
                    {product.warranty && typeof product.warranty === 'object' && product.warranty.coverage ? (
                      <ul className="list-disc list-inside space-y-1">
                        {product.warranty.coverage.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <ul className="list-disc list-inside space-y-1">
                        <li>Lỗi sản xuất</li>
                        <li>Lỗi vật liệu</li>
                      </ul>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">Điều kiện bảo hành:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Sản phẩm còn trong thời hạn bảo hành</li>
                      <li>Có hóa đơn mua hàng hợp lệ</li>
                      <li>Không có dấu hiệu tác động vật lý từ bên ngoài</li>
                      <li>Không tự ý sửa chữa hoặc can thiệp vào sản phẩm</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">Liên hệ bảo hành:</h4>
                    <p>Hotline: 1900-xxxx hoặc email: warranty@tunezone.com</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
