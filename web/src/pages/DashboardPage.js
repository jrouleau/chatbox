import * as React from 'react';
import { ChatRouter } from '../routers/ChatRouter';

export function DashboardPage() {
  console.log('DashboardPage');
  return (
    <>
      <p>DashboardPage</p>
      <ChatRouter />
    </>
  );
}
