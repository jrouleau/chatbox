import { auth } from '../firebase';
import * as React from 'react';
import { NewUserPage } from '../pages/NewUserPage';

export function NewUserRouter({ children }) {
  console.log('NewUserRouter');

  const [, setState] = React.useState();
  const render = React.useCallback(() => setState({}), []);

  return auth.currentUser.displayName ? (
    children
  ) : (
    <NewUserPage onSave={render} />
  );
}
