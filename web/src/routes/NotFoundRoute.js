import * as React from 'react';
import { Route } from 'react-router-dom';
import { NotFoundPage } from '../pages/NotFoundPage';

export function NotFoundRoute({ style, ...props }) {
  console.log('NotFoundRoute');

  return (
    <Route {...props}>
      <NotFoundPage style={style} />
    </Route>
  );
}
