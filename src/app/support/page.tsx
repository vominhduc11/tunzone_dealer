'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQSection from '@/components/support/FAQSection';
import TicketForm from '@/components/support/TicketForm';
import SupportResources from '@/components/support/SupportResources';
import LiveChat from '@/components/support/LiveChat';

export default function Support() {
  const [activeTab, setActiveTab] = useState('faq');

  const tabs = [
    { id: 'faq', label: 'Câu Hỏi Thường Gặp', icon: '❓' },
    { id: 'ticket', label: 'Tạo Ticket Hỗ Trợ', icon: '🎫' },
    { id: 'resources', label: 'Tài Liệu Hỗ Trợ', icon: '📚' },
    { id: 'chat', label: 'Chat Trực Tiếp', icon: '💬' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 shadow-lg animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-up">
            Trung Tâm Hỗ Trợ
          </h1>
          <p className="text-xl max-w-3xl mx-auto animate-slide-up animation-delay-200">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7. Tìm câu trả lời nhanh chóng hoặc liên hệ trực tiếp với đội ngũ chuyên gia của chúng tôi.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gray-700/50 rounded-lg border border-gray-600 hover:border-gray-500 transition-all duration-300 animate-fade-in-up">
              <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-gray-300">Hỗ Trợ Liên Tục</div>
            </div>
            <div className="text-center p-6 bg-gray-700/50 rounded-lg border border-gray-600 hover:border-gray-500 transition-all duration-300 animate-fade-in-up animation-delay-200">
              <div className="text-3xl font-bold text-green-400 mb-2">&lt;2h</div>
              <div className="text-gray-300">Thời Gian Phản Hồi</div>
            </div>
            <div className="text-center p-6 bg-gray-700/50 rounded-lg border border-gray-600 hover:border-gray-500 transition-all duration-300 animate-fade-in-up animation-delay-400">
              <div className="text-3xl font-bold text-purple-400 mb-2">98%</div>
              <div className="text-gray-300">Tỷ Lệ Hài Lòng</div>
            </div>
            <div className="text-center p-6 bg-gray-700/50 rounded-lg border border-gray-600 hover:border-gray-500 transition-all duration-300 animate-fade-in-up animation-delay-600">
              <div className="text-3xl font-bold text-orange-400 mb-2">500+</div>
              <div className="text-gray-300">Câu Hỏi Được Giải Đáp</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-12 animate-fade-in animation-delay-300">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-2 inline-flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in animation-delay-500">
          {activeTab === 'faq' && <FAQSection />}
          {activeTab === 'ticket' && <TicketForm />}
          {activeTab === 'resources' && <SupportResources />}
          {activeTab === 'chat' && <LiveChat />}
        </div>
      </div>

      {/* Emergency Contact */}
      <section className="bg-red-900/20 border-t border-red-700/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">🚨 Hỗ Trợ Khẩn Cấp</h2>
          <p className="text-gray-300 mb-6">
            Nếu bạn gặp sự cố nghiêm trọng ảnh hưởng đến hoạt động kinh doanh, vui lòng liên hệ ngay:
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <a
              href="tel:1-800-EMERGENCY"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <span>📞</span>
              <span>1-800-EMERGENCY</span>
            </a>
            <a
              href="mailto:emergency@tunezone.com"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <span>✉️</span>
              <span>emergency@tunezone.com</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
