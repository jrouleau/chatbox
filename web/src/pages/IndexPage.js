import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import { EnterChatId } from '../components/EnterChatId';

export function IndexPage({ style }) {
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
