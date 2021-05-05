import firebase, { auth, db } from './firebase';
import * as React from 'react';
import AuthRouter from './routers/AuthRouter';

function App() {
  console.log('App');

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

  const logout = () => {
    auth.signOut();
  };

  return (
    <AuthRouter>
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
      <div>
        <input ref={inputRef} type="text"></input>
        <button onClick={send}>Send</button>
      </div>
      <button onClick={logout}>Logout</button>
    </AuthRouter>
  );
}

export default App;
