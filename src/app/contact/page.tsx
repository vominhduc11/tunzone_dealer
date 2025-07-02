'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message! We will get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      inquiryType: 'general'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 shadow-lg animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-up">Liên Hệ Với Chúng Tôi</h1>
          <p className="text-xl max-w-3xl mx-auto animate-slide-up animation-delay-200">
            Liên hệ với đội ngũ của chúng tôi để được hỗ trợ, giải đáp thắc mắc hoặc cơ hội hợp tác
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in animation-delay-300">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="animate-slide-right">
            <h2 className="text-3xl font-bold text-gray-100 mb-8">Liên Hệ</h2>
            
            <div className="space-y-6">
              <div className="flex items-start p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg hover:border-gray-600 transition-all duration-300 hover:shadow-lg animate-fade-in-up animation-delay-400">
                <div className="text-2xl mr-4 animate-bounce" style={{animationDelay: '0.5s'}}>📍</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-100">Trụ Sở Chính</h3>
                  <p className="text-gray-300">
                    123 Audio Drive<br />
                    Los Angeles, CA 90210<br />
                    Hoa Kỳ
                  </p>
                </div>
              </div>

              <div className="flex items-start p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg hover:border-gray-600 transition-all duration-300 hover:shadow-lg animate-fade-in-up animation-delay-500">
                <div className="text-2xl mr-4 animate-bounce" style={{animationDelay: '0.6s'}}>📞</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-100">Phone</h3>
                  <p className="text-gray-300">
                    <a href="tel:1-800-TUNEZONE" className="hover:text-blue-400 transition-colors">
                      1-800-TUNEZONE (1-800-886-3966)
                    </a>
                  </p>
                  <p className="text-sm text-gray-400">Monday - Friday: 8AM - 8PM PST</p>
                </div>
              </div>

              <div className="flex items-start p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg hover:border-gray-600 transition-all duration-300 hover:shadow-lg animate-fade-in-up animation-delay-600">
                <div className="text-2xl mr-4 animate-bounce" style={{animationDelay: '0.7s'}}>✉️</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-100">Email</h3>
                  <p className="text-gray-300">
                    <a href="mailto:info@tunezone.com" className="hover:text-blue-400 transition-colors">
                      info@tunezone.com
                    </a>
                  </p>
                  <p className="text-sm text-gray-400">We respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg hover:border-gray-600 transition-all duration-300 hover:shadow-lg animate-fade-in-up animation-delay-700">
                <div className="text-2xl mr-4 animate-bounce" style={{animationDelay: '0.8s'}}>🕒</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-100">Business Hours</h3>
                  <div className="text-gray-300 space-y-1">
                    <p>Monday - Friday: 8:00 AM - 8:00 PM PST</p>
                    <p>Saturday: 9:00 AM - 6:00 PM PST</p>
                    <p>Sunday: 10:00 AM - 4:00 PM PST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Options */}
            <div className="mt-8 p-6 bg-blue-900/30 backdrop-blur-sm border border-blue-700/50 rounded-lg animate-scale-in animation-delay-800">
              <h3 className="text-lg font-semibold text-gray-100 mb-4">Quick Contact</h3>
              <div className="space-y-3">
                <div>
                  <strong className="text-gray-200">Customer Support:</strong>
                  <a href="tel:1-800-TUNEZONE" className="ml-2 text-blue-400 hover:text-blue-300 hover:underline transition-colors">
                    1-800-TUNEZONE
                  </a>
                </div>
                <div>
                  <strong className="text-gray-200">Technical Support:</strong>
                  <a href="tel:1-800-TECH123" className="ml-2 text-blue-400 hover:text-blue-300 hover:underline transition-colors">
                    1-800-TECH123
                  </a>
                </div>
                <div>
                  <strong className="text-gray-200">Sales Inquiries:</strong>
                  <a href="mailto:sales@tunezone.com" className="ml-2 text-blue-400 hover:text-blue-300 hover:underline transition-colors">
                    sales@tunezone.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl p-8 hover:shadow-2xl hover:border-gray-600 transition-all duration-300 animate-slide-left animation-delay-400">
            <h2 className="text-2xl font-bold text-gray-100 mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="animate-fade-in-up animation-delay-500">
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Inquiry Type
                </label>
                <select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-700/50 backdrop-blur-sm text-gray-100 transition-all duration-300 hover:border-gray-500 focus:scale-105"
                >
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="sales">Sales Question</option>
                  <option value="billing">Billing Question</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="complaint">Complaint</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="animate-fade-in-up animation-delay-600">
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-700/50 backdrop-blur-sm text-gray-100 placeholder-gray-400 transition-all duration-300 hover:border-gray-500 focus:scale-105"
                  />
                </div>
                <div className="animate-fade-in-up animation-delay-700">
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-700/50 backdrop-blur-sm text-gray-100 placeholder-gray-400 transition-all duration-300 hover:border-gray-500 focus:scale-105"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="animate-fade-in-up animation-delay-800">
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-700/50 backdrop-blur-sm text-gray-100 placeholder-gray-400 transition-all duration-300 hover:border-gray-500 focus:scale-105"
                  />
                </div>
                <div className="animate-fade-in-up animation-delay-900">
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-700/50 backdrop-blur-sm text-gray-100 placeholder-gray-400 transition-all duration-300 hover:border-gray-500 focus:scale-105"
                  />
                </div>
              </div>

              <div className="animate-fade-in-up animation-delay-1000">
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Please provide details about your inquiry..."
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-700/50 backdrop-blur-sm text-gray-100 placeholder-gray-400 transition-all duration-300 hover:border-gray-500 focus:scale-105 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600/80 border border-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-blue-500/25 animate-fade-in-up animation-delay-1100"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Separator before footer */}
      <div className="border-t border-gray-600 mx-4 sm:mx-6 lg:mx-8 mt-8"></div>

      <Footer />
    </div>
  );
}
