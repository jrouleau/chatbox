import * as React from 'react';
import styled from 'styled-components';
import { useChats } from '../contexts/ChatsCtx';
import { ChatListItem } from './ChatListItem';

const Styles = styled.ol``;

export function ChatList({ style }) {
  console.log('ChatList');

  const chats = useChats();

  return chats.isLoading ? (
    <p>Loading...</p>
  ) : (
    <Styles style={style}>
      {chats.list.map((c) => (
        <ChatListItem key={c.id} chat={c} />
      ))}
    </Styles>
  );
}
