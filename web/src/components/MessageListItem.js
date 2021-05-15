import * as React from 'react';
import { useMe } from '../contexts/MeCtx';

export function MessageListItem({ message }) {
  console.log('MessageListItem');

  const me = useMe();
  const isMe = message.author.id === me.id;

  return (
    <li style={{ listStyleType: 'none' }}>
      {message.misc === 'join' ? (
        isMe ? (
          <span>{`You have entered the chat.`}</span>
        ) : (
          <span>{`${message.author.displayName} has enterred the chat.`}</span>
        )
      ) : message.misc === 'leave' ? (
        isMe ? (
          <span>{`You have left the chat.`}</span>
        ) : (
          <span>{`${message.author.displayName} has left the chat.`}</span>
        )
      ) : message.text ? (
        isMe ? (
          <span>
            {`${message.time.toDate().toLocaleString()}` +
              ` (You)` +
              ` ${message.text}` +
              `${message.isSending ? ' (SENDING)' : ''}`}
          </span>
        ) : (
          <span>
            {`${message.time.toDate().toLocaleString()}` +
              ` (${message.author.displayName})` +
              ` ${message.text}`}
          </span>
        )
      ) : (
        <span>{`Invalid message.`}</span>
      )}
    </li>
  );
}
