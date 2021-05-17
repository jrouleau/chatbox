import { db } from '../firebase';
import * as React from 'react';
import { useMe } from './MeCtx';

export const ChatsCtx = React.createContext();

export const ChatsProvider = ({ children }) => {
  const me = useMe();

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

  const iface = React.useMemo(
    () => ({
      list: [...(chats || [])],
      isLoading: !chats,
    }),
    [chats],
  );

  return <ChatsCtx.Provider value={iface}>{children}</ChatsCtx.Provider>;
};

export const useChats = () => {
  const chats = React.useContext(ChatsCtx);
  if (!chats) throw new Error('Missing ChatsCtx.Provider');
  return chats;
};
