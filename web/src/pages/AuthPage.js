import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import styled from 'styled-components';
import { useMe } from '../contexts/MeCtx';

const Styles = styled.div`
  width: 100%;
`;

export function AuthRoute({ style, ...props }) {
  console.log('AuthRoute');

  return (
    <ReactRouter.Route {...props}>
      <AuthPage style={style} />
    </ReactRouter.Route>
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
    <Styles style={style}>
      <p>AuthPage</p>
      <button onClick={anonymousLogin}>Continue Anonymously</button>
    </Styles>
  );
}
