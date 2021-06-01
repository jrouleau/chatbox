import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import { useMe } from '../contexts/MeCtx';
import { NewUserPage } from '../pages/NewUserPage';

export function NewUserRouter({ children }) {
  const history = ReactRouter.useHistory();
  const location = ReactRouter.useLocation();
  const me = useMe();

  return me.isAuth && typeof me.displayName === 'undefined' ? (
    <ReactRouter.Switch>
      <ReactRouter.Route path="/welcome" exact component={NewUserPage} />
      <ReactRouter.Route
        render={() => {
          history.replace('/welcome', { redirectTo: location });
        }}
      />
    </ReactRouter.Switch>
  ) : (
    <ReactRouter.Switch>
      <ReactRouter.Route
        path="/welcome"
        exact
        render={() => {
          const state = location.state || {};
          history.replace(state.redirectTo || '/');
        }}
      />
      {children}
    </ReactRouter.Switch>
  );
}
