import React, { useState } from 'react';
import { Avatar, Badge, Input, Empty } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { useChatContext } from '../../contexts/ChatContext';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';

dayjs.extend(relativeTime);
dayjs.locale('vi');

const ConversationList = ({ onSelectConversation }) => {
  const navigate = useNavigate();
  const {
    conversations,
    currentConversation,
    unreadCounts,
    openConversation
  } = useChatContext();

  const [searchQuery, setSearchQuery] = useState('');

  const handleConversationClick = async (conversationId) => {
    // Scroll to top for better UX
    window.scrollTo({ top: 0, behavior: 'smooth' });

    await openConversation(conversationId);
    navigate(`/chat?conversationId=${conversationId}`);

    // Notify parent for mobile view
    if (onSelectConversation) {
      onSelectConversation();
    }
  };

  const filteredConversations = conversations.filter(conv => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      conv.postTitle?.toLowerCase().includes(query) ||
      conv.ownerName?.toLowerCase().includes(query) ||
      conv.interestedUserName?.toLowerCase().includes(query)
    );
  });

  const formatLastMessageTime = (timestamp) => {
    if (!timestamp) return '';
    const now = dayjs();
    const messageTime = dayjs(timestamp);
    const diffDays = now.diff(messageTime, 'day');

    if (diffDays === 0) {
      return messageTime.format('HH:mm');
    } else if (diffDays === 1) {
      return 'Hôm qua';
    } else if (diffDays < 7) {
      return messageTime.format('ddd');
    } else {
      return messageTime.format('DD/MM');
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header - Messenger Style */}
      <div className="px-4 py-5 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Trò chuyện</h1>
        <Input
          prefix={<SearchOutlined className="text-gray-400 text-lg" />}
          placeholder="Tìm kiếm..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          allowClear
          className="rounded-full bg-gray-100 border-0 hover:bg-gray-200 focus:bg-white transition-colors"
          size="large"
          style={{
            paddingLeft: '16px',
            paddingRight: '16px'
          }}
        />
      </div>

      {/* Conversation List - Instagram/Messenger Style */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <span className="text-gray-500">
                {searchQuery ? 'Không tìm thấy cuộc trò chuyện' : 'Chưa có cuộc trò chuyện nào'}
              </span>
            }
            className="mt-12"
          />
        ) : (
          <div className="py-2">
            {filteredConversations.map((conversation) => {
              const isActive = currentConversation?.conversationId === conversation.conversationId;
              const unreadCount = unreadCounts[conversation.conversationId] || 0;
              const otherUserName = conversation.ownerName || conversation.interestedUserName || 'Người dùng';
              const otherUserImage = conversation.ownerImage || conversation.interestedUserImage;

              return (
                <div
                  key={conversation.conversationId}
                  onClick={() => handleConversationClick(conversation.conversationId)}
                  className={`
                    flex items-center px-4 py-3 cursor-pointer transition-all duration-200
                    hover:bg-gray-50 relative
                    ${isActive ? 'bg-gray-100' : ''}
                  `}
                >
                  {/* Active Indicator - Messenger Style */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full"></div>
                  )}

                  {/* Avatar with Online Status */}
                  <div className="relative flex-shrink-0">
                    <Avatar
                      size={56}
                      src={otherUserImage || undefined}
                      icon={!otherUserImage && <UserOutlined />}
                      className={`flex-shrink-0 ${!otherUserImage ? '!bg-[#1279a1]' : ''}`}
                    />
                    {/* Online Status Dot - Instagram Style */}
                    {conversation.isOnline && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>

                  {/* Conversation Info */}
                  <div className="ml-3 flex-1 min-w-0">
                    {/* Name and Time */}
                    <div className="flex items-baseline justify-between mb-1">
                      <h3 className={`text-[15px] truncate ${unreadCount > 0 ? 'font-semibold text-gray-900' : 'font-normal text-gray-900'}`}>
                        {otherUserName}
                      </h3>
                      {conversation.lastMessageAt && (
                        <span className={`text-xs ml-2 flex-shrink-0 ${unreadCount > 0 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                          {formatLastMessageTime(conversation.lastMessageAt)}
                        </span>
                      )}
                    </div>

                    {/* Last Message */}
                    <div className="flex items-center justify-between">
                      <p className={`text-[13px] truncate flex-1 ${unreadCount > 0 ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
                        {conversation.lastMessage || 'Bắt đầu cuộc trò chuyện'}
                      </p>

                      {/* Unread Badge - Messenger Style */}
                      {unreadCount > 0 && (
                        <div className="ml-2 flex-shrink-0">
                          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-medium">{unreadCount > 9 ? '9+' : unreadCount}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Post Title - Subtle */}
                    <p className="text-[11px] text-gray-400 truncate mt-0.5">
                      {conversation.postTitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;
