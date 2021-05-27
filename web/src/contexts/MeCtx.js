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
      return db
        .collection('users')
        .doc(authUser.uid)
        .onSnapshot((s) => setUser(s.data() || {}));
    }
  }, [authUser]);

  const [isDeleting, setIsDeleting] = React.useState(false);
  const del = React.useCallback(async () => {
    setIsDeleting(true);
    await authUser?.delete();
    setIsDeleting(false);
  }, [authUser]);

  const set = React.useCallback(
    async (k, v) => {
      if (authUser) {
        return db
          .collection('users')
          .doc(authUser.uid)
          .set({ [k]: v }, { merge: true });
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
      set,
    }),
    [authUser, user, isDeleting, del, set],
  );

  return <MeCtx.Provider value={iface}>{children}</MeCtx.Provider>;
};

export const useMe = () => {
  const me = React.useContext(MeCtx);
  if (!me) throw new Error('Missing MeCtx.Provider');
  return me;
};
