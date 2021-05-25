import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import styled from 'styled-components';

const Styles = styled.li`
  list-style-type: none;
`;

export function ChatListItem({ style, chat }) {
  console.log('ChatListItem');

  const history = ReactRouter.useHistory();

  return (
    <Styles style={style}>
      <button onClick={() => history.replace(`/${chat.id}`)}>
        {`${chat.id}:` +
          ` (${chat.lastMessage?.author.displayName})` +
          ` ${chat.lastMessage?.text}` +
          ` (${Object.keys(chat.unread || {}).length})` +
          `${chat.selected ? ' *' : ''}`}
      </button>
    </Styles>
  );
}
