import { auth, db } from '../firebase';
import * as React from 'react';
import * as ReactRouter from 'react-router-dom';

export function ChatList() {
  console.log('ChatList');

  const history = ReactRouter.useHistory();

  const [chats, setChats] = React.useState([]);
  React.useEffect(
    () =>
      db
        .collection('users')
        .doc(auth.currentUser.uid)
        .collection('chats')
        .orderBy('lastMessage.time', 'desc')
        .onSnapshot((snap) => {
          setChats(
            snap.docs.map((doc) => ({
              ...doc.data({ serverTimestamps: 'estimate' }),
              id: doc.id,
            })),
          );
        }),
    [],
  );

  const selectChat = (id) => {
    history.push(`/${id}`);
  };

  return (
    <>
      <p>ChatList</p>
      <ol>
        {chats.map(({ id, lastMessage }) => (
          <li key={id}>
            <button onClick={() => selectChat(id)}>{id}</button>
            <span>
              {` (${lastMessage?.author.slice(0, 4)}) ${lastMessage?.text}`}
            </span>
          </li>
        ))}
      </ol>
    </>
  );
}
