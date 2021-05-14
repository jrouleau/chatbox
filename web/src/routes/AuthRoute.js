import * as React from 'react';
import { Route } from 'react-router-dom';
import { AuthPage } from '../pages/AuthPage';

export function AuthRoute({ style, ...props }) {
  console.log('AuthRoute');

  return (
    <Route {...props}>
      <AuthPage style={style} />
    </Route>
  );
}
