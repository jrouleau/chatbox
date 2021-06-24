import { db } from '../firebase';
import * as React from 'react';
import { useMe } from './MeCtx';

export const ChatCtx = React.createContext();

export const ChatProvider = ({ children, chatId }) => {
  const me = useMe();

  const chatRef = React.useMemo(() => db.ref(`/chats/${chatId}`), [chatId]);
  const [chat, chatLoading] = db.useObjectVal(chatRef);

  const userChatRef = React.useMemo(
    () => db.ref(`/user-chats/${me.id}/${chatId}`),
    [me.id, chatId],
  );
  const [userChat, userChatLoading] = db.useObjectVal(me.isAuth && userChatRef);

  const isLoading = chatLoading || (me.isAuth && userChatLoading);

  const iface = React.useMemo(() => {
    return {
      ...chat,
      ...userChat,
      id: chatId,
      isLoading,
      join: () => userChatRef.update({ joined: true }),
      leave: () => userChatRef.update({ joined: false }),
      delete: () => userChatRef.remove(),
      markRead: () => userChatRef.child('unread').set(null),
    };
  }, [userChatRef, chat, userChat, chatId, isLoading]);

  return <ChatCtx.Provider value={iface}>{children}</ChatCtx.Provider>;
};

export const useChat = () => {
  const chat = React.useContext(ChatCtx);
  if (!chat) throw new Error('Missing ChatCtx.Provider');
  return chat;
};
