import * as React from 'react';
import { Switch } from 'react-router';
import { useMe } from '../contexts/MeCtx';
import { NewUserRoute } from '../pages/NewUserPage';

export function NewUserRouter({ children }) {
  console.log('NewUserRouter');

  const me = useMe();

  return me.isAuth && !me.displayName ? (
    <Switch>
      <NewUserRoute />
    </Switch>
  ) : (
    children
  );
}
