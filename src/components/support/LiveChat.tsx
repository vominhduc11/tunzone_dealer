'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  type?: 'text' | 'image' | 'file';
}

interface Agent {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'busy' | 'offline';
  specialization: string;
}

const agents: Agent[] = [
  {
    id: '1',
    name: 'Minh Anh',
    avatar: '👩‍💼',
    status: 'online',
    specialization: 'Hỗ trợ chung'
  },
  {
    id: '2',
    name: 'Đức Thành',
    avatar: '👨‍🔧',
    status: 'online',
    specialization: 'Kỹ thuật âm thanh'
  },
  {
    id: '3',
    name: 'Thu Hà',
    avatar: '👩‍💻',
    status: 'busy',
    specialization: 'Đơn hàng & Thanh toán'
  }
];

const quickReplies = [
  'Tôi cần hỗ trợ về đơn hàng',
  'Vấn đề kỹ thuật sản phẩm',
  'Hỏi về giá bán sỉ',
  'Chính sách bảo hành',
  'Cách trở thành nhà phân phối'
];

export default function LiveChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Xin chào! Tôi là Minh Anh từ đội hỗ trợ TuneZone. Tôi có thể giúp gì cho bạn hôm nay?',
      sender: 'agent',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentAgent, setCurrentAgent] = useState(agents[0]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const connectToChat = () => {
    setIsConnected(true);
    // Simulate connection delay
    setTimeout(() => {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: 'Kết nối thành công! Tôi đã sẵn sàng hỗ trợ bạn. Bạn có thể gõ câu hỏi hoặc chọn một trong các chủ đề phổ biến bên dưới.',
        sender: 'agent',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, welcomeMessage]);
    }, 1000);
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate agent typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const agentResponse = generateAgentResponse(text);
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: agentResponse,
        sender: 'agent',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, agentMessage]);
    }, 1500 + Math.random() * 2000);
  };

  const generateAgentResponse = (userText: string): string => {
    const lowerText = userText.toLowerCase();
    
    if (lowerText.includes('đơn hàng') || lowerText.includes('order')) {
      return 'Tôi sẽ giúp bạn kiểm tra thông tin đơn hàng. Bạn có thể cung cấp mã đơn hàng hoặc email đã đặt hàng không? Hoặc bạn có thể truy cập trang "Đơn Hàng Của Tôi" trong dashboard để xem chi tiết.';
    }
    
    if (lowerText.includes('giá') || lowerText.includes('price')) {
      return 'Về vấn đề giá cả, giá bán sỉ sẽ hiển thị sau khi bạn đăng nhập với tài khoản nhà phân phối. Chúng tôi có nhiều mức giá ưu đãi dựa trên số lượng đặt hàng. Bạn đã có tài khoản nhà phân phối chưa?';
    }
    
    if (lowerText.includes('kỹ thuật') || lowerText.includes('technical')) {
      setCurrentAgent(agents[1]); // Switch to technical agent
      return 'Tôi sẽ chuyển bạn sang chuyên viên kỹ thuật Đức Thành. Anh ấy sẽ hỗ trợ bạn về các vấn đề kỹ thuật. Bạn gặp vấn đề gì với sản phẩm?';
    }
    
    if (lowerText.includes('bảo hành') || lowerText.includes('warranty')) {
      return 'Về chính sách bảo hành: Tất cả sản phẩm đều có bảo hành chính hãng 12-24 tháng. Chúng tôi hỗ trợ đổi mới trong 7 ngày đầu nếu có lỗi kỹ thuật. Bạn cần hỗ trợ bảo hành cho sản phẩm nào?';
    }
    
    if (lowerText.includes('nhà phân phối') || lowerText.includes('dealer')) {
      return 'Để trở thành nhà phân phối TuneZone, bạn cần: 1) Có giấy phép kinh doanh hợp lệ, 2) Điền form đăng ký tại website, 3) Chờ phê duyệt 2-3 ngày. Sau khi được phê duyệt, bạn sẽ được hưởng giá bán sỉ ưu đãi. Bạn muốn tôi hướng dẫn chi tiết không?';
    }
    
    return 'Cảm ơn bạn đã liên hệ! Tôi đã ghi nhận yêu cầu của bạn. Để hỗ trợ tốt hơn, bạn có thể cung cấp thêm thông tin chi tiết không? Hoặc bạn có thể tạo ticket hỗ trợ để được xử lý chuyên sâu hơn.';
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileMessage: Message = {
        id: Date.now().toString(),
        text: `Đã gửi file: ${file.name}`,
        sender: 'user',
        timestamp: new Date(),
        type: 'file'
      };
      setMessages(prev => [...prev, fileMessage]);
      
      // Simulate agent response to file
      setTimeout(() => {
        const agentMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Tôi đã nhận được file của bạn. Đang xem xét và sẽ phản hồi trong giây lát...',
          sender: 'agent',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, agentMessage]);
      }, 1000);
    }
  };

  if (!isConnected) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 text-center animate-fade-in-up">
          <div className="text-6xl mb-6">💬</div>
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Chat Trực Tiếp với Chuyên Viên</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Kết nối ngay với đội ngũ hỗ trợ chuyên nghiệp của chúng tôi. 
            Chúng tôi sẵn sàng giải đáp mọi thắc mắc và hỗ trợ bạn 24/7.
          </p>

          {/* Available Agents */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-200 mb-4">Chuyên Viên Đang Trực</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {agents.map(agent => (
                <div key={agent.id} className="bg-gray-700/50 border border-gray-600 rounded-lg p-4">
                  <div className="text-3xl mb-2">{agent.avatar}</div>
                  <div className="font-medium text-gray-100">{agent.name}</div>
                  <div className="text-sm text-gray-400 mb-2">{agent.specialization}</div>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                    agent.status === 'online' ? 'bg-green-900/30 text-green-400' :
                    agent.status === 'busy' ? 'bg-yellow-900/30 text-yellow-400' :
                    'bg-gray-900/30 text-gray-400'
                  }`}>
                    <div className={`w-2 h-2 rounded-full mr-1 ${
                      agent.status === 'online' ? 'bg-green-400' :
                      agent.status === 'busy' ? 'bg-yellow-400' :
                      'bg-gray-400'
                    }`}></div>
                    {agent.status === 'online' ? 'Trực tuyến' :
                     agent.status === 'busy' ? 'Bận' : 'Offline'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Connect Button */}
          <button
            onClick={connectToChat}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-blue-500/25"
          >
            🚀 Bắt Đầu Chat Ngay
          </button>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 text-left">
            <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
              <div className="text-2xl mb-2">⚡</div>
              <h4 className="font-semibold text-gray-100 mb-2">Phản Hồi Nhanh</h4>
              <p className="text-sm text-gray-400">Thời gian phản hồi trung bình dưới 30 giây</p>
            </div>
            <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
              <div className="text-2xl mb-2">🔒</div>
              <h4 className="font-semibold text-gray-100 mb-2">Bảo Mật Cao</h4>
              <p className="text-sm text-gray-400">Mọi cuộc trò chuyện được mã hóa end-to-end</p>
            </div>
            <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
              <div className="text-2xl mb-2">📱</div>
              <h4 className="font-semibold text-gray-100 mb-2">Đa Nền Tảng</h4>
              <p className="text-sm text-gray-400">Hoạt động mượt mà trên mọi thiết bị</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden animate-fade-in-up">
        {/* Chat Header */}
        <div className="bg-gray-700/50 border-b border-gray-600 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-2xl mr-3">{currentAgent.avatar}</div>
              <div>
                <div className="font-semibold text-gray-100">{currentAgent.name}</div>
                <div className="text-sm text-gray-400">{currentAgent.specialization}</div>
              </div>
              <div className="ml-3 flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                <span className="text-xs text-green-400">Trực tuyến</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-gray-400 hover:text-gray-200 transition-colors">
                📞
              </button>
              <button className="text-gray-400 hover:text-gray-200 transition-colors">
                📹
              </button>
              <button className="text-gray-400 hover:text-gray-200 transition-colors">
                ⚙️
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-100'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString('vi-VN', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-700 text-gray-100 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-1">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-xs text-gray-400 ml-2">đang gõ...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        <div className="border-t border-gray-600 p-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => sendMessage(reply)}
                className="bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 text-sm px-3 py-1 rounded-full border border-gray-600 hover:border-gray-500 transition-all duration-300"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-600 p-4">
          <div className="flex items-center space-x-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept="image/*,.pdf,.doc,.docx,.txt"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-gray-400 hover:text-gray-200 transition-colors p-2"
              title="Đính kèm file"
            >
              📎
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage(newMessage)}
              placeholder="Nhập tin nhắn..."
              className="flex-1 px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-100 placeholder-gray-400 transition-all duration-300"
            />
            <button
              onClick={() => sendMessage(newMessage)}
              disabled={!newMessage.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
