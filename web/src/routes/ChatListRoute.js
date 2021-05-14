import * as React from 'react';
import { Route } from 'react-router-dom';
import { ProvideChats } from '../contexts/ChatsCtx';
import { ChatListPage } from '../pages/ChatListPage';

export function ChatListRoute({ style, ...props }) {
  console.log('ChatListRoute');

  return (
    <Route {...props}>
      <ProvideChats>
        <ChatListPage style={style} />
      </ProvideChats>
    </Route>
  );
}
