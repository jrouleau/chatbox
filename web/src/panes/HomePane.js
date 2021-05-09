import { auth } from '../firebase';
import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import { EnterChatId } from '../components/EnterChatId';
import { ChatList } from '../components/ChatList';

export function HomePane({ style }) {
  console.log('HomePane');

  const history = ReactRouter.useHistory();

  const logout = () => {
    history.push('/');
    auth.signOut();
  };

  const deleteAccount = () => {
    history.push('/');
    auth.currentUser?.delete();
  };

  return (
    <div
      style={{
        ...style,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <p>HomePane</p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <button disabled={auth.currentUser?.isAnonymous} onClick={logout}>
          Logout
        </button>
        <button onClick={deleteAccount}>Delete Account</button>
      </div>
      <EnterChatId />
      <ChatList />
    </div>
  );
}
