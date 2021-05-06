import firebase, { auth, db } from '../firebase';
import * as React from 'react';
import * as ReactRouter from 'react-router-dom';

export function ChatPage({ id }) {
  console.log('ChatPage');

  const inputRef = React.useRef();
  const [messages, setMessages] = React.useState([]);
  const history = ReactRouter.useHistory();

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
    history.push('/');
    auth.signOut();
  };

  const deleteAccount = () => {
    history.push('/');
    auth.currentUser?.delete();
  };

  return (
    <>
      <p>ChatPage</p>
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
      <button disabled={auth.currentUser?.isAnonymous} onClick={logout}>
        Logout
      </button>
      <button onClick={deleteAccount}>Delete Account</button>
    </>
  );
}
