import firebase, { auth, db, functions } from '../firebase';
import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import { Loading } from '../components/Loading';

export function ChatPane({ style, chatId }) {
  console.log('ChatPane');

  const inputRef = React.useRef();
  const history = ReactRouter.useHistory();

  const [chat, setChat] = React.useState();
  React.useEffect(() => {
    setChat();
    return db
      .collection('chats')
      .doc(chatId)
      .onSnapshot((doc) => {
        setChat(doc.data() || {});
      });
  }, [chatId]);

  // const [userChat, setUserChat] = React.useState();
  React.useEffect(() => {
    // setUserChat();
    const chatRef = db
      .collection('users')
      .doc(auth.currentUser.uid)
      .collection('chats')
      .doc(chatId);

    return chatRef.onSnapshot((doc) => {
      const data = doc.data() || {};
      // setUserChat(data);
      if (Object.keys(data.unread || {}).length > 0) {
        chatRef.set(
          { unread: firebase.firestore.FieldValue.delete() },
          { merge: true },
        );
      }
    });
  }, [chatId]);

  const [messages, setMessages] = React.useState([]);
  React.useEffect(
    () =>
      db
        .collection('users')
        .doc(auth.currentUser.uid)
        .collection('chats')
        .doc(chatId)
        .collection('messages')
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
    [chatId],
  );

  const join = async (event) => {
    event.target.disabled = true;
    await functions.httpsCallable('joinChat')({ chatId });
    event.target.disabled = false;
  };

  const leave = async (event) => {
    event.target.disabled = true;
    await functions.httpsCallable('leaveChat')({ chatId });
    event.target.disabled = false;
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
    <div
      style={{
        ...style,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <p>ChatPane</p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <button onClick={() => history.goBack()}>Back</button>
        {!(chat.users || {})[auth.currentUser.uid] ? (
          <button onClick={join}>Join Chat</button>
        ) : (
          <button onClick={leave}>Leave Chat</button>
        )}
        <span> ({Object.keys(chat.users || {}).length})</span>
      </div>
      <ol>
        {[...messages, ...sending]
          .slice(-10)
          .map(({ id, author, text, time }) => (
            <li
              key={id}
              style={{
                listStyleType: 'none',
              }}
            >
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
    </div>
  );
}
