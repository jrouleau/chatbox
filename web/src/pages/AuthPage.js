import { auth } from '../firebase';
import * as React from 'react';

export function AuthPage() {
  console.log('AuthPage');

  const anonymousLogin = (e) => {
    e.target.disabled = true;
    auth.signInAnonymously().catch((err) => {
      e.target.disabled = false;
      throw err;
    });
  };

  return (
    <>
      <button onClick={anonymousLogin}>Continue Anonymously</button>
    </>
  );
}
