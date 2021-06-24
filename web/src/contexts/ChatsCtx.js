import { db } from '../firebase';
import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import { useMe } from './MeCtx';

export const ChatsCtx = React.createContext();

export const ChatsProvider = ({ children }) => {
  const me = useMe();

  const [userChats, userChatsLoading] = db.useListVals(
    me.isAuth &&
      db.ref(`/user-chats/${me.id}`).orderByChild('lastMessage/time'),
    { keyField: 'id' },
  );
  const isLoading = me.isAuth && userChatsLoading;

  const match = ReactRouter.useRouteMatch({ path: '/c/:chatId', exact: true });
  const selectedChatId = match?.params?.chatId;
  const list = React.useMemo(() => {
    const a = [
      ...((userChats || []).slice().reverse() || []).map((c) => ({
        ...c,
        selected: c.id === selectedChatId,
      })),
    ];
    if (selectedChatId && !a.find((c) => c.id === selectedChatId)) {
      a.unshift({
        id: selectedChatId,
        selected: true,
      });
    }
    return a;
  }, [selectedChatId, userChats]);

  const iface = React.useMemo(
    () => ({
      list,
      isLoading,
    }),
    [list, isLoading],
  );

  return <ChatsCtx.Provider value={iface}>{children}</ChatsCtx.Provider>;
};

export const useChats = () => {
  const chats = React.useContext(ChatsCtx);
  if (!chats) throw new Error('Missing ChatsCtx.Provider');
  return chats;
};
