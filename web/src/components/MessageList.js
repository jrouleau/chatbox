import * as React from 'react';
import { useMessages } from '../contexts/MessagesCtx';
import { MessageListItem } from './MessageListItem';

export function MessageList() {
  console.log('MessageList');

  const messages = useMessages();

  return messages.isLoading ? (
    <p>Loading...</p>
  ) : (
    <ol>
      {messages.list.slice(-10).map((m) => (
        <MessageListItem key={m.id} message={m} />
      ))}
    </ol>
  );
}
