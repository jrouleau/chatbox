import { auth, db } from '../firebase';
import * as React from 'react';
import { Loading } from '../components/Loading';
import { NewUserPage } from '../pages/NewUserPage';

export function NewUserRouter({ children }) {
  console.log('NewUserRouter');

  const [, setState] = React.useState();
  const render = React.useCallback(() => setState({}), []);

  const [user, setUser] = React.useState();
  React.useEffect(
    () =>
      db
        .collection('users')
        .doc(auth.currentUser.uid)
        .onSnapshot((doc) => setUser(doc.data() || {})),
    [],
  );

  if (!user) return <Loading />;
  return user.displayName ? children : <NewUserPage onSave={render} />;
}
