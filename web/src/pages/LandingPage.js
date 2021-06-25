import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import styled from 'styled-components';
import { uid } from 'uid/secure';
import { Button } from '../components/Button';
import { EnterChatId } from '../components/EnterChatId';
import { Nav, Spacer } from '../components/Nav';
import { Page } from '../components/Page';

const Styles = styled(Page)`
  max-width: 124rem;
  overflow-y: auto;

  & > h1 {
    color: #eee;
    font-size: 6.4rem;
    font-weight: 800;
    text-align: center;
  }

  & > .enter-chat {
    margin-top: 2.4rem;
    display: flex;
    flex-direction: row;
    align-items: center;

    @media (max-width: 768px) {
      flex-direction: column-reverse;
    }

    & > .divider {
      margin: 1.2rem;
      font-weight: 600;
    }
  }
`;

export function LandingPage({ style }) {
  const history = ReactRouter.useHistory();

  return (
    <Styles style={style}>
      <Nav>
        <Spacer />
        <Button className="inverted" onClick={() => history.push('/login')}>
          Login
        </Button>
      </Nav>
      <h1>Welcome to Chatbox!</h1>
      <div className="enter-chat">
        <Button
          className="inverted"
          onClick={() => history.push(`/c/${uid(20)}`)}
        >
          New Chat
        </Button>
        <span className="divider">or</span>
        <EnterChatId style={{ maxWidth: '32rem' }} />
      </div>
    </Styles>
  );
}
