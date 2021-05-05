import { auth } from '../firebase';
import * as React from 'react';

function LoginPage() {
  console.log('LoginPage');

  const loginAnon = (e) => {
    e.target.disabled = true;
    auth.signInAnonymously().catch((err) => {
      e.target.disabled = false;
      throw err;
    });
  };

  return (
    <>
      <button onClick={loginAnon}>Continue Anonymously</button>
    </>
  );
}

export default LoginPage;
