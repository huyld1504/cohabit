import React, { useState } from 'react';
import { Button, Badge } from 'antd';
import { MessageOutlined, CloseOutlined, RobotOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import ChatContent from './ChatContent';

const FloatingChatButton = () => {
  const [chatVisible, setChatVisible] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(true);
  const user = useSelector(state => state.user.profile);
  
  // Chỉ hiển thị khi user đã đăng nhập
  const isLoggedIn = !!user;

  const handleOpenChat = () => {
    setChatVisible(true);
    setHasNewMessage(false);
  };

  const handleCloseChat = () => {
    setChatVisible(false);
  };

  // Không hiển thị nếu chưa đăng nhập
  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6" style={{ zIndex: 999 }}>
        <Badge dot={hasNewMessage} offset={[-8, 8]}>
          <Button
            type="primary"
            shape="circle"
            size="large"
            icon={chatVisible ? <CloseOutlined /> : <MessageOutlined />}
            onClick={chatVisible ? handleCloseChat : handleOpenChat}
            className={`
              w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-300 border-0 floating-chat-button
              ${chatVisible
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-blue-500 hover:bg-blue-600'
              }
            `}
            style={{
              fontSize: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          />
        </Badge>

        {/* Tooltip */}
        {!chatVisible && (
          <div className="absolute bottom-full right-0 mb-2 animate-bounce">
            <div className="bg-gray-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap shadow-lg">
              💬 AI Assistant - Click để chat!
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
            </div>
          </div>
        )}
      </div>

      {/* Chat Popup Box */}
      {chatVisible && (
        <div className="fixed bottom-24 right-6" style={{ zIndex: 998 }}>
          <div className="bg-white rounded-lg shadow-2xl border w-80 h-96 flex flex-col animate-slideUp">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-3 border-b bg-blue-500 text-white rounded-t-lg">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <RobotOutlined className="text-blue-500" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                </div>
                <div>
                  <div className="font-medium text-sm">AI Assistant</div>
                  <div className="text-xs opacity-90">Online • Phản hồi ngay</div>
                </div>
              </div>
              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={handleCloseChat}
                className="text-white hover:bg-blue-600 border-0"
                size="small"
              />
            </div>

            {/* Chat Content */}
            <div className="flex-1 flex flex-col">
              <ChatContent />
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .floating-chat-button:hover {
          animation: float 2s ease-in-out infinite;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default FloatingChatButton;