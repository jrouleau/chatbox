import { db } from '../firebase';
import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import styled from 'styled-components';
import { EnterChatId } from '../components/EnterChatId';
import { Nav, Spacer } from '../components/Nav';
import { Page } from '../components/Page';

const Styles = styled(Page)`
  max-width: 124rem;

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

    & > .divider {
      margin: 1.2rem;
      font-weight: 600;
    }
  }
`;

export function LandingPage({ style }) {
  console.log('LandingPage');

  const history = ReactRouter.useHistory();

  const newChat = () => {
    history.replace(`/${db.collection('id').doc().id}`);
  };

  return (
    <Styles style={style}>
      <Nav>
        <Spacer />
        <button className="inverted" onClick={() => history.push('/login')}>
          Login
        </button>
      </Nav>
      <h1>Welcome to Chatbox!</h1>
      <div className="enter-chat">
        <button className="inverted" onClick={newChat}>
          New Chat
        </button>
        <span className="divider">or</span>
        <EnterChatId style={{ maxWidth: '32rem' }} />
      </div>
    </Styles>
  );
}
