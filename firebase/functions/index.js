const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp();
const db = admin.firestore();

const distributeMessage = async ({chatId, messageId, message}) => {
  const chat = await db
      .collection("chats")
      .doc(chatId)
      .get()
      .then((d) => d.data() || {});
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
    !message.misc && (
      db
          .collection("users")
          .doc(userId)
          .collection("chats")
          .doc(chatId)
          .set({
            unread: {[messageId]: true},
            lastMessage: message,
          }, {merge: true})
    ),
  ])));
};
exports.sendMessage = functions.https.onCall(async (data, context) => {
  const {chatId, messageId, text} = data;
  const {auth} = context;

  const time = admin.firestore.Timestamp.now();

  const user = await db
      .collection("users")
      .doc(auth.uid)
      .get()
      .then((d) => d.data());

  const message = {
    author: {
      id: auth.uid,
      displayName: user.displayName,
    },
    text,
    time,
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

  const time = admin.firestore.Timestamp.now();

  const user = await db
      .collection("users")
      .doc(auth.uid)
      .get()
      .then((d) => d.data());

  const messageId = db.collection("id").doc().id;
  const message = {
    author: {
      id: auth.uid,
      displayName: user.displayName,
    },
    misc: "join",
    time,
  };

  await Promise.all([
    db
        .collection("chats")
        .doc(chatId)
        .set({
          users: {
            [auth.uid]: {
              displayName: user.displayName,
              time,
            },
          },
        }, {merge: true}),
    db
        .collection("users")
        .doc(auth.uid)
        .collection("chats")
        .doc(chatId)
        .set({
          lastMessage: message,
          joined: true,
        }, {merge: true}),
  ]);

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

  const time = admin.firestore.Timestamp.now();

  const user = await db
      .collection("users")
      .doc(auth.uid)
      .get()
      .then((d) => d.data());

  const messageId = db.collection("id").doc().id;
  const message = {
    author: {
      id: auth.uid,
      displayName: user.displayName,
    },
    misc: "leave",
    time,
  };

  await db
      .collection("users")
      .doc(auth.uid)
      .collection("chats")
      .doc(chatId)
      .set({
        lastMessage: message,
        joined: false,
      }, {merge: true});

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

exports.onChatUpdate = functions
    .firestore
    .document("/chats/{chatId}")
    .onUpdate(async (change, context) => {
      const {chatId} = context.params;
      const after = change.after.data() || {};
      if (Object.keys(after.users || {}).length === 0) {
        await db
            .collection("chats")
            .doc(chatId)
            .delete();
      }
    });

exports.onDeleteAuth = functions
    .auth
    .user()
    .onDelete(async (auth) => {
      await db
          .collection("chats")
          .where(`users.${auth.uid}`, "!=", false)
          .get()
          .then((chats) => {
            const p = [];
            chats.forEach((chat) =>
              p.push(leaveChat({chatId: chat.id}, {auth})),
            );
            return Promise.all(p);
          });
      await db
          .collection("users")
          .doc(auth.uid)
          .delete();
    });

exports.onDeleteUser = functions
    .firestore
    .document("/users/{uid}")
    .onDelete(async (user) => {
      db
          .collection("users")
          .doc(user.id)
          .collection("chats")
          .get()
          .then((chats) => {
            const p = [];
            chats.forEach((chat) => p.push(chat.ref.delete()));
            return Promise.all(p);
          });
    });

exports.onDeleteUserChat = functions
    .firestore
    .document("/users/{uid}/chats/{chatId}")
    .onDelete(async (chat) => {
      const messages = await chat.ref.collection("messages").get();
      const p = [];
      messages.forEach((message) => {
        p.push(message.ref.delete());
      });
      return Promise.all(p);
    });
