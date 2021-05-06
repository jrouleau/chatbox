import firebase, { auth, db } from '../firebase';
import * as React from 'react';

function ChatPage() {
  console.log('ChatPage');

  const inputRef = React.useRef();
  const [messages, setMessages] = React.useState([]);

  React.useEffect(
    () =>
      db
        .collection('chats')
        .doc('TODO')
        .collection('messages')
        .orderBy('time', 'desc')
        .limit(10)
        .onSnapshot((snap) => {
          setMessages(snap.docs.reverse());
        }),
    [],
  );

  const send = (event) => {
    event.preventDefault();
    const message = inputRef.current?.value;
    if (message) inputRef.current.value = '';

    db.collection('chats').doc('TODO').collection('messages').add({
      author: 'TODO',
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
              {`${time.toDate().toLocaleString()} (${author}): ${message}`}
            </li>
          );
        })}
      </ol>
      <form onSubmit={send}>
        <input ref={inputRef} type="text" />
        <button type="submit">Send</button>
      </form>
      <button onClick={logout}>Logout</button>
      <button onClick={deleteAccount}>Delete Account</button>
    </>
  );
}

export default ChatPage;
