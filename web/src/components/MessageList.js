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
  padding: 0.8rem 1.6rem;
  margin-bottom: 1.2rem;
  border-radius: 0.4rem;
  background: #21212121;
`;

export function MessageList({ style }) {
  const messages = useMessages();

  return (
    <Styles style={style} className="scroll">
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
