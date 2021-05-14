import * as React from 'react';

export function MessageListItem({ message }) {
  console.log('MessageListItem');

  return (
    <li style={{ listStyleType: 'none' }}>
      {`${message.time.toDate().toLocaleString()}` +
        ` (${message.author.displayName})` +
        ` ${message.text}` +
        `${message.isSending ? ' (SENDING)' : ''}`}
    </li>
  );
}
