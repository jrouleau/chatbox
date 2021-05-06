import { auth } from '../firebase';
import * as React from 'react';
import { Loading } from '../components/Loading';
import { AuthPage } from '../pages/AuthPage';

export function AuthRouter({ children }) {
  console.log('AuthRouter');

  const [user, setUser] = React.useState(undefined);

  React.useEffect(() =>
    auth.onAuthStateChanged((u) => {
      setUser(u);
    }),
  );

  if (user === undefined) return <Loading />;
  return user ? children : <AuthPage />;
}
