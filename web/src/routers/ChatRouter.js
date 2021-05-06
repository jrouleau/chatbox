import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ChatPage } from '../pages/ChatPage';

export function ChatRouter({ children }) {
  console.log('ChatRouter');

  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/:chatId"
          exact
          render={({ match }) => {
            return <ChatPage id={match.params.chatId} />;
          }}
        />
        <Route render={() => <Redirect to={`/TODO`} />} />
      </Switch>
    </BrowserRouter>
  );
}
