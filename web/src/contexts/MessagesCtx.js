import firebase, { db } from '../firebase';
import * as React from 'react';
import { useChat } from './ChatCtx';
import { useMe } from './MeCtx';

export const MessagesCtx = React.createContext();

export const MessagesProvider = ({ children }) => {
  const me = useMe();
  const chat = useChat();

  const messagesRef = React.useMemo(
    () => db.ref(`/user-messages/${me.id}/${chat.id}`),
    [me.id, chat.id],
  );

  const [messages, messagesLoading] = db.useListVals(
    messagesRef.orderByChild('time'),
    { keyField: 'id' },
  );
  const isLoading = messagesLoading;

  const send = React.useCallback(
    async (text) => {
      await messagesRef.push({
        author: me.id,
        type: 'text',
        text,
        time: firebase.database.ServerValue.TIMESTAMP,
      });
    },
    [messagesRef, me.id],
  );

  const iface = React.useMemo(
    () => ({
      list: messages,
      isLoading,
      send,
    }),
    [messages, isLoading, send],
  );

  return <MessagesCtx.Provider value={iface}>{children}</MessagesCtx.Provider>;
};

export const useMessages = () => {
  const messages = React.useContext(MessagesCtx);
  if (!messages) throw new Error('Missing MessagesCtx.Provider');
  return messages;
};
