import * as React from 'react';
import styled from 'styled-components';
import { useChat } from '../contexts/ChatCtx';
import { useMessages } from '../contexts/MessagesCtx';
import { Loading } from './Loading';
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
  const chat = useChat();
  const messages = useMessages();

  return (
    <Styles style={style} className="scroll">
      {chat.isLoading ||
      messages.isLoading ||
      (chat.joined && messages.list.length === 0) ? (
        <Loading />
      ) : (
        (messages.list.slice().reverse() || []).map((m) => (
          <MessageListItem key={m.id} message={m} />
        ))
      )}
    </Styles>
  );
}
