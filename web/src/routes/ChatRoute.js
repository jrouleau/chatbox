import * as React from 'react';
import { Route } from 'react-router-dom';
import { ProvideChat } from '../contexts/ChatCtx';
import { ProvideMessages } from '../contexts/MessagesCtx';
import { ChatPage } from '../pages/ChatPage';

export function ChatRoute({ style, ...props }) {
  console.log('ChatRoute');

  return (
    <Route
      {...props}
      render={({ match }) => (
        <ProvideChat chatId={match.params.chatId}>
          <ProvideMessages>
            <ChatPage style={style} />
          </ProvideMessages>
        </ProvideChat>
      )}
    />
  );
}
