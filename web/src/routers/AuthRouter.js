import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { useMe } from '../contexts/MeCtx';
import { AuthRoute } from '../routes/AuthRoute';
import { IndexRoute } from '../routes/IndexRoute';
import { LoadingRoute } from '../routes/LoadingRoute';

export function AuthRouter({ children }) {
  console.log('AuthRouter');

  const history = ReactRouter.useHistory();
  const me = useMe();

  return me.isLoading ? (
    <LoadingRoute />
  ) : !me.isAuth ? (
    <Switch>
      <IndexRoute path="/" exact />
      <AuthRoute path="/login" exact />
      <Route>{children}</Route>
    </Switch>
  ) : (
    <Switch>
      <Route
        path="/login"
        exact
        render={() => {
          history.goBack();
        }}
      />
      <Route>{children}</Route>
    </Switch>
  );
}
