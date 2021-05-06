import { auth } from '../firebase';
import * as React from 'react';
import { AuthPage } from '../pages/AuthPage';

export function AuthRouter({ children }) {
  console.log('AuthRouter');

  const [user, setUser] = React.useState(null);

  React.useEffect(() =>
    auth.onAuthStateChanged((u) => {
      setUser(u);
    }),
  );

  return user ? children : <AuthPage />;
}
