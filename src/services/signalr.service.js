import * as signalR from '@microsoft/signalr';
import { API_CONSTANTS } from '../constants/api.constant';
import { getToken } from '../utils/token.store.util';

class SignalRService {
  constructor() {
    this.connection = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 10;
    this.eventHandlers = new Map();
    this.isConnecting = false; // prevent concurrent connect attempts
  }

  /**
   * Initialize and start SignalR connection
   */
  async startConnection() {
    try {
      const { token } = await getToken();

      if (!token) {
        console.error('❌ No authentication token found');
        return false;
      }

      // Prevent concurrent start attempts
      if (this.isConnecting) {
        // console.log('⚠️ SignalR: already connecting, skipping duplicate start');
        return false;
      }

      // If already connected, skip
      if (this.connection && this.connection.state === signalR.HubConnectionState.Connected) {
        // console.log('ℹ️ SignalR: already connected');
        this.isConnected = true;
        return true;
      }

      this.isConnecting = true;

      // Get base URL from environment
      let apiUrl = API_CONSTANTS.API_URL || 'http://cohabit.vn/api';

      // Remove /api, /api/v1, or /v1 suffix to get the base domain
      const baseURL = apiUrl.replace(/\/(api|v1|api\/v1)$/i, '');

      // SignalR hub path (lowercase to match ASP.NET convention)
      const hubUrl = `${baseURL}/chathub`;

      // console.log('🔌 Connecting to SignalR Hub:', hubUrl);
      // console.log('🔑 Using API base:', apiUrl);

      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(hubUrl, {
          accessTokenFactory: () => {
            // console.log('🔐 Providing token to SignalR (length:', token?.length || 0, ')');
            return token;
          },
          // Skip negotiation for faster connection when using WebSockets only
          skipNegotiation: false, // Keep false to let server choose best transport
          // Prefer WebSockets but allow fallback for compatibility
          transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.ServerSentEvents | signalR.HttpTransportType.LongPolling,
          withCredentials: false,
          // Add timeout configurations for faster failure detection
          timeout: 15000, // 15 seconds timeout for operations
        })
        // Enable automatic reconnection with exponential backoff
        .withAutomaticReconnect({
          nextRetryDelayInMilliseconds: (retryContext) => {
            // Fast initial reconnects, then exponential backoff
            if (retryContext.previousRetryCount === 0) return 0; // Instant first retry
            if (retryContext.previousRetryCount === 1) return 2000; // 2 seconds
            if (retryContext.previousRetryCount === 2) return 5000; // 5 seconds
            if (retryContext.previousRetryCount === 3) return 10000; // 10 seconds
            // After 4 failures, try every 30 seconds
            return 30000;
          }
        })
        // Reduce logging in production, use Warning level
        .configureLogging(signalR.LogLevel.Warning)
        // Add keep-alive for better connection health detection
        .withHubProtocol(new signalR.JsonHubProtocol())
        .build();

      // Configure keep-alive interval (ping server every 15 seconds)
      this.connection.keepAliveIntervalInMilliseconds = 15000;
      // Server timeout (consider disconnected if no message for 30 seconds)
      this.connection.serverTimeoutInMilliseconds = 30000;

      // Setup connection event handlers
      this.setupConnectionHandlers();

      // Setup message handlers
      this.setupMessageHandlers();

      // Start connection with timeout
      await this.connection.start();
      this.isConnected = true;
      this.reconnectAttempts = 0;
      this.isConnecting = false;

      // console.log('✅ SignalR Connected successfully');
      // console.log('   Connection ID:', this.connection.connectionId);
      // console.log('   Transport:', this.connection.transport);
      // console.log('   Connection State:', this.connection.state);

      // Log registered event handlers for debugging
      // console.log('📋 Registered SignalR event handlers:');
      const handlers = Object.keys(this.connection._methods || {});
      handlers.forEach(handler => {
        // console.log('   -', handler);
      });

      return true;
    } catch (error) {
      console.error('❌ SignalR Connection Error:', error);
      return false;
    }
  }

  /**
   * Setup connection lifecycle handlers
   */
  setupConnectionHandlers() {
    this.connection.onreconnecting((error) => {
      this.isConnected = false;
      this.reconnectAttempts++;
      this.notifyEventHandlers('reconnecting', { error });
    });

    this.connection.onreconnected((connectionId) => {
      this.isConnected = true;
      this.reconnectAttempts = 0;
      this.notifyEventHandlers('reconnected', { connectionId });
    });

    this.connection.onclose((error) => {
      this.isConnected = false;
      this.notifyEventHandlers('disconnected', { error });
    });
  }

  setupMessageHandlers() {

    // Receive new message
    this.connection.on('ReceiveMessage', (message) => {
      this.notifyEventHandlers('receiveMessage', message);
    });

    // User online status
    this.connection.on('UserOnline', (userId) => {
      this.notifyEventHandlers('userOnline', { userId });
    });

    // User offline status
    this.connection.on('UserOffline', (userId) => {
      this.notifyEventHandlers('userOffline', { userId });
    });

    // Message read notification
    this.connection.on('MessageRead', (data) => {
      this.notifyEventHandlers('messageRead', data);
    });

    // Typing indicator
    this.connection.on('TypingIndicator', (data) => {
      this.notifyEventHandlers('typingIndicator', data);
    });

    // New message notification (lowercase handler for server compatibility)
    this.connection.on('newmessagenotification', (data) => {
      // console.log('🔔 New Message Notification:', data);
      // This is just a notification, actual message comes via ReceiveMessage
    });
  }

  /**
   * Join a conversation room
   */
  async joinConversation(conversationId) {
    if (!this.isConnected || !this.connection) {
      return false;
    }

    try {
      await this.connection.invoke('JoinConversation', conversationId);
      return true;
    } catch (error) {
      console.error('❌ Error joining conversation:', error);
      return false;
    }
  }

  /**
   * Leave a conversation room
   */
  async leaveConversation(conversationId) {
    if (!this.isConnected || !this.connection) {
      return false;
    }

    try {
      await this.connection.invoke('LeaveConversation', conversationId);
      return true;
    } catch (error) {
      console.error('❌ Error leaving conversation:', error);
      return false;
    }
  }

  /**
   * Send a message to the conversation
   */
  async sendMessage(conversationId, content) {
    if (!this.isConnected || !this.connection) {
      return false;
    }

    try {
      await this.connection.invoke('SendMessage', conversationId, content);
      return true;
    } catch (error) {
      console.error('❌ Error sending message via SignalR:', error);
      console.error('   Error details:', error.message);
      return false;
    }
  }

  async markAsRead(conversationId) {
    return false;
  }

  /**
   * Send typing indicator
   */
  async sendTypingIndicator(conversationId, isTyping) {
    if (!this.isConnected || !this.connection) {
      return false;
    }

    try {
      await this.connection.invoke('SendTypingIndicator', conversationId, isTyping);
      return true;
    } catch (error) {
      console.error('❌ Error sending typing indicator:', error);
      return false;
    }
  }

  /**
   * Register event handler
   */
  on(event, handler) {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    this.eventHandlers.get(event).push(handler);
  }

  /**
   * Unregister event handler
   */
  off(event, handler) {
    if (!this.eventHandlers.has(event)) {
      return;
    }
    const handlers = this.eventHandlers.get(event);
    const index = handlers.indexOf(handler);
    if (index > -1) {
      handlers.splice(index, 1);
    }
  }

  /**
   * Notify all registered event handlers
   */
  notifyEventHandlers(event, data) {
    if (!this.eventHandlers.has(event)) {
      return;
    }
    this.eventHandlers.get(event).forEach(handler => {
      try {
        handler(data);
      } catch (error) {
        console.error(`Error in event handler for ${event}:`, error);
      }
    });
  }

  /**
   * Stop SignalR connection
   */
  async stopConnection() {
    if (this.connection) {
      try {
        await this.connection.stop();
        this.isConnected = false;
      } catch (error) {
        console.error('❌ Error stopping connection:', error);
      }
    }
  }

  /**
   * Get connection status
   */
  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      connectionId: this.connection?.connectionId,
      state: this.connection?.state
    };
  }
}

// Export singleton instance
export const signalRService = new SignalRService();
