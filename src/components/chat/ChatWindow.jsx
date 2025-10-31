import React, { useRef, useEffect } from 'react';
import { Avatar, Button, Spin } from 'antd';
import { UserOutlined, LeftOutlined, SendOutlined, SmileOutlined } from '@ant-design/icons';
import { useChatContext } from '../../contexts/ChatContext';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const ChatWindow = ({ onBack }) => {
  const navigate = useNavigate();
  const {
    currentConversation,
    messages,
    sendMessage,
    loadMessages
  } = useChatContext();

  const [messageText, setMessageText] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);

  const conversationId = currentConversation?.conversationId;
  const conversationMessages = messages[conversationId] || [];

  useEffect(() => {
    if (conversationId) {
      loadMessagesForConversation();
    }
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [conversationMessages]);

  const loadMessagesForConversation = async () => {
    setLoading(true);
    await loadMessages(conversationId);
    setLoading(false);
  };

  const scrollToBottom = () => {
    // Scroll the messages container, not the page
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  const handleSendMessage = async () => {
    if (!messageText.trim()) return;

    const success = await sendMessage(conversationId, messageText.trim());

    if (success) {
      setMessageText('');
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const otherUserName = currentConversation?.ownerName || currentConversation?.interestedUserName || 'Người dùng';
  const otherUserImage = currentConversation?.ownerImage || currentConversation?.interestedUserImage;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header - Instagram/Messenger Style */}
      <div className="flex items-center px-4 py-3 border-b border-gray-200 bg-white">
        <Button
          icon={<LeftOutlined />}
          type="text"
          onClick={() => {
            if (onBack) {
              onBack();
            } else {
              navigate('/chat');
            }
          }}
          className="mr-2 md:hidden"
          size="large"
        />
        <div className="relative">
          <Avatar
            size={40}
            src={otherUserImage || undefined}
            icon={!otherUserImage && <UserOutlined />}
            className={!otherUserImage ? '!bg-[#1279a1]' : ''}
          />
          {/* Online Status */}
          {currentConversation?.isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          )}
        </div>
        <div className="ml-3 flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-[15px]">{otherUserName}</h3>
          <p className="text-xs text-gray-500 truncate">{currentConversation?.postTitle}</p>
        </div>
      </div>

      {/* Messages Area - Instagram/Messenger Style */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-4 py-4 bg-white">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Spin size="large" />
          </div>
        ) : conversationMessages.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full text-center px-4">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Avatar
                size={64}
                src={otherUserImage || undefined}
                icon={!otherUserImage && <UserOutlined />}
                className={!otherUserImage ? '!bg-[#1279a1]' : ''}
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{otherUserName}</h3>
            <p className="text-sm text-gray-500 mb-4">
              Bạn đang kết nối về: {currentConversation?.postTitle}
            </p>
            <p className="text-xs text-gray-400">
              Hãy bắt đầu cuộc trò chuyện với một tin nhắn thân thiện
            </p>
          </div>
        ) : (
          <>
            {conversationMessages.map((message, index) => {
              const isOwn = message.isOwnMessage;
              const showAvatar = index === conversationMessages.length - 1 ||
                                conversationMessages[index + 1]?.isOwnMessage !== isOwn;
              const showTime = index === 0 ||
                              Math.abs(dayjs(message.sentAt).diff(conversationMessages[index - 1]?.sentAt, 'minute')) > 5;

              return (
                <React.Fragment key={message.messageId || index}>
                  {/* Time Separator */}
                  {showTime && (
                    <div className="flex justify-center my-4">
                      <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">
                        {dayjs(message.sentAt).format('HH:mm - DD/MM/YYYY')}
                      </span>
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`flex items-end mb-1 ${isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    {/* Other User Avatar */}
                    {!isOwn && (
                      <div className="mr-2" style={{ width: '28px' }}>
                        {showAvatar ? (
                          <Avatar
                            size={28}
                            src={otherUserImage || undefined}
                            icon={!otherUserImage && <UserOutlined />}
                            className={!otherUserImage ? '!bg-[#1279a1]' : ''}
                          />
                        ) : null}
                      </div>
                    )}

                    {/* Message Content */}
                    <div className={`max-w-[70%] ${isOwn ? 'items-end' : 'items-start'}`}>
                      <div
                        className={`
                          px-3 py-2 rounded-[18px] inline-block
                          ${isOwn
                            ? 'bg-blue-600 text-white rounded-br-md'
                            : 'bg-gray-100 text-gray-900 rounded-bl-md'
                          }
                        `}
                        style={{
                          wordBreak: 'break-word',
                          animation: 'fadeIn 0.3s ease-in'
                        }}
                      >
                        <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
                          {message.content}
                        </p>
                      </div>
                    </div>

                    {/* Own Message Spacing */}
                    {isOwn && <div style={{ width: '28px' }} className="ml-2" />}
                  </div>
                </React.Fragment>
              );
            })}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area - Instagram/Messenger Style */}
      <div className="px-4 py-3 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-2">
          {/* Emoji Button (Placeholder) */}
          <Button
            type="text"
            icon={<SmileOutlined className="text-xl text-gray-500" />}
            className="flex-shrink-0"
            size="large"
          />

          {/* Message Input */}
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Aa"
              rows={1}
              className="w-full px-4 py-2 bg-gray-100 border-0 rounded-full resize-none
                       focus:outline-none focus:bg-gray-200 transition-colors
                       text-[15px]"
              style={{
                maxHeight: '100px',
                minHeight: '36px'
              }}
            />
          </div>

          {/* Send Button */}
          {messageText.trim() ? (
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSendMessage}
              disabled={!messageText.trim()}
              className="flex-shrink-0 rounded-full w-9 h-9 p-0 flex items-center justify-center"
              style={{
                backgroundColor: '#0084ff',
                borderColor: '#0084ff'
              }}
            />
          ) : (
            <Button
              type="text"
              icon={<SendOutlined className="text-xl text-gray-400" />}
              className="flex-shrink-0"
              size="large"
              disabled
            />
          )}
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ChatWindow;
