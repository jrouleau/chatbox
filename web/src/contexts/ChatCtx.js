import firebase, { db, functions } from '../firebase';
import * as React from 'react';
import { useMe } from './MeCtx';

export const ChatCtx = React.createContext();

export const ChatProvider = ({ children, chatId }) => {
  const me = useMe();

  const [loading, setLoading] = React.useState({});
  const isLoading = Object.values(loading).includes(true);

  const [isJoined, setIsJoined] = React.useState({});

  const [chat, setChat] = React.useState();
  React.useEffect(() => {
    setLoading((p) => ({ ...p, chat: true }));
    setChat();
    return db
      .collection('chats')
      .doc(chatId)
      .onSnapshot((s) => {
        const data = s.data() || {};
        const joined = !!(data?.users && data.users[me.id]);
        setChat(data);
        setIsJoined(joined);
        setLoading((p) => ({
          ...p,
          chat: false,
          join: p.join && !joined,
          leave: p.leave && joined,
        }));
      });
  }, [chatId, me.id]);

  const [userChat, setUserChat] = React.useState();
  React.useEffect(() => {
    setLoading((p) => ({ ...p, userChat: true }));
    setUserChat();
    return db
      .collection('users')
      .doc(me.id)
      .collection('chats')
      .doc(chatId)
      .onSnapshot((s) => {
        setUserChat(s.data() || {});
        setLoading((p) => ({ ...p, userChat: false }));
      });
  }, [chatId, me.id]);

  const join = React.useCallback(async () => {
    setLoading((p) => ({ ...p, join: true }));
    await functions.httpsCallable('joinChat')({ chatId });
  }, [chatId]);

  const leave = React.useCallback(async () => {
    setLoading((p) => ({ ...p, leave: true }));
    await functions.httpsCallable('leaveChat')({ chatId });
  }, [chatId]);

  const del = React.useCallback(async () => {
    setLoading((p) => ({ ...p, delete: true }));
    await db
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
      isLoading,
      isJoined,
      join,
      leave,
      delete: del,
      markRead,
    }),
    [chat, userChat, chatId, isLoading, isJoined, join, leave, del, markRead],
  );

  return <ChatCtx.Provider value={iface}>{children}</ChatCtx.Provider>;
};

export const useChat = () => {
  const chat = React.useContext(ChatCtx);
  if (!chat) throw new Error('Missing ChatCtx.Provider');
  return chat;
};
