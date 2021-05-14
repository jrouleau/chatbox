import * as React from 'react';
import { Switch } from 'react-router-dom';
import { useMe } from '../contexts/MeCtx';
import { AuthRoute } from '../routes/AuthRoute';
import { IndexRoute } from '../routes/IndexRoute';
import { LoadingRoute } from '../routes/LoadingRoute';

export function AuthRouter({ children }) {
  console.log('AuthRouter');

  const me = useMe();

  return me.isLoading ? (
    <LoadingRoute />
  ) : !me.isAuth ? (
    <Switch>
      <IndexRoute path="/" exact />
      <AuthRoute />
    </Switch>
  ) : (
    children
  );
}
