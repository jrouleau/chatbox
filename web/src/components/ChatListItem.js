import * as React from 'react';
import * as ReactRouter from 'react-router-dom';

export function ChatListItem({ chat }) {
  console.log('ChatListItem');

  const history = ReactRouter.useHistory();

  return (
    <li>
      <button onClick={() => history.replace(`/${chat.id}`)}>
        {`${chat.id}:` +
          ` (${chat.lastMessage?.author.displayName})` +
          ` ${chat.lastMessage?.text}` +
          ` (${Object.keys(chat.unread || {}).length})` +
          `${chat.selected ? ' *' : ''}`}
      </button>
    </li>
  );
}
