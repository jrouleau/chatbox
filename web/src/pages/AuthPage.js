import * as React from 'react';
import { Route } from 'react-router-dom';
import { useMe } from '../contexts/MeCtx';

export function AuthRoute({ style, ...props }) {
  console.log('AuthRoute');

  return (
    <Route {...props}>
      <AuthPage style={style} />
    </Route>
  );
}

function AuthPage({ style }) {
  console.log('AuthPage');

  const me = useMe();

  const anonymousLogin = (e) => {
    e.target.disabled = true;
    me.signInAnonymously().catch((err) => {
      e.target.disabled = false;
      throw err;
    });
  };

  return (
    <div style={style}>
      <p>AuthPage</p>
      <button onClick={anonymousLogin}>Continue Anonymously</button>
    </div>
  );
}
