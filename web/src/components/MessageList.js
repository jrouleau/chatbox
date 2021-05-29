import * as React from 'react';
import styled from 'styled-components';
import { useMessages } from '../contexts/MessagesCtx';
import { LoadingPage } from '../pages/LoadingPage';
import { MessageListItem } from './MessageListItem';

const Styles = styled.ol`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: scroll;

  padding: 1.8rem;
  margin-bottom: 1.2rem;
  border-radius: 0.3rem;
  background: #21212121;
`;

export function MessageList({ style }) {
  console.log('MessageList');

  const messages = useMessages();

  return (
    <Styles style={style}>
      {messages.isLoading ? (
        <LoadingPage />
      ) : (
        (messages.list.slice().reverse() || []).map((m) => (
          <MessageListItem key={m.id} message={m} />
        ))
      )}
    </Styles>
  );
}
