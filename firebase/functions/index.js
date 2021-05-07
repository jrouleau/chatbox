const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp();
const db = admin.firestore();

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
