import firebase, { auth, db, functions } from '../firebase';
import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import { Loading } from '../components/Loading';

export function ChatPane({ chatId }) {
  console.log('ChatPane');

  const inputRef = React.useRef();
  const history = ReactRouter.useHistory();

  const [chat, setChat] = React.useState();
  const chatRef = React.useMemo(() => db.collection('chats').doc(chatId), [
    chatId,
  ]);
  React.useEffect(
    () =>
      chatRef.onSnapshot((doc) => {
        setChat(doc.data() || {});
      }),
    [chatRef],
  );

  const [messages, setMessages] = React.useState([]);
  const messagesRef = React.useMemo(
    () =>
      db
        .collection('users')
        .doc(auth.currentUser.uid)
        .collection('chats')
        .doc(chatId)
        .collection('messages'),
    [chatId],
  );
  React.useEffect(
    () =>
      messagesRef
        .orderBy('time', 'desc')
        .limit(10)
        .onSnapshot((snap) => {
          setSending((prev) => {
            const ids = snap.docs.map((doc) => doc.id);
            return prev.filter((msg) => !ids.includes(msg.id));
          });
          setMessages(
            snap.docs.reverse().map((doc) => ({
              ...doc.data({ serverTimestamps: 'estimate' }),
              id: doc.id,
            })),
          );
        }),
    [messagesRef],
  );

  const join = () => {
    chatRef.set(
      {
        users: { [auth.currentUser.uid]: true },
      },
      { merge: true },
    );
  };

  const leave = () => {
    chatRef.set(
      {
        users: {
          [auth.currentUser.uid]: firebase.firestore.FieldValue.delete(),
        },
      },
      { merge: true },
    );
  };

  const [sending, setSending] = React.useState([]);
  const send = (event) => {
    event.preventDefault();
    const text = inputRef.current?.value;
    if (text) {
      inputRef.current.value = '';
      const messageId = db.collection('id').doc().id;

      functions.httpsCallable('sendMessage')({
        chatId,
        messageId,
        text,
      });

      const message = {
        id: messageId,
        author: auth.currentUser.uid,
        text: `${text} (SENDING)`,
        time: firebase.firestore.Timestamp.now(),
      };

      setSending((prev) => [...prev, message]);
    }
  };

  if (!chat) return <Loading />;
  return (
    <>
      <p>ChatPane</p>
      <button onClick={() => history.goBack()}>Back</button>
      {!(chat.users || {})[auth.currentUser.uid] ? (
        <button onClick={join}>Join Chat</button>
      ) : (
        <button onClick={leave}>Leave Chat</button>
      )}
      <span> ({Object.keys(chat.users || {}).length})</span>
      <ol>
        {[...messages, ...sending]
          .slice(-10)
          .map(({ id, author, text, time }) => (
            <li key={id}>
              {`${time.toDate().toLocaleString()} ` +
                `(${author.slice(0, 4)}) ` +
                `${text}`}
            </li>
          ))}
      </ol>
      {(chat.users || {})[auth.currentUser.uid] && (
        <form onSubmit={send}>
          <input ref={inputRef} type="text" />
          <button type="submit">Send</button>
        </form>
      )}
    </>
  );
}
