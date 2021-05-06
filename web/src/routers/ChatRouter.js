import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ChatPane } from '../panes/ChatPane';
import { HomePane } from '../panes/HomePane';

export function ChatRouter({ children }) {
  console.log('ChatRouter');

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePane} />
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
