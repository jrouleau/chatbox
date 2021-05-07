import firebase, { auth, db } from '../firebase';
import * as React from 'react';
import * as ReactRouter from 'react-router-dom';

export function ChatPane({ chatId }) {
  console.log('ChatPane');

  const inputRef = React.useRef();
  const [messages, setMessages] = React.useState([]);
  const history = ReactRouter.useHistory();

  React.useEffect(
    () =>
      db
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .orderBy('time', 'desc')
        .limit(10)
        .onSnapshot((snap) => {
          setMessages(snap.docs.reverse());
        }),
    [chatId],
  );

  const send = (event) => {
    event.preventDefault();
    const message = inputRef.current?.value;
    if (message) inputRef.current.value = '';

    db.collection('chats').doc(chatId).collection('messages').add({
      author: auth.currentUser.uid,
      message,
      time: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  return (
    <>
      <p>ChatPane</p>
      <button onClick={() => history.goBack()}>Back</button>
      <ol>
        {messages.map((doc) => {
          const { author, message, time } = doc.data({
            serverTimestamps: 'estimate',
          });
          return (
            <li key={doc.id}>
              {`${time.toDate().toLocaleString()} ` +
                `(${author.slice(0, 4)}): ` +
                `${message}`}
            </li>
          );
        })}
      </ol>
      <form onSubmit={send}>
        <input ref={inputRef} type="text" />
        <button type="submit">Send</button>
      </form>
    </>
  );
}
