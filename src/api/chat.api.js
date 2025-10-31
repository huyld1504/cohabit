import { callAPI } from "./axios.instance";

const CHAT_API_ROUTES = {
  CREATE_NEW_CONVERSATION: (postId) => `/Chat/conversation?postId=${postId}`,
  GET_MESSAGE_IN_CONVERSATION: (conversationId) => `/Chat/conversation/${conversationId}/messages`,
  GET_ALL_CONVERSATIONS: '/Chat/conversations',
  MARK_CONVERSATION_AS_READ: (conversationId) => `/Chat/conversation/${conversationId}/read`,
  SEND_NEW_MESSAGE: '/Chat/conversation/message',
};

export const chatApi = {
  createNewConversation: async (postId) => {
    return await callAPI('POST', CHAT_API_ROUTES.CREATE_NEW_CONVERSATION(postId));
  },
  getMessageInConversation: async (conversationId) => {
    return await callAPI('GET', CHAT_API_ROUTES.GET_MESSAGE_IN_CONVERSATION(conversationId));
  },
  getAllConversations: async () => {
    return await callAPI('GET', CHAT_API_ROUTES.GET_ALL_CONVERSATIONS);
  },
  markConversationAsRead: async (conversationId) => {
    return await callAPI('POST', CHAT_API_ROUTES.MARK_CONVERSATION_AS_READ(conversationId));
  },
  sendNewMessage: async (messageData) => {
    return await callAPI('POST', CHAT_API_ROUTES.SEND_NEW_MESSAGE, messageData);
  },
};