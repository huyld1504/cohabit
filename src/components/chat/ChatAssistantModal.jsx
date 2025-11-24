import React, { useState, useRef, useEffect } from 'react';
import { Modal, Input, Button, Avatar, Typography, Divider } from 'antd';
import {
  MessageOutlined,
  SendOutlined,
  CloseOutlined,
  RobotOutlined,
  UserOutlined,
  SmileOutlined
} from '@ant-design/icons';

const { Text } = Typography;

const ChatAssistantModal = ({ visible, onClose }) => {
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

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setTyping(true);

    // Simulate AI response after delay
    setTimeout(() => {
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: randomResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setTyping(false);
    }, 1500 + Math.random() * 1000);
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
      <div className={`flex items-start gap-3 mb-4 ${isUser ? 'flex-row-reverse' : ''}`}>
        <Avatar
          icon={isUser ? <UserOutlined /> : <RobotOutlined />}
          className={`flex-shrink-0 ${isUser ? 'bg-blue-500' : 'bg-green-500'}`}
          size={32}
        />
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-xs`}>
          <div
            className={`px-4 py-2 rounded-2xl ${isUser
                ? 'bg-blue-500 text-white rounded-br-md'
                : 'bg-gray-100 text-gray-800 rounded-bl-md'
              }`}
          >
            <Text className={isUser ? 'text-white' : 'text-gray-800'}>
              {message.content}
            </Text>
          </div>
          <Text type="secondary" className="text-xs mt-1">
            {message.timestamp.toLocaleTimeString('vi-VN', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Text>
        </div>
      </div>
    );
  };

  const TypingIndicator = () => (
    <div className="flex items-start gap-3 mb-4">
      <Avatar
        icon={<RobotOutlined />}
        className="bg-green-500 flex-shrink-0"
        size={32}
      />
      <div className="bg-gray-100 px-4 py-2 rounded-2xl rounded-bl-md">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      title={
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative mr-3">
              <Avatar
                icon={<RobotOutlined />}
                className="bg-green-500"
                size={40}
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <Text strong className="text-lg">AI Assistant</Text>
              <br />
              <Text type="secondary" className="text-sm">Online • Phản hồi ngay lập tức</Text>
            </div>
          </div>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={450}
      className="chat-assistant-modal"
      zIndex={1000}
      mask={true}
      maskClosable={true}
      styles={{
        body: { padding: 0 },
        header: { borderBottom: '1px solid #f0f0f0', marginBottom: 0 },
        mask: { backgroundColor: 'rgba(0, 0, 0, 0.45)' }
      }}
    >
      <div className="flex flex-col h-96">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {typing && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        <Divider className="my-0" />

        {/* Input Area */}
        <div className="p-4">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Input.TextArea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nhập tin nhắn của bạn..."
                autoSize={{ minRows: 1, maxRows: 3 }}
                className="resize-none"
              />
            </div>
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || typing}
              className="bg-blue-500 hover:bg-blue-600 h-8 px-3"
            />
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 mt-3">
            <Button
              size="small"
              className="text-xs border-blue-200 text-blue-600 hover:bg-blue-50"
              onClick={() => setNewMessage('Tôi muốn tìm hiểu về dịch vụ của CoHabit')}
            >
              Dịch vụ của CoHabit
            </Button>
            <Button
              size="small"
              className="text-xs border-green-200 text-green-600 hover:bg-green-50"
              onClick={() => setNewMessage('Làm sao để đăng ký tài khoản?')}
            >
              Đăng ký tài khoản
            </Button>
            <Button
              size="small"
              className="text-xs border-purple-200 text-purple-600 hover:bg-purple-50"
              onClick={() => setNewMessage('Tôi cần hỗ trợ kỹ thuật')}
            >
              Hỗ trợ kỹ thuật
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ChatAssistantModal;