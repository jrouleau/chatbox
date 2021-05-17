import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import { Route } from 'react-router-dom';
import { EnterChatId } from '../components/EnterChatId';

export function IndexRoute({ style, ...props }) {
  console.log('IndexRoute');

  return (
    <Route {...props}>
      <IndexPage style={style} />
    </Route>
  );
}

function IndexPage({ style }) {
  console.log('IndexPage');

  const history = ReactRouter.useHistory();

  return (
    <div style={style}>
      <p>IndexPage</p>
      <button onClick={() => history.push('/login')}>Login</button>
      <EnterChatId />
    </div>
  );
}
