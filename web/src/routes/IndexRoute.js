import * as React from 'react';
import { Route } from 'react-router-dom';
import { IndexPage } from '../pages/IndexPage';

export function IndexRoute({ style, ...props }) {
  console.log('IndexRoute');

  return (
    <Route {...props}>
      <IndexPage style={style} />
    </Route>
  );
}
