const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp();
const db = admin.firestore();

const distributeMessage = async ({chatId, messageId, message}) => {
  const chat = await db
      .collection("chats")
      .doc(chatId)
      .get()
      .then((doc) => doc.data() || {});
  const users = Object.keys(chat.users || {});

  return Promise.all(users.map((userId) => Promise.all([
    db
        .collection("users")
        .doc(userId)
        .collection("chats")
        .doc(chatId)
        .collection("messages")
        .doc(messageId)
        .set(message),
    db
        .collection("users")
        .doc(userId)
        .collection("chats")
        .doc(chatId)
        .set({
          lastMessage: message,
        }, {merge: true}),
  ])));
};
exports.sendMessage = functions.https.onCall(async (data, context) => {
  const {chatId, messageId, text} = data;
  const {auth} = context;

  const message = {
    author: auth.uid,
    text,
    time: admin.firestore.Timestamp.now(),
  };

  return distributeMessage({
    chatId,
    messageId,
    message,
  });
});

const joinChat = async (data, context) => {
  const {chatId} = data;
  const {auth} = context;

  const messageId = db.collection("id").doc().id;
  const message = {
    author: auth.uid,
    text: "has joined.",
    time: admin.firestore.Timestamp.now(),
  };

  await db
      .collection("chats")
      .doc(chatId)
      .set({
        users: {
          [auth.uid]: true,
        },
      }, {merge: true});

  return distributeMessage({
    chatId,
    messageId,
    message,
  });
};
exports.joinChat = functions.https.onCall(joinChat);

const leaveChat = async (data, context) => {
  const {chatId} = data;
  const {auth} = context;

  const messageId = db.collection("id").doc().id;
  const message = {
    author: auth.uid,
    text: "has left.",
    time: admin.firestore.Timestamp.now(),
  };

  await distributeMessage({
    chatId,
    messageId,
    message,
  });

  return db
      .collection("chats")
      .doc(chatId)
      .set({
        users: {
          [auth.uid]: admin.firestore.FieldValue.delete(),
        },
      }, {merge: true});
};
exports.leaveChat = functions.https.onCall(leaveChat);

exports.deleteUser = functions
    .auth
    .user()
    .onDelete((auth) => Promise.all([
      db
          .collection("chats")
          .where(`users.${auth.uid}`, "==", true)
          .get()
          .then((chats) => {
            const p = [];
            chats.forEach((chat) =>
              p.push(leaveChat({chatId: chat.id}, {auth})),
            );
            return Promise.all(p);
          }),
      db
          .collection("users")
          .doc(auth.uid)
          .delete(),
      // TODO: delete messages
    ]));
