import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import { useMe } from '../contexts/MeCtx';
import { AuthPage } from '../pages/AuthPage';
import { LandingPage } from '../pages/LandingPage';
import { LoadingPage } from '../pages/LoadingPage';

export function AuthRouter({ children }) {
  const history = ReactRouter.useHistory();
  const me = useMe();

  return me.isLoading ? (
    <LoadingPage />
  ) : !me.isAuth ? (
    <ReactRouter.Switch>
      <ReactRouter.Route path="/" exact component={LandingPage} />
      <ReactRouter.Route path="/login" exact component={AuthPage} />
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
