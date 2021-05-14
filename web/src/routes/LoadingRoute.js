import * as React from 'react';
import { Route } from 'react-router-dom';
import { LoadingPage } from '../pages/LoadingPage';

export function LoadingRoute({ style, ...props }) {
  console.log('LoadingRoute');

  return (
    <Route {...props}>
      <LoadingPage style={style} />
    </Route>
  );
}
