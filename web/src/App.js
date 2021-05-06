import * as React from 'react';
import ChatPage from './pages/ChatPage';
import AuthRouter from './routers/AuthRouter';

function App() {
  console.log('App');

  return (
    <AuthRouter>
      <ChatPage />
    </AuthRouter>
  );
}

export default App;
