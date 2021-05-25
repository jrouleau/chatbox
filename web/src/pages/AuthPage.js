import * as React from 'react';
import styled from 'styled-components';
import { useMe } from '../contexts/MeCtx';

const Styles = styled.div`
  width: 100%;
`;

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
    <Styles style={style}>
      <p>AuthPage</p>
      <button onClick={anonymousLogin}>Continue Anonymously</button>
    </Styles>
  );
}
