import { db } from '../firebase';
import * as React from 'react';

export const UsersCtx = React.createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = React.useState({});
  const get = React.useCallback(
    (id) => {
      if (!id) return {};
      if (users[id]) return users[id];
      db.ref(`/users/${id}`)
        .once('value')
        .then((s) => {
          setUsers((p) => ({ ...p, [id]: { ...(s.val() || {}), id } }));
        });
      return { id };
    },
    [users],
  );

  const iface = React.useMemo(() => {
    return {
      get,
    };
  }, [get]);

  return <UsersCtx.Provider value={iface}>{children}</UsersCtx.Provider>;
};

export const useUsers = () => {
  const users = React.useContext(UsersCtx);
  if (!users) throw new Error('Missing UsersCtx.Provider');
  return users;
};
