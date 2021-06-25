import firebase, { db } from '../firebase';
import * as React from 'react';
import { useMe } from './MeCtx';

export const ChatCtx = React.createContext();

export const ChatProvider = ({ children, chatId }) => {
  const me = useMe();

  const [chat, chatLoading] = db.useObjectVal(db.ref(`/chats/${chatId}`));
  const [userChat, userChatLoading] = db.useObjectVal(
    me.isAuth && db.ref(`/user-chats/${me.id}/${chatId}`),
  );
  const isLoading = chatLoading || (me.isAuth && userChatLoading);

  const iface = React.useMemo(() => {
    return {
      ...chat,
      ...userChat,
      joined: !!((chat || {}).users || {})[me.id],
      id: chatId,
      isLoading,
      join: () =>
        db.ref().update({
          [`/chats/${chatId}/users/${me.id}`]: firebase.database.ServerValue
            .TIMESTAMP,
        }),
      leave: () =>
        db.ref().update({
          [`/chats/${chatId}/users/${me.id}`]: null,
        }),
      delete: () =>
        db.ref().update({
          [`/chats/${chatId}/users/${me.id}`]: null,
          [`/user-chats/${me.id}/${chatId}`]: null,
        }),
      markRead: () =>
        db.ref().update({
          [`/user-chats/${me.id}/${chatId}/unread`]: null,
        }),
    };
  }, [me.id, chatId, chat, userChat, isLoading]);

  return <ChatCtx.Provider value={iface}>{children}</ChatCtx.Provider>;
};

export const useChat = () => {
  const chat = React.useContext(ChatCtx);
  if (!chat) throw new Error('Missing ChatCtx.Provider');
  return chat;
};
