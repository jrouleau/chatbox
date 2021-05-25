import * as React from 'react';
import styled from 'styled-components';
import { useMessages } from '../contexts/MessagesCtx';
import { MessageListItem } from './MessageListItem';

const Styles = styled.ol``;

export function MessageList({ style }) {
  console.log('MessageList');

  const messages = useMessages();

  return messages.isLoading ? (
    <p>Loading...</p>
  ) : (
    <Styles style={style}>
      {messages.list.slice(-10).map((m) => (
        <MessageListItem key={m.id} message={m} />
      ))}
    </Styles>
  );
}
