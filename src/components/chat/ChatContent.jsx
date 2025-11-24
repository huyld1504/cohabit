import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, Avatar, Typography, Divider } from 'antd';
import {
  SendOutlined,
  RobotOutlined,
  UserOutlined,
  SmileOutlined
} from '@ant-design/icons';

const { Text } = Typography;

const ChatContent = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Xin chào! Tôi là AI Assistant của CoHabit. Tôi có thể giúp bạn gì hôm nay?',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const mockResponses = [
    "Tôi hiểu bạn đang quan tâm đến dịch vụ của CoHabit. Bạn có thể cho tôi biết cụ thể hơn không?",
    "Đây là một câu hỏi rất hay! CoHabit cung cấp nhiều tính năng hữu ích cho việc tìm kiếm và quản lý chỗ ở.",
    "Cảm ơn bạn đã sử dụng CoHabit! Tôi luôn sẵn sàng hỗ trợ bạn.",
    "Bạn có thể khám phá thêm các tính năng premium của chúng tôi để có trải nghiệm tốt hơn.",
    "Tôi sẽ ghi nhận phản hồi của bạn và chuyển cho đội ngũ phát triển để cải thiện dịch vụ."
  ];

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: newMessage,
      timestamp: new Date()
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setNewMessage('');
    setTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: randomResponse,
        timestamp: new Date()
      };
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
      setTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const MessageBubble = ({ message }) => {
    const isUser = message.type === 'user';
    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
        <div className={`flex items-start gap-2 max-w-[80%] ${isUser ? 'flex-row-reverse' : ''}`}>
          <Avatar
            size="small"
            icon={isUser ? <UserOutlined /> : <RobotOutlined />}
            className={isUser ? 'bg-blue-500' : 'bg-green-500'}
          />
          <div className={`p-2 rounded-lg ${isUser
              ? 'bg-blue-500 text-white rounded-br-sm'
              : 'bg-gray-100 text-gray-800 rounded-bl-sm'
            }`}>
            <Text className={isUser ? 'text-white' : 'text-gray-800'}>
              {message.content}
            </Text>
            <div className={`text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
              {message.timestamp.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const TypingIndicator = () => (
    <div className="flex justify-start mb-2">
      <div className="flex items-start gap-2 max-w-[80%]">
        <Avatar size="small" icon={<RobotOutlined />} className="bg-green-500" />
        <div className="bg-gray-100 p-2 rounded-lg rounded-bl-sm">
          <div className="flex items-center gap-1">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <Text type="secondary" className="text-xs ml-2">AI đang soạn tin...</Text>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {typing && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <Divider className="my-0" />

      {/* Input Area */}
      <div className="p-3">
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <Input.TextArea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nhập tin nhắn..."
              autoSize={{ minRows: 1, maxRows: 2 }}
              className="resize-none text-sm"
            />
          </div>
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || typing}
            className="bg-blue-500 hover:bg-blue-600 h-auto px-2"
            size="small"
          />
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-1 mt-2">
          <Button
            size="small"
            className="text-xs border-blue-200 text-blue-600 hover:bg-blue-50 px-2 py-1"
            onClick={() => setNewMessage('Tôi muốn tìm hiểu về dịch vụ của CoHabit')}
          >
            Dịch vụ CoHabit
          </Button>
          <Button
            size="small"
            className="text-xs border-green-200 text-green-600 hover:bg-green-50 px-2 py-1"
            onClick={() => setNewMessage('Làm sao để đăng ký tài khoản?')}
          >
            Đăng ký
          </Button>
          <Button
            size="small"
            className="text-xs border-purple-200 text-purple-600 hover:bg-purple-50 px-2 py-1"
            onClick={() => setNewMessage('Tôi cần hỗ trợ kỹ thuật')}
          >
            Hỗ trợ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatContent;