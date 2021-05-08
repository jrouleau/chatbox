import { auth } from '../firebase';
import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import { EnterChatId } from '../components/EnterChatId';
import { ChatList } from '../components/ChatList';

export function HomePane() {
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
    <>
      <p>HomePane</p>
      <button disabled={auth.currentUser?.isAnonymous} onClick={logout}>
        Logout
      </button>
      <button onClick={deleteAccount}>Delete Account</button>
      <EnterChatId />
      <ChatList />
    </>
  );
}
