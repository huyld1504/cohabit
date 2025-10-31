import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useChatContext } from '../../contexts/ChatContext';
import ConversationList from '../../components/chat/ConversationList';
import ChatWindow from '../../components/chat/ChatWindow';
import { useRole } from '../../hooks/useRole';

const ChatPage = () => {
  const navigate = useNavigate();
  const { isPlusMember } = useRole();
  const [searchParams] = useSearchParams();
  const conversationId = searchParams.get('conversationId');

  const {
    conversations,
    currentConversation,
    loadConversations,
    openConversation
  } = useChatContext();

  const [loading, setLoading] = useState(true);
  const [showMobileChat, setShowMobileChat] = useState(false);
  const hasCheckedMembership = React.useRef(false);

  useEffect(() => {
    // Scroll to top when chat page opens
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Only run once
    if (hasCheckedMembership.current) return;
    hasCheckedMembership.current = true;

    // Check if user has Plus/Pro membership
    // TEMPORARILY DISABLED FOR TESTING
    // if (!isPlusMember()) {
    //   console.log('❌ User does not have Plus/Pro membership');
    //   navigate('/premium');
    //   return;
    // }

    // Initialize chat
    initializeChat();
  }, []); // Empty dependency array - only run once

  useEffect(() => {
    // Open conversation if conversationId is in URL
    if (conversationId && conversations.length > 0) {
      openConversation(conversationId);
    }
  }, [conversationId, conversations]);

  const initializeChat = async () => {
    try {
      setLoading(true);
      await loadConversations();
      setLoading(false);
    } catch (error) {
      console.error('❌ Error initializing chat:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center" style={{ height: 'calc(100vh - 120px)' }}>
        <div className="text-center">
          <Spin size="large" />
          <p className="mt-4 text-gray-600 font-medium">Đang tải tin nhắn...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex overflow-hidden bg-white shadow-sm" style={{ height: 'calc(100vh - 120px)' }}>
      {/* Conversation List - Left Sidebar */}
      <div
        className={`
          ${showMobileChat ? 'hidden' : 'flex'}
          md:flex w-full md:w-[360px] lg:w-[400px] border-r border-gray-200 flex-shrink-0 flex-col bg-white
        `}
      >
        <ConversationList onSelectConversation={() => setShowMobileChat(true)} />
      </div>

      {/* Chat Window - Main Area */}
      <div
        className={`
          ${showMobileChat ? 'flex' : 'hidden'}
          md:flex flex-1 flex-col bg-white
        `}
      >
        {currentConversation ? (
          <ChatWindow onBack={() => setShowMobileChat(false)} />
        ) : (
          <div className="flex items-center justify-center h-full bg-white">
            <div className="text-center px-4 py-8 max-w-md">
              {/* Instagram/Messenger-style empty state */}
              <div className="mb-8">
                <div className="w-28 h-28 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-6 border-4 border-gray-200">
                  <svg className="w-14 h-14 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Tin nhắn của bạn
              </h2>
              <p className="text-gray-500 leading-relaxed">
                Gửi tin nhắn riêng tư cho chủ nhà và bắt đầu tìm kiếm phòng trọ phù hợp với bạn
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
