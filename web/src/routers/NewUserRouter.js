import { auth } from '../firebase';
import * as React from 'react';
import { Loading } from '../components/Loading';
import { NewUserPage } from '../pages/NewUserPage';

export function NewUserRouter({ children }) {
  console.log('NewUserRouter');

  const [, setState] = React.useState();
  const render = React.useCallback(() => setState({}), []);

  if (!auth.currentUser) return <Loading />;
  return auth.currentUser.displayName ? (
    children
  ) : (
    <NewUserPage onSave={render} />
  );
}
