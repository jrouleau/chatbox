import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import styled from 'styled-components';
import { useMe } from '../contexts/MeCtx';
import { ChatList } from '../components/ChatList';
import { EnterChatId } from '../components/EnterChatId';
import { Nav, Spacer } from '../components/Nav';
import { Page } from '../components/Page';

const Styles = styled(Page)`
  padding-bottom: 2.4rem;
  overflow: hidden;

  & > nav {
    margin-top: 1.2rem;
    margin-bottom: 1.6rem;

    & > h2 {
      font-size: 2.8rem;
      margin-left: 1.6rem;
    }
  }
`;

export function ChatListPage({ style }) {
  const history = ReactRouter.useHistory();
  const me = useMe();

  const logout = () => {
    history.replace('/');
    me.signOut();
  };

  const deleteAccount = () => {
    history.replace('/');
    me.delete();
  };

  return (
    <Styles style={style}>
      <Nav>
        {!me.isAuth ? (
          <>
            <button className="icon" onClick={() => history.replace('/')}>
              home
            </button>
            <button
              className="stretch"
              style={{ marginLeft: '0.8rem' }}
              onClick={() => history.push('/login')}
            >
              Login
            </button>
          </>
        ) : (
          <>
            <h2>{me.displayName || 'Anonymous'}</h2>
            <Spacer />
            {me.isAnonymous ? (
              <button
                className="transparent circle icon"
                onClick={deleteAccount}
              >
                delete
              </button>
            ) : (
              <button className="transparent circle icon" onClick={logout}>
                logout
              </button>
            )}
          </>
        )}
      </Nav>
      <EnterChatId withNew />
      <ChatList />
    </Styles>
  );
}
