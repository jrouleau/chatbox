const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp();
const db = admin.firestore();

exports.sendMessage = functions
    .firestore
    .document("/users/{uid}/chats/{chatId}/messages/{messageId}")
    .onCreate(async (snap, context) => {
      const message = snap.data();
      const {uid, chatId, messageId} = context.params;

      if (message.author === uid) {
        const chat = await db
            .collection("chats")
            .doc(chatId)
            .get()
            .then((doc) => doc.data() || {});
        const users = Object.keys(chat.users || {}).filter((v) => v !== uid);

        return Promise.all(users.map((userId) => db
            .collection("users")
            .doc(userId)
            .collection("chats")
            .doc(chatId)
            .collection("messages")
            .doc(messageId)
            .set(message),
        ));
      }
    });

exports.deleteUser = functions
    .auth
    .user()
    .onDelete(({uid}) => Promise.all([
      db
          .collection("chats")
          .where(`users.${uid}`, "==", true)
          .get()
          .then((snap) => {
            const p = [];
            snap.forEach((doc) => p.push(doc.ref.set({
              users: {
                [uid]: admin.firestore.FieldValue.delete(),
              },
            }, {merge: true})));
            return Promise.all(p);
          }),
      db
          .collection("users")
          .doc(uid)
          .delete(),
      // TODO: delete messages
    ]));
