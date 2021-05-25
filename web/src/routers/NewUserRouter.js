import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import { useMe } from '../contexts/MeCtx';
import { NewUserRoute } from '../pages/NewUserPage';

export function NewUserRouter({ children }) {
  console.log('NewUserRouter');

  const me = useMe();

  return me.isAuth && !me.displayName ? (
    <ReactRouter.Switch>
      <NewUserRoute />
    </ReactRouter.Switch>
  ) : (
    children
  );
}
