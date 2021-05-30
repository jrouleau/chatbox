import * as React from 'react';
import styled from 'styled-components';
import { useChats } from '../contexts/ChatsCtx';
import { LoadingPage } from '../pages/LoadingPage';
import { ChatListItem } from './ChatListItem';

const Styles = styled.ol`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-top: 0.8rem;
  padding-right: 1rem;

  & > * {
    flex-shrink: 0;
    margin-top: 0.8rem;

    &:last-child {
      margin-bottom: 0.8rem;
    }
  }
`;

export function ChatList({ style }) {
  console.log('ChatList');

  const chats = useChats();

  return (
    <Styles style={style} className="scroll">
      {chats.isLoading ? (
        <LoadingPage />
      ) : (
        <>
          {chats.list.map((c) => (
            <ChatListItem key={c.id} chat={c} />
          ))}
        </>
      )}
    </Styles>
  );
}
