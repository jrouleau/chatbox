import * as React from 'react';
import { useMe } from '../contexts/MeCtx';
import { NewUserPage } from '../pages/NewUserPage';

export function NewUserRouter({ children }) {
  console.log('NewUserRouter');

  const me = useMe();

  return !me.displayName ? <NewUserPage /> : children;
}
