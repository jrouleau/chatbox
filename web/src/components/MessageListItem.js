import * as React from 'react';

export function MessageListItem({ message }) {
  console.log('MessageListItem');

  return (
    <li style={{ listStyleType: 'none' }}>
      {message.misc === 'join' ? (
        <span>{`${message.author.displayName} has enterred the chat.`}</span>
      ) : message.misc === 'leave' ? (
        <span>{`${message.author.displayName} has left the chat.`}</span>
      ) : message.text ? (
        <span>
          {`${message.time.toDate().toLocaleString()}` +
            ` (${message.author.displayName})` +
            ` ${message.text}`}
        </span>
      ) : (
        <span>{`Invalid message.`}</span>
      )}
    </li>
  );
}
