import * as React from 'react';
import styled from 'styled-components';
import { useChats } from '../contexts/ChatsCtx';
import { ChatListItem } from './ChatListItem';
import { Loading } from './Loading';

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
  const chats = useChats();

  return (
    <Styles style={style} className="scroll">
      {chats.isLoading ? (
        <Loading />
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
