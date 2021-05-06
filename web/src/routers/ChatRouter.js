import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ChatPane } from '../panes/ChatPane';
import { HomePage } from '../pages/HomePage';

export function ChatRouter({ children }) {
  console.log('ChatRouter');

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route
          path="/:chatId"
          exact
          render={({ match }) => {
            return <ChatPane chatId={match.params.chatId} />;
          }}
        />
      </Switch>
    </BrowserRouter>
  );
}
