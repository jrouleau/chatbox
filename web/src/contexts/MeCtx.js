import { db, auth } from '../firebase';
import * as React from 'react';

export const MeCtx = React.createContext();

export const MeProvider = ({ children }) => {
  const [authUser, setAuthUser] = React.useState(undefined);
  React.useEffect(() => auth.onAuthStateChanged((u) => setAuthUser(u)));

  const [user, setUser] = React.useState();
  React.useEffect(() => {
    setUser();
    if (authUser) {
      const ref = `/users/${authUser.uid}`;
      const listener = (s) => {
        setUser(s.val() || {});
      };

      db.ref(ref).on('value', listener);
      return () => db.ref(ref).off('value', listener);
    }
  }, [authUser]);

  const [isDeleting, setIsDeleting] = React.useState(false);
  const del = React.useCallback(async () => {
    setIsDeleting(true);
    await authUser?.delete();
    setIsDeleting(false);
  }, [authUser]);

  const update = React.useCallback(
    async (data) => {
      if (authUser) {
        return db.ref(`/users/${authUser.uid}`).update(data);
      }
    },
    [authUser],
  );

  const iface = React.useMemo(
    () => ({
      ...(user || {}),
      id: authUser?.uid || undefined,
      isLoading: authUser === undefined || (authUser && !user) || isDeleting,
      isAnonymous: !!authUser?.isAnonymous,
      isAuth: !!authUser,
      signInAnonymously: () => auth.signInAnonymously(),
      signOut: () => auth.signOut(),
      delete: del,
      update,
    }),
    [authUser, user, isDeleting, del, update],
  );

  return <MeCtx.Provider value={iface}>{children}</MeCtx.Provider>;
};

export const useMe = () => {
  const me = React.useContext(MeCtx);
  if (!me) throw new Error('Missing MeCtx.Provider');
  return me;
};
