import * as React from 'react';
import { useMe } from '../contexts/MeCtx';
import { NewUserPage } from '../pages/NewUserPage';

export function NewUserRouter({ children }) {
  const me = useMe();

  return me.isAuth && typeof me.displayName === 'undefined' ? (
    <NewUserPage />
  ) : (
    children
  );
}
