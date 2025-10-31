# Real-Time Messaging Debug Guide

## How to Test Real-Time Messaging

### Setup:
1. Open 2 browser windows/tabs
2. Login as **User 1** in Window 1
3. Login as **User 2** in Window 2
4. Open **Developer Console** (F12) in **BOTH windows**

### Test Steps:

#### Window 1 (User 1):
1. Navigate to `/chat`
2. Open a conversation with User 2
3. Type "123" and send

#### Window 2 (User 2):
1. Navigate to `/chat`
2. Open the SAME conversation with User 1
3. Watch console for logs

---

## Expected Console Logs

### When Page Loads (BOTH Users):

```
✅ SignalR Connected successfully
   Connection ID: [some-id]
   Transport: [WebSocket/ServerSentEvents/LongPolling]
   Connection State: Connected
📋 Registered SignalR event handlers:
   - ReceiveMessage
   - UserOnline
   - UserOffline
   - MessageRead
   - TypingIndicator
```

### When Conversations Load (BOTH Users):

```
📥 Loading conversations...
✅ Conversations loaded: [N]
🚪 Joining all conversation rooms for real-time updates...
✅ Joined room: [conversation-id-1]
✅ Joined room: [conversation-id-2]
...
```

**CRITICAL:** Both users MUST see "✅ Joined room" for the SAME conversation ID!

### When User 1 Sends "123":

#### User 1 Console:
```
📤 Sending message via SignalR...
   Conversation ID: [conversation-id]
   Content: 123
   Connection State: Connected
✅ Message sent successfully via SignalR
🔔 Processing new message for conversation: [conversation-id]
   Message ID: [message-id]
   Sender ID: [user-1-id]
   Current User ID: [user-1-id]
   ✚ Adding new message to conversation
   ✅ Message processed successfully
```

#### User 2 Console (SHOULD SEE):
```
📩 ReceiveMessage event fired from server!
   Message data: {
     "messageId": "...",
     "conversationId": "...",
     "senderId": "[user-1-id]",
     "content": "123",
     "createdAt": "..."
   }
   Notifying 1 handlers
📩 ChatContext: receiveMessage event handler called!
   Message: {...}
   Current user ID: [user-2-id]
   Calling handleNewMessage...
🔔 Processing new message for conversation: [conversation-id]
   Message ID: [message-id]
   Sender ID: [user-1-id]
   Current User ID: [user-2-id]
   ✚ Adding new message to conversation
   👀 Message is for current conversation, not incrementing unread
   ✅ Message processed successfully
   ✅ handleNewMessage completed
```

---

## Troubleshooting

### Problem 1: User 2 doesn't see "📩 ReceiveMessage event fired"
**Cause:** Server not broadcasting message
**Possible reasons:**
- User 2 not in conversation room
- Server-side SignalR issue
- Network firewall blocking WebSockets

**Fix:**
- Check User 2 console for "✅ Joined room: [conversation-id]"
- Check server logs
- Try using different transport (LongPolling instead of WebSocket)

### Problem 2: User 2 sees "ReceiveMessage" but not "ChatContext: receiveMessage"
**Cause:** Event handler not registered
**Fix:**
- Check for "🎧 Setting up SignalR event listeners..." log
- Verify currentUserId is set
- Refresh page

### Problem 3: User 2 sees all logs but message not in UI
**Cause:** Message deduplication issue or state update issue
**Check:**
- Look for "✚ Adding new message" vs "↻ Replacing existing message"
- Verify conversationId matches current conversation
- Check if messages state is updating

### Problem 4: "⚠️ Not connected to SignalR"
**Cause:** SignalR connection failed
**Fix:**
- Check for "❌ SignalR Connection Error" in console
- Verify API_URL in .env.local
- Check network tab for failed requests
- Ensure server is running

### Problem 5: Users joined different conversation rooms
**Cause:** Different conversation IDs
**Fix:**
- Check conversation IDs in both consoles
- Ensure both users are in the SAME conversation
- Verify database has correct conversation records

---

## Key Things to Verify

### ✅ Checklist:

1. **Both users connected to SignalR**
   - [ ] User 1 sees "✅ SignalR Connected successfully"
   - [ ] User 2 sees "✅ SignalR Connected successfully"

2. **Both users registered event handlers**
   - [ ] User 1 sees "ReceiveMessage" in handler list
   - [ ] User 2 sees "ReceiveMessage" in handler list

3. **Both users joined conversation rooms**
   - [ ] User 1 sees "✅ Joined room: [same-id]"
   - [ ] User 2 sees "✅ Joined room: [same-id]"

4. **Message sent successfully**
   - [ ] User 1 sees "✅ Message sent successfully via SignalR"

5. **Message received by User 2**
   - [ ] User 2 sees "📩 ReceiveMessage event fired from server!"
   - [ ] User 2 sees "📩 ChatContext: receiveMessage event handler called!"
   - [ ] User 2 sees "✚ Adding new message to conversation"

---

## Quick Test Commands

Open console in User 2's browser and run:

```javascript
// Check SignalR connection
console.log('Connected:', window.signalRConnection?.state);

// Check joined rooms (not directly accessible, but you can see from logs)

// Test manual message receive (if you have access to signalRService)
// This is just for testing - won't work without proper setup
```

---

## What I Fixed

### 1. **Auto-join all conversation rooms**
- Users now automatically join ALL their conversation rooms when loading conversations
- No need to click on each conversation to receive messages

### 2. **Rejoin rooms on reconnect**
- When SignalR reconnects, automatically rejoin all rooms
- Ensures real-time messaging continues after network issues

### 3. **Enhanced debugging**
- Added detailed console logs at every step
- Shows exactly where message flow breaks
- Displays SignalR event names and data

### 4. **Fixed event handler registration**
- Wrapped functions in useCallback
- Re-register handlers when user ID changes
- Clear old handlers to prevent duplicates

---

## Expected Behavior

When working correctly:

1. User 1 types "123" → Appears instantly in User 1's chat
2. Server receives message → Broadcasts to all users in room
3. User 2 receives message → Appears instantly in User 2's chat
4. **No page reload needed!**

Time: Less than 100ms from send to receive (typically 20-50ms)

---

## If Still Not Working

Send me these details from User 2's console:

1. All logs starting with "✅ SignalR Connected"
2. All logs with "Joined room"
3. All logs when User 1 sends message
4. Any errors (red text)

This will tell me exactly where the message flow is breaking!
