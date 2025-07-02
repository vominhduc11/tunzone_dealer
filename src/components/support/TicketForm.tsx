'use client';

import { useState } from 'react';

interface TicketFormData {
  subject: string;
  category: string;
  priority: string;
  description: string;
  attachments: File[];
  contactMethod: string;
  orderNumber?: string;
  productModel?: string;
}

export default function TicketForm() {
  const [formData, setFormData] = useState<TicketFormData>({
    subject: '',
    category: '',
    priority: 'medium',
    description: '',
    attachments: [],
    contactMethod: 'email',
    orderNumber: '',
    productModel: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const categories = [
    { value: '', label: 'Chọn danh mục...' },
    { value: 'technical', label: '🔧 Hỗ Trợ Kỹ Thuật' },
    { value: 'order', label: '📦 Vấn Đề Đơn Hàng' },
    { value: 'payment', label: '💳 Thanh Toán & Billing' },
    { value: 'shipping', label: '🚚 Vận Chuyển & Giao Hàng' },
    { value: 'warranty', label: '🛡️ Bảo Hành & Đổi Trả' },
    { value: 'account', label: '👤 Tài Khoản & Đăng Ký' },
    { value: 'product', label: '🎵 Thông Tin Sản Phẩm' },
    { value: 'other', label: '❓ Khác' }
  ];

  const priorities = [
    { value: 'low', label: '🟢 Thấp', desc: 'Không ảnh hưởng đến hoạt động' },
    { value: 'medium', label: '🟡 Trung Bình', desc: 'Ảnh hưởng nhẹ đến hoạt động' },
    { value: 'high', label: '🟠 Cao', desc: 'Ảnh hưởng đáng kể đến hoạt động' },
    { value: 'urgent', label: '🔴 Khẩn Cấp', desc: 'Ngừng hoạt động hoàn toàn' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...files]
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('Ticket submitted:', formData);
    setSubmitSuccess(true);
    setIsSubmitting(false);

    // Reset form after success
    setTimeout(() => {
      setSubmitSuccess(false);
      setFormData({
        subject: '',
        category: '',
        priority: 'medium',
        description: '',
        attachments: [],
        contactMethod: 'email',
        orderNumber: '',
        productModel: ''
      });
    }, 3000);
  };

  if (submitSuccess) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-green-400 mb-4">Ticket Đã Được Tạo Thành Công!</h2>
        <p className="text-gray-300 mb-6">
          Mã ticket của bạn là: <span className="font-mono text-blue-400">#TZ-{Date.now().toString().slice(-6)}</span>
        </p>
        <div className="bg-green-900/30 border border-green-700/50 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-green-300 mb-2">📧 Email xác nhận đã được gửi</p>
          <p className="text-green-300 mb-2">⏱️ Thời gian phản hồi dự kiến: 2-4 giờ</p>
          <p className="text-green-300">📱 Bạn sẽ nhận được thông báo khi có cập nhật</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-gray-100 mb-6 flex items-center">
          <span className="mr-3">🎫</span>
          Tạo Ticket Hỗ Trợ
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Subject and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="animate-fade-in-up animation-delay-200">
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Tiêu Đề *
              </label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Mô tả ngắn gọn vấn đề của bạn"
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-100 placeholder-gray-400 transition-all duration-300"
              />
            </div>

            <div className="animate-fade-in-up animation-delay-300">
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Danh Mục *
              </label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-100 transition-all duration-300"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Priority */}
          <div className="animate-fade-in-up animation-delay-400">
            <label className="block text-sm font-medium text-gray-200 mb-3">
              Mức Độ Ưu Tiên *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {priorities.map(priority => (
                <label
                  key={priority.value}
                  className={`cursor-pointer p-4 border rounded-lg transition-all duration-300 ${
                    formData.priority === priority.value
                      ? 'border-blue-500 bg-blue-900/30'
                      : 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
                  }`}
                >
                  <input
                    type="radio"
                    name="priority"
                    value={priority.value}
                    checked={formData.priority === priority.value}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="font-medium text-gray-100 mb-1">{priority.label}</div>
                    <div className="text-xs text-gray-400">{priority.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Optional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="animate-fade-in-up animation-delay-500">
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Số Đơn Hàng (nếu có)
              </label>
              <input
                type="text"
                name="orderNumber"
                value={formData.orderNumber}
                onChange={handleInputChange}
                placeholder="VD: TZ-2024-001234"
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-100 placeholder-gray-400 transition-all duration-300"
              />
            </div>

            <div className="animate-fade-in-up animation-delay-600">
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Model Sản Phẩm (nếu có)
              </label>
              <input
                type="text"
                name="productModel"
                value={formData.productModel}
                onChange={handleInputChange}
                placeholder="VD: Sony XM4, Bose QC45"
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-100 placeholder-gray-400 transition-all duration-300"
              />
            </div>
          </div>

          {/* Description */}
          <div className="animate-fade-in-up animation-delay-700">
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Mô Tả Chi Tiết *
            </label>
            <textarea
              name="description"
              required
              rows={6}
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Vui lòng mô tả chi tiết vấn đề bạn gặp phải, các bước đã thực hiện, và kết quả mong muốn..."
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-100 placeholder-gray-400 transition-all duration-300 resize-none"
            />
          </div>

          {/* File Attachments */}
          <div className="animate-fade-in-up animation-delay-800">
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Đính Kèm File (Tùy chọn)
            </label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 transition-all duration-300">
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.txt"
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="text-4xl mb-2">📎</div>
                <p className="text-gray-300 mb-1">Nhấp để chọn file hoặc kéo thả vào đây</p>
                <p className="text-sm text-gray-400">Hỗ trợ: JPG, PNG, PDF, DOC, TXT (Max 10MB mỗi file)</p>
              </label>
            </div>

            {/* File List */}
            {formData.attachments.length > 0 && (
              <div className="mt-4 space-y-2">
                {formData.attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-700/50 p-3 rounded-lg">
                    <div className="flex items-center">
                      <span className="mr-2">📄</span>
                      <span className="text-gray-300">{file.name}</span>
                      <span className="text-sm text-gray-400 ml-2">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      ❌
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contact Method */}
          <div className="animate-fade-in-up animation-delay-900">
            <label className="block text-sm font-medium text-gray-200 mb-3">
              Phương Thức Liên Hệ Ưu Tiên
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { value: 'email', label: '📧 Email', desc: 'Phản hồi qua email' },
                { value: 'phone', label: '📞 Điện Thoại', desc: 'Gọi điện trực tiếp' },
                { value: 'chat', label: '💬 Chat', desc: 'Chat trực tiếp' }
              ].map(method => (
                <label
                  key={method.value}
                  className={`cursor-pointer p-4 border rounded-lg transition-all duration-300 ${
                    formData.contactMethod === method.value
                      ? 'border-blue-500 bg-blue-900/30'
                      : 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
                  }`}
                >
                  <input
                    type="radio"
                    name="contactMethod"
                    value={method.value}
                    checked={formData.contactMethod === method.value}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="font-medium text-gray-100 mb-1">{method.label}</div>
                    <div className="text-xs text-gray-400">{method.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="animate-fade-in-up animation-delay-1000">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 transform ${
                isSubmitting
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-blue-500/25'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Đang Gửi Ticket...
                </div>
              ) : (
                '🚀 Gửi Ticket Hỗ Trợ'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
