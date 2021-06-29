const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp();
const db = admin.database();
const TIMESTAMP = admin.database.ServerValue.TIMESTAMP;

/*
 * Auth
 */
exports.onDeleteAuth = functions
    .auth
    .user()
    .onDelete(async (auth) => {
      const updates = {};
      updates[`/users/${auth.uid}`] = null;
      await db.ref().update(updates);
    });

/*
 * User
 */
exports.onDeleteUser = functions
    .database
    .ref("/users/{userId}")
    .onDelete(async (_, context) => {
      const {userId} = context.params;
      const updates = {};
      updates[`/user-chats/${userId}`] = null;
      updates[`/user-messages/${userId}`] = null;
      await db.ref().update(updates);
    });

/*
 * UserChat
 */
exports.onDeleteUserChat = functions
    .database
    .ref("/user-chats/{userId}/{chatId}")
    .onDelete(async (_, context) => {
      const {userId, chatId} = context.params;
      const updates = {};
      updates[`/chats/${chatId}/users/${userId}`] = null;
      updates[`/user-messages/${userId}/${chatId}`] = null;
      await db.ref().update(updates);
    });

/*
 * Chat
 */
exports.onWriteChatUser = functions
    .database
    .ref("/chats/{chatId}/users/{userId}")
    .onWrite(async (change, context) => {
      const {chatId, userId} = context.params;
      const updates = {};

      const chat = (await db.ref(`/chats/${chatId}`).get()).val();
      const user = (await db.ref(`/users/${userId}`).get()).val();
      const userChatRef = await db.ref(`/user-chats/${userId}/${chatId}`).get();
      const users = Object.keys((chat || {}).users || {});

      const messageId = db.ref().push().key;
      const message = {
        author: {
          id: userId,
          name: user.name,
        },
        time: TIMESTAMP,
      };
      if (change.after.val()) {
        message.type = "join";
      } else {
        message.type = "leave";
        if (userChatRef.exists()) users.unshift(userId);
      }

      users.forEach((id) => {
        updates[`/user-chats/${id}/${chatId}/lastMessage`] = message;
        updates[`/user-messages/${id}/${chatId}/${messageId}`] = message;
      });

      await db.ref().update(updates);
    });

/*
 * Message
 */
exports.onCreateMessage = functions
    .database
    .ref("/user-messages/{userId}/{chatId}/{messageId}")
    .onCreate(async (snap, context) => {
      const {userId, chatId, messageId} = context.params;
      const message = snap.val();
      if (message.author.id === userId) {
        const updates = {};
        const chat = await db.ref(`/chats/${chatId}`).get();
        const users = Object.keys((chat.val() || {}).users || {});
        users.forEach((id) => {
          updates[`/user-chats/${id}/${chatId}/lastMessage`] = message;
          if (id !== userId) {
            updates[`/user-chats/${id}/${chatId}/unread/${messageId}`] = true;
            updates[`/user-messages/${id}/${chatId}/${messageId}`] = message;
          }
        });
        await db.ref().update(updates);
      }
    });
