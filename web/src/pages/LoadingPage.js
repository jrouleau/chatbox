import * as React from 'react';
import { Route } from 'react-router-dom';

export function LoadingRoute({ style, ...props }) {
  console.log('LoadingRoute');

  return (
    <Route {...props}>
      <LoadingPage style={style} />
    </Route>
  );
}

export function LoadingPage({ style }) {
  console.log('LoadingPage');

  return (
    <div style={style}>
      <p>LoadingPage</p>
    </div>
  );
}
