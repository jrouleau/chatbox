import * as React from 'react';
import { AuthRouter } from './routers/AuthRouter';
import { ChatRouter } from './routers/ChatRouter';
import { NewUserRouter } from './routers/NewUserRouter';

export function App() {
  console.log('App');

  return (
    <AuthRouter>
      <NewUserRouter>
        <ChatRouter />
      </NewUserRouter>
    </AuthRouter>
  );
}
