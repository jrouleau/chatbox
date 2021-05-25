import { db } from '../firebase';
import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import { useMe } from './MeCtx';

export const ChatsCtx = React.createContext();

export const ChatsProvider = ({ children }) => {
  const me = useMe();

  const match = ReactRouter.useRouteMatch({
    path: '/:chatId',
    exact: true,
  });
  const chatId = match?.params?.chatId;

  const [chats, setChats] = React.useState();
  React.useEffect(() => {
    setChats();
    return db
      .collection('users')
      .doc(me.id)
      .collection('chats')
      .orderBy('lastMessage.time', 'desc')
      .onSnapshot((s) => {
        setChats(
          s.docs.map((d) => ({
            ...(d.data() || {}),
            id: d.id,
          })),
        );
      });
  }, [me.id]);

  const [chat, setChat] = React.useState();
  React.useEffect(() => {
    setChat();
    if (chatId) {
      return db
        .collection('chats')
        .doc(chatId)
        .onSnapshot((s) => {
          setChat(s.data() || {});
        });
    }
  }, [chatId]);

  const list = React.useMemo(() => {
    const a = [
      ...(chats || []).map((c) => ({
        ...c,
        selected: c.id === chatId,
      })),
    ];
    if (chatId && !a.find((c) => c.id === chatId)) {
      a.unshift({
        ...(chat || {}),
        id: chatId,
        selected: true,
      });
    }
    return a;
  }, [chatId, chats, chat]);

  const iface = React.useMemo(
    () => ({
      list,
      isLoading: !chats,
    }),
    [list, chats],
  );

  return <ChatsCtx.Provider value={iface}>{children}</ChatsCtx.Provider>;
};

export const useChats = () => {
  const chats = React.useContext(ChatsCtx);
  if (!chats) throw new Error('Missing ChatsCtx.Provider');
  return chats;
};
