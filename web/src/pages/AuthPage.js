import * as React from 'react';
import { useMe } from '../contexts/MeCtx';

export function AuthPage({ style }) {
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
