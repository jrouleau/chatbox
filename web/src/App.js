import * as React from 'react';
import { DashboardPage } from './pages/DashboardPage';
import { AuthRouter } from './routers/AuthRouter';
import { NewUserRouter } from './routers/NewUserRouter';

export function App() {
  console.log('App');

  return (
    <>
      <p>App</p>
      <AuthRouter>
        <NewUserRouter>
          <DashboardPage />
        </NewUserRouter>
      </AuthRouter>
    </>
  );
}
