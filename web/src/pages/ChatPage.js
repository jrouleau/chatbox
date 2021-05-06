import firebase, { auth, db } from '../firebase';
import * as React from 'react';

export function ChatPage({ id }) {
  console.log('ChatPage');

  const inputRef = React.useRef();
  const [messages, setMessages] = React.useState([]);

  React.useEffect(
    () =>
      db
        .collection('chats')
        .doc(id)
        .collection('messages')
        .orderBy('time', 'desc')
        .limit(10)
        .onSnapshot((snap) => {
          setMessages(snap.docs.reverse());
        }),
    [id],
  );

  const send = (event) => {
    event.preventDefault();
    const message = inputRef.current?.value;
    if (message) inputRef.current.value = '';

    db.collection('chats')
      .doc(id)
      .collection('messages')
      .add({
        author: {
          displayName: auth.currentUser.displayName,
          uid: auth.currentUser.uid,
        },
        message,
        time: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };

  const logout = () => {
    auth.signOut();
  };

  const deleteAccount = () => {
    auth.currentUser?.delete();
  };

  return (
    <>
      <ol>
        {messages.map((doc) => {
          const { author, message, time } = doc.data({
            serverTimestamps: 'estimate',
          });
          return (
            <li key={doc.id}>
              {`${time.toDate().toLocaleString()} ` +
                `(${
                  author.uid === auth.currentUser.uid
                    ? 'me'
                    : author.displayName
                }): ` +
                `${message}`}
            </li>
          );
        })}
      </ol>
      <form onSubmit={send}>
        <input ref={inputRef} type="text" />
        <button type="submit">Send</button>
      </form>
      <button disabled={auth.currentUser.isAnonymous} onClick={logout}>
        Logout
      </button>
      <button onClick={deleteAccount}>Delete Account</button>
    </>
  );
}
