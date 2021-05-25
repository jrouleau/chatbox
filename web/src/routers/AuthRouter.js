import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import { useMe } from '../contexts/MeCtx';
import { AuthRoute } from '../pages/AuthPage';
import { IndexRoute } from '../pages/IndexPage';
import { LoadingRoute } from '../pages/LoadingPage';

export function AuthRouter({ children }) {
  console.log('AuthRouter');

  const history = ReactRouter.useHistory();
  const me = useMe();

  return me.isLoading ? (
    <LoadingRoute />
  ) : !me.isAuth ? (
    <ReactRouter.Switch>
      <IndexRoute path="/" exact />
      <AuthRoute path="/login" exact />
      <ReactRouter.Route>{children}</ReactRouter.Route>
    </ReactRouter.Switch>
  ) : (
    <ReactRouter.Switch>
      <ReactRouter.Route
        path="/login"
        exact
        render={() => {
          history.goBack();
        }}
      />
      <ReactRouter.Route>{children}</ReactRouter.Route>
    </ReactRouter.Switch>
  );
}
