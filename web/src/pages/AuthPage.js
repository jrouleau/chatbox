import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../components/Button';
import { Nav, Spacer } from '../components/Nav';
import { Page } from '../components/Page';
import { useMe } from '../contexts/MeCtx';

const Styles = styled(Page)`
  max-width: 124rem;

  & > .buttons {
    width: 100%;
    max-width: 38.4rem;
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
      white-space: initial;
    }
  }
`;

export function AuthPage({ style }) {
  const history = ReactRouter.useHistory();
  const me = useMe();

  const cancel = () => {
    history.goBack();
  };

  const anonymousLogin = (e) => {
    e.target.disabled = true;
    me.signInAnonymously().catch((err) => {
      e.target.disabled = false;
      throw err;
    });
  };

  return (
    <Styles style={style}>
      <Nav>
        <Spacer />
        <Button
          className="transparent circle icon"
          tooltip="Cancel"
          onClick={cancel}
        >
          close
        </Button>
      </Nav>
      <div className="buttons">
        <h3>Login with</h3>
        <Button disabled>Google</Button>
        <Button disabled>Facebook</Button>
        <Button disabled>GitHub</Button>
        <Button disabled>Email</Button>
        <p className="divider">or</p>
        <Button className="inverted" onClick={anonymousLogin}>
          Continue Anonymously
        </Button>
      </div>
    </Styles>
  );
}
