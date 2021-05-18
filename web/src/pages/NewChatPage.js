import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import { Route } from 'react-router-dom';
import { EnterChatId } from '../components/EnterChatId';

export function NewChatRoute({ style, ...props }) {
  console.log('NewChatRoute');

  return (
    <Route {...props}>
      <NewChatPage style={style} />
    </Route>
  );
}

export function NewChatPage({ style }) {
  console.log('NewChatPage');

  const history = ReactRouter.useHistory();
  const match = ReactRouter.useRouteMatch({
    path: '/new',
    exact: true,
  });

  return (
    <div style={style}>
      <p>NewChatPage</p>
      {match && <button onClick={() => history.replace('/')}>Back</button>}
      <EnterChatId />
    </div>
  );
}
