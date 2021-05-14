import * as React from 'react';
import { EnterChatId } from '../components/EnterChatId';

export function IndexPage({ style }) {
  console.log('IndexPage');

  return (
    <div style={style}>
      <p>IndexPage</p>
      <EnterChatId />
    </div>
  );
}
