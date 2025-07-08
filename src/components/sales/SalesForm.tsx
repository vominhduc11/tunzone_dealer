'use client';

import { useState } from 'react';

interface SaleItem {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  totalPrice: number;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  customerType: 'individual' | 'business';
  businessName?: string;
  taxCode?: string;
}

interface SaleData {
  customer: CustomerInfo;
  items: SaleItem[];
  paymentMethod: 'cash' | 'card' | 'transfer' | 'installment';
  paymentStatus: 'paid' | 'partial' | 'pending';
  notes: string;
  saleDate: string;
  deliveryDate?: string;
  warrantyPeriod: number;
}

const sampleProducts = [
  { id: '1', name: 'Sony WH-1000XM5', sku: 'SONY-WH1000XM5', price: 8500000 },
  { id: '2', name: 'JBL Charge 5', sku: 'JBL-CHARGE5', price: 3500000 },
  { id: '3', name: 'Bose QuietComfort 45', sku: 'BOSE-QC45', price: 7200000 },
  { id: '4', name: 'Audio-Technica AT2020', sku: 'AT-AT2020', price: 2800000 },
  { id: '5', name: 'Yamaha HS8', sku: 'YAMAHA-HS8', price: 12500000 }
];

export default function SalesForm() {
  const [saleData, setSaleData] = useState<SaleData>({
    customer: {
      name: '',
      email: '',
      phone: '',
      address: '',
      customerType: 'individual',
      businessName: '',
      taxCode: ''
    },
    items: [],
    paymentMethod: 'cash',
    paymentStatus: 'paid',
    notes: '',
    saleDate: new Date().toISOString().split('T')[0],
    deliveryDate: '',
    warrantyPeriod: 12
  });

  const [currentItem, setCurrentItem] = useState<Partial<SaleItem>>({
    productId: '',
    productName: '',
    sku: '',
    quantity: 1,
    unitPrice: 0,
    discount: 0,
    totalPrice: 0
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleCustomerChange = (field: keyof CustomerInfo, value: string) => {
    setSaleData(prev => ({
      ...prev,
      customer: {
        ...prev.customer,
        [field]: value
      }
    }));
  };

  const handleProductSelect = (productId: string) => {
    const product = sampleProducts.find(p => p.id === productId);
    if (product) {
      setCurrentItem(prev => ({
        ...prev,
        productId: product.id,
        productName: product.name,
        sku: product.sku,
        unitPrice: product.price,
        totalPrice: (prev.quantity || 1) * product.price * (1 - (prev.discount || 0) / 100)
      }));
    }
  };

  const handleItemChange = (field: keyof SaleItem, value: number | string) => {
    setCurrentItem(prev => {
      const updated = { ...prev, [field]: value };
      
      // Recalculate total price when quantity, unit price, or discount changes
      if (field === 'quantity' || field === 'unitPrice' || field === 'discount') {
        const quantity = field === 'quantity' ? Number(value) : (updated.quantity || 1);
        const unitPrice = field === 'unitPrice' ? Number(value) : (updated.unitPrice || 0);
        const discount = field === 'discount' ? Number(value) : (updated.discount || 0);
        
        updated.totalPrice = quantity * unitPrice * (1 - discount / 100);
      }
      
      return updated;
    });
  };

  const addItem = () => {
    if (!currentItem.productId || !currentItem.quantity || currentItem.quantity <= 0) {
      alert('Vui lòng chọn sản phẩm và nhập số lượng hợp lệ');
      return;
    }

    const newItem: SaleItem = {
      productId: currentItem.productId!,
      productName: currentItem.productName!,
      sku: currentItem.sku!,
      quantity: currentItem.quantity!,
      unitPrice: currentItem.unitPrice!,
      discount: currentItem.discount || 0,
      totalPrice: currentItem.totalPrice!
    };

    setSaleData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));

    // Reset current item
    setCurrentItem({
      productId: '',
      productName: '',
      sku: '',
      quantity: 1,
      unitPrice: 0,
      discount: 0,
      totalPrice: 0
    });
  };

  const removeItem = (index: number) => {
    setSaleData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const getTotalAmount = () => {
    return saleData.items.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!saleData.customer.name || !saleData.customer.phone || saleData.items.length === 0) {
      alert('Vui lòng điền đầy đủ thông tin khách hàng và thêm ít nhất một sản phẩm');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('Sale data submitted:', saleData);
    setSubmitSuccess(true);
    setIsSubmitting(false);

    // Reset form after success
    setTimeout(() => {
      setSubmitSuccess(false);
      setSaleData({
        customer: {
          name: '',
          email: '',
          phone: '',
          address: '',
          customerType: 'individual',
          businessName: '',
          taxCode: ''
        },
        items: [],
        paymentMethod: 'cash',
        paymentStatus: 'paid',
        notes: '',
        saleDate: new Date().toISOString().split('T')[0],
        deliveryDate: '',
        warrantyPeriod: 12
      });
    }, 3000);
  };

  if (submitSuccess) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-green-400 mb-4">Ghi Nhận Bán Hàng Thành Công!</h2>
        <p className="text-gray-300 mb-6">
          Mã đơn hàng: <span className="font-mono text-blue-400">#TZ-{Date.now().toString().slice(-6)}</span>
        </p>
        <div className="bg-green-900/30 border border-green-700/50 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-green-300 mb-2">📧 Email xác nhận đã được gửi cho khách hàng</p>
          <p className="text-green-300 mb-2">📋 Thông tin đã được lưu vào hệ thống</p>
          <p className="text-green-300">🎯 Hoa hồng sẽ được tính vào cuối tháng</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Customer Information */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 animate-fade-in-up">
          <h3 className="text-xl font-semibold text-gray-100 mb-6 flex items-center">
            <span className="mr-3">👤</span>
            Thông Tin Khách Hàng
          </h3>

          {/* Customer Type */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-200 mb-3">Loại Khách Hàng</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="customerType"
                  value="individual"
                  checked={saleData.customer.customerType === 'individual'}
                  onChange={(e) => handleCustomerChange('customerType', e.target.value)}
                  className="mr-2"
                />
                <span className="text-gray-300">Cá Nhân</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="customerType"
                  value="business"
                  checked={saleData.customer.customerType === 'business'}
                  onChange={(e) => handleCustomerChange('customerType', e.target.value)}
                  className="mr-2"
                />
                <span className="text-gray-300">Doanh Nghiệp</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Tên Khách Hàng *
              </label>
              <input
                type="text"
                required
                value={saleData.customer.name}
                onChange={(e) => handleCustomerChange('name', e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-gray-100 placeholder-gray-400 transition-all duration-300"
                placeholder="Nhập tên khách hàng"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Số Điện Thoại *
              </label>
              <input
                type="tel"
                required
                value={saleData.customer.phone}
                onChange={(e) => handleCustomerChange('phone', e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-gray-100 placeholder-gray-400 transition-all duration-300"
                placeholder="Nhập số điện thoại"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Email
              </label>
              <input
                type="email"
                value={saleData.customer.email}
                onChange={(e) => handleCustomerChange('email', e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-gray-100 placeholder-gray-400 transition-all duration-300"
                placeholder="Nhập email (tùy chọn)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Địa Chỉ
              </label>
              <input
                type="text"
                value={saleData.customer.address}
                onChange={(e) => handleCustomerChange('address', e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-gray-100 placeholder-gray-400 transition-all duration-300"
                placeholder="Nhập địa chỉ"
              />
            </div>

            {saleData.customer.customerType === 'business' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Tên Công Ty
                  </label>
                  <input
                    type="text"
                    value={saleData.customer.businessName}
                    onChange={(e) => handleCustomerChange('businessName', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-gray-100 placeholder-gray-400 transition-all duration-300"
                    placeholder="Nhập tên công ty"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Mã Số Thuế
                  </label>
                  <input
                    type="text"
                    value={saleData.customer.taxCode}
                    onChange={(e) => handleCustomerChange('taxCode', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-gray-100 placeholder-gray-400 transition-all duration-300"
                    placeholder="Nhập mã số thuế"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Product Selection */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 animate-fade-in-up animation-delay-200">
          <h3 className="text-xl font-semibold text-gray-100 mb-6 flex items-center">
            <span className="mr-3">🛍️</span>
            Thêm Sản Phẩm
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Sản Phẩm</label>
              <select
                value={currentItem.productId}
                onChange={(e) => handleProductSelect(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-gray-100 transition-all duration-300"
              >
                <option value="">Chọn sản phẩm...</option>
                {sampleProducts.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name} - ₫{product.price.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Số Lượng</label>
              <input
                type="number"
                min="1"
                value={currentItem.quantity}
                onChange={(e) => handleItemChange('quantity', parseInt(e.target.value) || 1)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-gray-100 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Giảm Giá (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={currentItem.discount}
                onChange={(e) => handleItemChange('discount', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-gray-100 transition-all duration-300"
              />
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={addItem}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
              >
                Thêm
              </button>
            </div>
          </div>

          {currentItem.productId && (
            <div className="bg-indigo-900/20 border border-indigo-700/50 rounded-lg p-4 mb-6">
              <div className="text-indigo-300 text-sm">
                <strong>Thành tiền:</strong> ₫{(currentItem.totalPrice || 0).toLocaleString()}
              </div>
            </div>
          )}
        </div>

        {/* Items List */}
        {saleData.items.length > 0 && (
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 animate-fade-in-up animation-delay-400">
            <h3 className="text-xl font-semibold text-gray-100 mb-6 flex items-center">
              <span className="mr-3">📋</span>
              Danh Sách Sản Phẩm ({saleData.items.length})
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700/50 border-b border-gray-600">
                  <tr>
                    <th className="px-4 py-3 text-left text-gray-200 font-medium">Sản Phẩm</th>
                    <th className="px-4 py-3 text-left text-gray-200 font-medium">Số Lượng</th>
                    <th className="px-4 py-3 text-left text-gray-200 font-medium">Đơn Giá</th>
                    <th className="px-4 py-3 text-left text-gray-200 font-medium">Giảm Giá</th>
                    <th className="px-4 py-3 text-left text-gray-200 font-medium">Thành Tiền</th>
                    <th className="px-4 py-3 text-left text-gray-200 font-medium">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {saleData.items.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-700/30 transition-colors">
                      <td className="px-4 py-4">
                        <div className="font-medium text-gray-100">{item.productName}</div>
                        <div className="text-sm text-gray-400">{item.sku}</div>
                      </td>
                      <td className="px-4 py-4 text-gray-300">{item.quantity}</td>
                      <td className="px-4 py-4 text-gray-300">₫{item.unitPrice.toLocaleString()}</td>
                      <td className="px-4 py-4 text-gray-300">{item.discount}%</td>
                      <td className="px-4 py-4 text-green-400 font-semibold">₫{item.totalPrice.toLocaleString()}</td>
                      <td className="px-4 py-4">
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-right">
              <div className="text-2xl font-bold text-green-400">
                Tổng cộng: ₫{getTotalAmount().toLocaleString()}
              </div>
            </div>
          </div>
        )}

        {/* Payment & Additional Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 animate-fade-in-up animation-delay-600">
            <h3 className="text-xl font-semibold text-gray-100 mb-6 flex items-center">
              <span className="mr-3">💳</span>
              Thông Tin Thanh Toán
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Phương Thức Thanh Toán</label>
                <select
                  value={saleData.paymentMethod}
                  onChange={(e) => setSaleData(prev => ({ ...prev, paymentMethod: e.target.value as any }))}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-gray-100 transition-all duration-300"
                >
                  <option value="cash">Tiền Mặt</option>
                  <option value="card">Thẻ Tín Dụng</option>
                  <option value="transfer">Chuyển Khoản</option>
                  <option value="installment">Trả Góp</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Trạng Thái Thanh Toán</label>
                <select
                  value={saleData.paymentStatus}
                  onChange={(e) => setSaleData(prev => ({ ...prev, paymentStatus: e.target.value as any }))}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-gray-100 transition-all duration-300"
                >
                  <option value="paid">Đã Thanh Toán</option>
                  <option value="partial">Thanh Toán Một Phần</option>
                  <option value="pending">Chưa Thanh Toán</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Thời Gian Bảo Hành (tháng)</label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={saleData.warrantyPeriod}
                  onChange={(e) => setSaleData(prev => ({ ...prev, warrantyPeriod: parseInt(e.target.value) || 12 }))}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-gray-100 transition-all duration-300"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 animate-fade-in-up animation-delay-700">
            <h3 className="text-xl font-semibold text-gray-100 mb-6 flex items-center">
              <span className="mr-3">📅</span>
              Thông Tin Bổ Sung
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Ngày Bán</label>
                <input
                  type="date"
                  value={saleData.saleDate}
                  onChange={(e) => setSaleData(prev => ({ ...prev, saleDate: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-gray-100 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Ngày Giao Hàng (tùy chọn)</label>
                <input
                  type="date"
                  value={saleData.deliveryDate}
                  onChange={(e) => setSaleData(prev => ({ ...prev, deliveryDate: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-gray-100 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Ghi Chú</label>
                <textarea
                  rows={4}
                  value={saleData.notes}
                  onChange={(e) => setSaleData(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-gray-100 placeholder-gray-400 transition-all duration-300 resize-none"
                  placeholder="Ghi chú thêm về đơn hàng..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center animate-fade-in-up animation-delay-800">
          <button
            type="submit"
            disabled={isSubmitting || saleData.items.length === 0}
            className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform ${
              isSubmitting || saleData.items.length === 0
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-indigo-500/25'
            } text-white`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                Đang Lưu Thông Tin...
              </div>
            ) : (
              '💾 Ghi Nhận Bán Hàng'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
