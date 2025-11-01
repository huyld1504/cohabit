import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { signalRService } from '../services/signalr.service';
import { chatApi } from '../api/chat.api';
import { useRole } from '../hooks/useRole';
import { useSelector } from 'react-redux';

const ChatContext = createContext();

// Constants for reconnection strategy
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAYS = [0, 1000, 2000, 5000, 10000]; // Exponential backoff in ms

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const { isPlusMember } = useRole();
  const currentUser = useSelector((state) => state.user?.profile);
  const currentUserId = currentUser?.userId || currentUser?.id;

  // Connection state
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const hasInitialized = useRef(false); // Track if connection has been attempted
  const reconnectAttempts = useRef(0);

  // Chat state
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState({});
  const [unreadCounts, setUnreadCounts] = useState({});
  const [typingUsers, setTypingUsers] = useState({});

  /**
   * Initialize SignalR connection
   */
  const connectToChat = useCallback(async () => {
    // Prevent multiple connection attempts
    if (hasInitialized.current) {
      return isConnected;
    }

    hasInitialized.current = true;
    setIsConnecting(true);

    try {
      const success = await signalRService.startConnection();

      setIsConnected(success);
      setIsConnecting(false);

      if (success) {
        // Setup event listeners
        setupEventListeners();
        reconnectAttempts.current = 0; // Reset on successful connection
      } else {
        hasInitialized.current = false; // Allow retry
      }

      return success;
    } catch (error) {
      setIsConnecting(false);
      setIsConnected(false);
      hasInitialized.current = false; // Allow retry on error
      return false;
    }
  }, []); // Empty dependencies - function should not recreate

  /**
   * Retry connection with exponential backoff
   */
  const retryConnection = useCallback(async () => {
    if (reconnectAttempts.current >= MAX_RECONNECT_ATTEMPTS) {
      console.warn('⚠️ Max reconnection attempts reached');
      return false;
    }

    const delay = RECONNECT_DELAYS[reconnectAttempts.current];
    console.log(`🔄 Retrying SignalR connection (attempt ${reconnectAttempts.current + 1}/${MAX_RECONNECT_ATTEMPTS}) in ${delay}ms...`);

    if (delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    reconnectAttempts.current += 1;
    hasInitialized.current = false; // Allow reconnection attempt

    const success = await connectToChat();

    if (success) {
      console.log('✅ Successfully reconnected to SignalR');
      reconnectAttempts.current = 0; // Reset counter on success
    }

    return success;
  }, [connectToChat]);

  /**
   * Handle new message from SignalR or API
   */
  const handleNewMessage = useCallback((message) => {
    // Normalize property names (server may send PascalCase or camelCase)
    const normalizedMessage = {
      messageId: message.messageId || message.MessageId,
      conversationId: message.conversationId || message.ConversationId,
      senderId: message.senderId || message.SenderId,
      senderName: message.senderName || message.SenderName,
      senderImage: message.senderImage || message.SenderImage,
      content: message.content || message.Content,
      createdAt: message.createdAt || message.CreatedAt,
      sentAt: message.sentAt || message.SentAt,
      isRead: message.isRead || message.IsRead,
    };

    const conversationId = normalizedMessage.conversationId;

    // Map message to match frontend format
    const mappedMessage = {
      ...normalizedMessage,
      sentAt: normalizedMessage.createdAt || normalizedMessage.sentAt,
      isOwnMessage: normalizedMessage.senderId === currentUserId,
      isPending: false,
    };

    // Add or update message in messages list
    setMessages(prev => {
      const existingMessages = prev[conversationId] || [];

      // Check if message already exists (by messageId) or is a pending temp message
      const existingIndex = existingMessages.findIndex(m =>
        m.messageId === normalizedMessage.messageId || // Same real ID
        (m.isPending && m.senderId === normalizedMessage.senderId &&
          Math.abs(new Date(m.sentAt) - new Date(normalizedMessage.createdAt || normalizedMessage.sentAt)) < 5000) // Within 5 seconds
      );

      if (existingIndex !== -1) {
        // console.log('   ↻ Replacing existing/pending message at index:', existingIndex);
        // Replace existing/pending message
        const updated = [...existingMessages];
        updated[existingIndex] = mappedMessage;
        return {
          ...prev,
          [conversationId]: updated
        };
      }

      // Add as new message
      return {
        ...prev,
        [conversationId]: [...existingMessages, mappedMessage]
      };
    });

    // Update conversation last message
    setConversations(prev =>
      prev.map(conv =>
        conv.conversationId === conversationId
          ? {
            ...conv,
            lastMessage: mappedMessage.content,
            lastMessageAt: mappedMessage.sentAt
          }
          : conv
      )
    );

    // Update unread count if not current conversation
    setCurrentConversation(currentConv => {
      if (currentConv?.conversationId !== conversationId) {
        setUnreadCounts(prev => ({
          ...prev,
          [conversationId]: (prev[conversationId] || 0) + 1
        }));
      } else {
        console.log('👀 Message is for current conversation, not incrementing unread');
      }
      return currentConv;
    });
  }, [currentUserId]);

  /**
   * Update user online status
   */
  const updateUserOnlineStatus = useCallback((userId, isOnline) => {

    setConversations(prev =>
      prev.map(conv => {
        if (conv.ownerId === userId || conv.interestedUserId === userId) {
          return { ...conv, isOnline };
        }
        return conv;
      })
    );
  }, []);

  /**
   * Setup SignalR event listeners (defined as useCallback to prevent recreating)
   */
  const setupEventListeners = useCallback(() => {

    // Clear any existing handlers to prevent duplicates
    signalRService.eventHandlers.clear();

    // Receive new message
    signalRService.on('receiveMessage', (message) => {
      handleNewMessage(message);
    });

    // Connection status changes
    signalRService.on('reconnected', () => {
      setIsConnected(true);
    });

    signalRService.on('disconnected', () => {
      setIsConnected(false);
    });

    // User online/offline
    signalRService.on('userOnline', ({ userId }) => {
      updateUserOnlineStatus(userId, true);
    });

    signalRService.on('userOffline', ({ userId }) => {
      updateUserOnlineStatus(userId, false);
    });

    // Typing indicator
    signalRService.on('typingIndicator', ({ conversationId, userId, isTyping }) => {
      setTypingUsers(prev => ({
        ...prev,
        [conversationId]: isTyping ? userId : null
      }));
    });

    // Message read
    signalRService.on('messageRead', ({ conversationId }) => {
      setUnreadCounts(prev => ({
        ...prev,
        [conversationId]: 0
      }));
    });
  }, [currentUserId, handleNewMessage, updateUserOnlineStatus]); // Re-setup when dependencies change

  /**
   * Load all conversations
   */
  const loadConversations = async () => {
    try {
      const response = await chatApi.getAllConversations();

      if (response.success && response.data) {
        setConversations(response.data);

        // Initialize unread counts
        const counts = {};
        response.data.forEach(conv => {
          counts[conv.conversationId] = conv.unreadCount || 0;
        });
        setUnreadCounts(counts);

        // Join all conversation rooms for real-time updates
        if (isConnected) {
          // console.log('🚪 Joining all conversation rooms for real-time updates...');
          for (const conv of response.data) {
            try {
              await signalRService.joinConversation(conv.conversationId);
              // console.log('✅ Joined room:', conv.conversationId);
            } catch (err) {
              console.error('❌ Failed to join room:', conv.conversationId, err);
            }
          }
        } else {
          console.warn('⚠️ Not connected to SignalR, cannot join conversation rooms');
        }
      }
    } catch (error) {
      console.error('❌ Error loading conversations:', error);
    }
  };

  /**
   * Open/Join a conversation
   */
  const openConversation = async (conversationId) => {
    try {

      // Find conversation in list
      const conversation = conversations.find(c => c.conversationId === conversationId);
      if (conversation) {
        setCurrentConversation(conversation);
      }

      // Join SignalR room
      if (isConnected) {
        await signalRService.joinConversation(conversationId);
      }

      // Load messages if not already loaded
      if (!messages[conversationId]) {
        await loadMessages(conversationId);
      }

      // Mark as read
      await markAsRead(conversationId);

      return true;
    } catch (error) {
      console.error('❌ Error opening conversation:', error);
      return false;
    }
  };

  /**
   * Load messages for a conversation
   */
  const loadMessages = async (conversationId) => {
    try {
      const response = await chatApi.getMessageInConversation(conversationId);

      if (response.success && response.data) {
        // Map API response to match frontend expected format
        const mappedMessages = response.data.map(msg => ({
          ...msg,
          sentAt: msg.createdAt || msg.sentAt, // Backend uses createdAt
          isOwnMessage: msg.senderId === currentUserId, // Determine if message is from current user
        }));

        setMessages(prev => ({
          ...prev,
          [conversationId]: mappedMessages
        }));
      }
    } catch (error) {
      console.error('❌ Error loading messages:', error);
    }
  };

  /**
   * Send a message with optimistic UI update
   */
  const sendMessage = async (conversationId, content) => {
    try {
      if (!content || !content.trim()) {
        return false;
      }

      // Create temporary optimistic message for instant UI feedback
      const tempId = `temp-${Date.now()}`;
      const optimisticMessage = {
        messageId: tempId,
        conversationId,
        content: content.trim(),
        senderId: currentUserId,
        sentAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        isOwnMessage: true,
        isPending: true, // Mark as pending
      };

      // Immediately add to UI for instant feedback
      setMessages(prev => ({
        ...prev,
        [conversationId]: [...(prev[conversationId] || []), optimisticMessage]
      }));

      // Update conversation last message immediately
      setConversations(prev =>
        prev.map(conv =>
          conv.conversationId === conversationId
            ? {
              ...conv,
              lastMessage: optimisticMessage.content,
              lastMessageAt: optimisticMessage.sentAt
            }
            : conv
        )
      );

      // Send via SignalR (preferred) or REST API (fallback)
      try {

        if (isConnected) {
          const success = await signalRService.sendMessage(conversationId, content.trim());

          if (success) {
            return true;
          }
        } else {
          // Try to reconnect with retry logic
          console.log('⚠️ SignalR not connected, attempting to reconnect...');
          let reconnected = false;

          for (let i = 0; i < MAX_RECONNECT_ATTEMPTS; i++) {
            const delay = RECONNECT_DELAYS[i];

            if (delay > 0) {
              console.log(`🔄 Retry attempt ${i + 1}/${MAX_RECONNECT_ATTEMPTS} in ${delay}ms...`);
              await new Promise(resolve => setTimeout(resolve, delay));
            }

            hasInitialized.current = false;
            reconnected = await connectToChat();

            if (reconnected) {
              console.log('✅ Reconnected successfully, retrying send...');
              const success = await signalRService.sendMessage(conversationId, content.trim());

              if (success) {
                return true;
              }
              break;
            }
          }

          if (!reconnected) {
            console.warn('⚠️ Failed to reconnect after all attempts, using REST API fallback');
          }
        }

        // REST API fallback
        console.log('📡 Using REST API to send message...');
        const response = await chatApi.sendNewMessage({
          conversationId,
          content: content.trim()
        });

        if (response.success && response.data) {

          // Replace optimistic message with real server response
          setMessages(prev => ({
            ...prev,
            [conversationId]: (prev[conversationId] || []).map(msg =>
              msg.messageId === tempId ? {
                ...response.data,
                sentAt: response.data.createdAt || response.data.sentAt,
                isOwnMessage: true,
                isPending: false
              } : msg
            )
          }));

          return true;
        }

        setMessages(prev => ({
          ...prev,
          [conversationId]: (prev[conversationId] || []).filter(msg => msg.messageId !== tempId)
        }));
        return false;

      } catch (sendError) {
        console.error('❌ Error during send:', sendError);
        // Remove optimistic message on error
        setMessages(prev => ({
          ...prev,
          [conversationId]: (prev[conversationId] || []).filter(msg => msg.messageId !== tempId)
        }));
        return false;
      }
    } catch (error) {
      console.error('❌ Error sending message:', error);
      return false;
    }
  };

  /**
   * Mark conversation as read
   */
  const markAsRead = async (conversationId) => {
    try {

      // Note: SignalR hub doesn't have MarkAsRead method, only use REST API
      await chatApi.markConversationAsRead(conversationId);

      // Update local state immediately
      setUnreadCounts(prev => ({
        ...prev,
        [conversationId]: 0
      }));

    } catch (error) {
      console.error('❌ Error marking as read:', error);
    }
  };

  /**
   * Create or get conversation
   */
  const createOrGetConversation = async (postId) => {
    try {
      const response = await chatApi.createNewConversation(postId);

      if (response.success && response.data) {
        const conversation = response.data;

        // Add to conversations list if new
        setConversations(prev => {
          const exists = prev.find(c => c.conversationId === conversation.conversationId);
          if (exists) {
            return prev;
          }
          return [...prev, conversation];
        });

        return conversation;
      }

      return null;
    } catch (error) {
      console.error('❌ Error creating conversation:', error);
      return null;
    }
  };

  /**
   * Disconnect from chat
   */
  const disconnectFromChat = useCallback(async () => {
    await signalRService.stopConnection();
    setIsConnected(false);
    setCurrentConversation(null);
    hasInitialized.current = false; // Allow reconnection
  }, []);

  /**
   * Get total unread count
   */
  const getTotalUnreadCount = () => {
    return Object.values(unreadCounts).reduce((sum, count) => sum + count, 0);
  };

  // Setup event listeners whenever connection is established and currentUserId is available
  useEffect(() => {
    if (isConnected && currentUserId) {
      setupEventListeners();
    }
  }, [isConnected, currentUserId, setupEventListeners]);

  // Re-join all conversation rooms when reconnected
  useEffect(() => {
    const rejoinRooms = async () => {
      if (isConnected && conversations.length > 0) {
        for (const conv of conversations) {
          try {
            await signalRService.joinConversation(conv.conversationId);
          } catch (err) {
            console.error('❌ Failed to rejoin room:', conv.conversationId, err);
          }
        }
      }
    };
    rejoinRooms();
  }, [isConnected, conversations.length]);

  useEffect(() => {
    const initializeConnection = async () => {
      await connectToChat();
    };

    initializeConnection();

    // Cleanup on unmount
    return () => {
      disconnectFromChat();
    };
  }, []); // Empty array - only run once on mount

  const value = {
    // Connection state
    isConnected,
    isConnecting,
    connectToChat,
    disconnectFromChat,

    // User info
    currentUserId,

    // Conversations
    conversations,
    currentConversation,
    loadConversations,
    openConversation,
    createOrGetConversation,

    // Messages
    messages,
    loadMessages,
    sendMessage,

    // Unread counts
    unreadCounts,
    getTotalUnreadCount,

    // Typing
    typingUsers,

    // Utilities
    markAsRead
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
