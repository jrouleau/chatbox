import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import styled from 'styled-components';
import { ChatList } from '../components/ChatList';
import { EnterChatId } from '../components/EnterChatId';
import { Page } from '../components/Page';
import { useMe } from '../contexts/MeCtx';

const Styles = styled(Page)``;

export function ChatListPage({ style }) {
  console.log('ChatListPage');

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
      <p>ChatListPage</p>
      {!me.isAuth ? (
        <button onClick={() => history.push('/login')}>Login</button>
      ) : (
        <>
          <p>{`Me: ${me.displayName}`}</p>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <button disabled={me.isAnonymous} onClick={logout}>
              Logout
            </button>
            <button onClick={deleteAccount}>Delete Account</button>
          </div>
        </>
      )}
      <EnterChatId />
      <ChatList />
    </Styles>
  );
}
