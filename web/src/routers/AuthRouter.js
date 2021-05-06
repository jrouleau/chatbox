import { auth } from '../firebase';
import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Loading } from '../components/Loading';
import { AuthPage } from '../pages/AuthPage';
import { HomePage } from '../pages/HomePage';

export function AuthRouter({ children }) {
  console.log('AuthRouter');

  const [user, setUser] = React.useState(undefined);

  React.useEffect(() =>
    auth.onAuthStateChanged((u) => {
      setUser(u);
    }),
  );

  if (user === undefined) return <Loading />;
  return user ? (
    children
  ) : (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route component={AuthPage} />
      </Switch>
    </BrowserRouter>
  );
}
