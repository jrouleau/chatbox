import firebase, { db, functions } from '../firebase';
import * as React from 'react';
import { useMe } from './MeCtx';

export const ChatCtx = React.createContext();

export const ChatProvider = ({ children, chatId }) => {
  const me = useMe();

  const [chat, setChat] = React.useState();
  React.useEffect(() => {
    setChat();
    return db
      .collection('chats')
      .doc(chatId)
      .onSnapshot((s) => setChat(s.data() || {}));
  }, [chatId]);

  const [userChat, setUserChat] = React.useState();
  React.useEffect(() => {
    setUserChat();
    return db
      .collection('users')
      .doc(me.id)
      .collection('chats')
      .doc(chatId)
      .onSnapshot((s) => setUserChat(s.data() || {}));
  }, [chatId, me.id]);

  const del = React.useCallback(() => {
    return db
      .collection('users')
      .doc(me.id)
      .collection('chats')
      .doc(chatId)
      .delete();
  }, [chatId, me.id]);

  const markRead = React.useCallback(() => {
    return db
      .collection('users')
      .doc(me.id)
      .collection('chats')
      .doc(chatId)
      .set({ unread: firebase.firestore.FieldValue.delete() }, { merge: true });
  }, [chatId, me.id]);

  const iface = React.useMemo(
    () => ({
      ...chat,
      ...userChat,
      id: chatId,
      isLoading: !(chat && userChat),
      isJoined: !!(chat?.users && chat.users[me.id]),
      join: async () => functions.httpsCallable('joinChat')({ chatId }),
      leave: async () => functions.httpsCallable('leaveChat')({ chatId }),
      delete: del,
      markRead,
    }),
    [chatId, me.id, chat, userChat, del, markRead],
  );

  return <ChatCtx.Provider value={iface}>{children}</ChatCtx.Provider>;
};

export const useChat = () => {
  const chat = React.useContext(ChatCtx);
  if (!chat) throw new Error('Missing ChatCtx.Provider');
  return chat;
};
