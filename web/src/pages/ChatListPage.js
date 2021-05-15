import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import { EnterChatId } from '../components/EnterChatId';
import { ChatList } from '../components/ChatList';
import { useMe } from '../contexts/MeCtx';

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
    <div style={{ ...style, display: 'flex', flexDirection: 'column' }}>
      <p>ChatListPage</p>
      <p>{`Me: ${me.displayName}`}</p>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <button disabled={me.isAnonymous} onClick={logout}>
          Logout
        </button>
        <button onClick={deleteAccount}>Delete Account</button>
      </div>
      <EnterChatId />
      <ChatList />
    </div>
  );
}