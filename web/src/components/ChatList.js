import * as React from 'react';
import { useChats } from '../contexts/ChatsCtx';
import { ChatListItem } from './ChatListItem';

export function ChatList() {
  console.log('ChatList');

  const chats = useChats();

  return chats.isLoading ? (
    <p>Loading...</p>
  ) : (
    <ol>
      {chats.list.map((c) => (
        <ChatListItem key={c.id} chat={c} />
      ))}
    </ol>
  );
}
