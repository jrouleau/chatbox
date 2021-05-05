import firebase, { db } from './firebase';
import * as React from 'react';

function App() {
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

  const send = () => {
    const message = inputRef.current?.value;
    if (message) inputRef.current.value = '';

    db.collection('chats').doc('TODO').collection('messages').add({
      author: 'TODO',
      message,
      time: firebase.firestore.FieldValue.serverTimestamp(),
    });
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
      <input ref={inputRef} type="text"></input>
      <button onClick={send}>Send</button>
    </>
  );
}

export default App;
