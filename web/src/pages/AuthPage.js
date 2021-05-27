import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import styled from 'styled-components';
import { useMe } from '../contexts/MeCtx';

const Styles = styled.div`
  height: 100%;
  width: 100%;
  max-width: 124rem;
  margin: 0 auto;
  padding: 0 2.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > nav {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 2.4rem;

    & > .spacer {
      flex-grow: 1;
    }
  }

  & > .buttons {
    width: 38.4rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > h3 {
      margin-bottom: 1.2rem;
      font-size: 2.4rem;
    }

    & > .divider {
      margin: 0.6rem 0;
      font-weight: 600;
    }

    & > button {
      width: 100%;
      margin: 0.4rem 0;
    }
  }
`;

export function AuthPage({ style }) {
  console.log('AuthPage');

  const history = ReactRouter.useHistory();
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
      <nav>
        <div className="spacer" />
        <button className="icon transparent" onClick={() => history.goBack()}>
          close
        </button>
      </nav>
      <div className="buttons">
        <h3>Login with</h3>
        <button disabled>Google</button>
        <button disabled>Facebook</button>
        <button disabled>GitHub</button>
        <button disabled>Email</button>
        <p className="divider">or</p>
        <button className="inverted" onClick={anonymousLogin}>
          Continue Anonymously
        </button>
      </div>
    </Styles>
  );
}
