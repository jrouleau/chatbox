import * as React from 'react';
import { ChatPage } from './pages/ChatPage';
import { AuthRouter } from './routers/AuthRouter';

export function App() {
  console.log('App');

  return (
    <AuthRouter>
      <ChatPage />
    </AuthRouter>
  );
}
