import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ChatPane } from '../panes/ChatPane';
import { HomePane } from '../panes/HomePane';

export function AppRouter() {
  console.log('AppRouter');

  const [width, setWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const handleResize = (e) => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (width > 640) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
        }}
      >
        <BrowserRouter>
          <HomePane
            style={{
              width: '30%',
              maxWidth: '48rem',
            }}
          />
          <Switch>
            <Route
              path="/:chatId"
              exact
              render={({ match }) => <ChatPane chatId={match.params.chatId} />}
            />
            <Route>
              <p>404 Not Found</p>
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePane} />
        <Route
          path="/:chatId"
          exact
          render={({ match }) => <ChatPane chatId={match.params.chatId} />}
        />
      </Switch>
    </BrowserRouter>
  );
}
