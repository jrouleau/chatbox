import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import styled from 'styled-components';
import { useMe } from '../contexts/MeCtx';
import { ChatList } from '../components/ChatList';
import { EnterChatId } from '../components/EnterChatId';
import { Nav, Spacer } from '../components/Nav';
import { Page } from '../components/Page';
import { Button } from '../components/Button';

const Styles = styled(Page)`
  padding-bottom: 2.4rem;

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
    history.push('/');
    me.signOut();
  };

  const deleteAccount = () => {
    history.push('/');
    me.delete();
  };

  return (
    <Styles style={style}>
      <Nav>
        {!me.isAuth ? (
          <>
            <Button className="icon" onClick={() => history.push('/')}>
              home
            </Button>
            <Button
              className="stretch"
              style={{ marginLeft: '0.8rem' }}
              onClick={() => history.push('/login')}
            >
              Login
            </Button>
          </>
        ) : (
          <>
            <h2>{me.displayName || 'Anonymous'}</h2>
            <Spacer />
            {me.isAnonymous ? (
              <Button
                className="transparent circle icon"
                tooltip="Delete Account"
                onClick={deleteAccount}
              >
                delete
              </Button>
            ) : (
              <Button
                className="transparent circle icon"
                tooltip="Logout"
                onClick={logout}
              >
                logout
              </Button>
            )}
          </>
        )}
      </Nav>
      <EnterChatId withNew />
      <ChatList />
    </Styles>
  );
}
