import { db } from '../firebase';
import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import styled from 'styled-components';
import { EnterChatId } from '../components/EnterChatId';

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

    & > .login {
      width: 12.8rem;
      height: 4.8rem;
      background: #212121;
      border: 0;
      border-radius: 0.3rem;
      font-weight: 600;
      color: #eee;
      cursor: pointer;
      outline: none;
      transition: all 0.1s;

      &:hover {
        background: #191919;
        color: #fff;
      }
    }
  }

  & > h1 {
    color: #eee;
    font-size: 6.4rem;
    font-weight: 800;
    text-align: center;
  }

  & > .enter-chat {
    height: 4.8rem;
    margin-top: 2.4rem;
    display: flex;
    flex-direction: row;
    align-items: center;

    & > .new {
      width: 100%;
      height: 100%;
      padding: 0 2.4rem;
      background: #212121;
      border: 0;
      border-radius: 0.3rem;
      font-weight: 600;
      color: #eee;
      cursor: pointer;
      outline: none;
      transition: all 0.1s;

      &:hover {
        background: #191919;
        color: #fff;
      }
    }

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
      <nav>
        <div className="spacer" />
        <button className="login" onClick={() => history.push('/login')}>
          Login
        </button>
      </nav>
      <h1>Welcome to Chatbox!</h1>
      <div className="enter-chat">
        <button className="new" onClick={newChat}>
          New Chat
        </button>
        <span className="divider">or</span>
        <EnterChatId style={{ maxWidth: '32rem' }} />
      </div>
    </Styles>
  );
}
