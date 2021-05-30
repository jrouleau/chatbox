import firebase, { firestore, functions } from '../firebase';
import * as React from 'react';
import { useChat } from './ChatCtx';
import { useMe } from './MeCtx';

export const MessagesCtx = React.createContext();

export const MessagesProvider = ({ children }) => {
  const me = useMe();
  const chat = useChat();

  const [sending, setSending] = React.useState();
  const [messages, setMessages] = React.useState();
  React.useEffect(() => {
    setSending();
    setMessages();
    return firestore
      .collection('users')
      .doc(me.id)
      .collection('chats')
      .doc(chat.id)
      .collection('messages')
      .orderBy('time', 'desc')
      .onSnapshot((s) => {
        setSending((p = []) => {
          const ids = s.docs.map((d) => d.id);
          return p.filter((msg) => !ids.includes(msg.id));
        });
        setMessages(
          s.docs.reverse().map((d) => ({
            ...(d.data() || {}),
            id: d.id,
          })),
        );
      });
  }, [me.id, chat.id]);

  const send = React.useCallback(
    (text) => {
      if (text) {
        const { id } = firestore.collection('id').doc();

        functions.httpsCallable('sendMessage')({
          chatId: chat.id,
          messageId: id,
          text,
        });

        setSending((p) => [
          ...p,
          {
            id,
            author: {
              id: me.id,
              displayName: me.displayName,
            },
            text,
            time: firebase.firestore.Timestamp.now(),
            isSending: true,
          },
        ]);
      }
    },
    [me.id, me.displayName, chat.id],
  );

  const iface = React.useMemo(
    () => ({
      list: [...(messages || []), ...(sending || [])],
      isLoading: !messages,
      send,
    }),
    [messages, sending, send],
  );

  return <MessagesCtx.Provider value={iface}>{children}</MessagesCtx.Provider>;
};

export const useMessages = () => {
  const messages = React.useContext(MessagesCtx);
  if (!messages) throw new Error('Missing MessagesCtx.Provider');
  return messages;
};
