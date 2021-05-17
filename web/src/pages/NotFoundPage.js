import * as React from 'react';
import { Route } from 'react-router-dom';

export function NotFoundRoute({ style, ...props }) {
  console.log('NotFoundRoute');

  return (
    <Route {...props}>
      <NotFoundPage style={style} />
    </Route>
  );
}

function NotFoundPage({ style }) {
  console.log('NotFoundPage');

  return (
    <div style={style}>
      <p>NotFoundPage</p>
    </div>
  );
}
