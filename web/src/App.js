import * as React from 'react';
import { ChatPage } from './pages/ChatPage';
import { AuthRouter } from './routers/AuthRouter';
import { NewUserRouter } from './routers/NewUserRouter';

export function App() {
  console.log('App');

  return (
    <AuthRouter>
      <NewUserRouter>
        <ChatPage />
      </NewUserRouter>
    </AuthRouter>
  );
}
