import * as React from 'react';
import styled from 'styled-components';
import { useChat } from '../contexts/ChatCtx';
import { Loading } from './Loading';

const Styles = styled.ol`
  width: 20%;
  min-width: 12.8rem;
  max-width: 25.6rem;
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  padding: 1.6rem 2.4rem;
  border-radius: 0.4rem;
  background: #21212142;
  margin-left: 0.8rem;

  & > li {
    list-style-type: none;
    font-weight: 600;
    padding: 0.2rem 0;
  }
`;

export function UserList({ style }) {
  const chat = useChat();

  return (
    <Styles style={style} className="scroll">
      {chat.isLoading ? (
        <Loading />
      ) : (
        (Object.entries(chat.users || {}) || [])
          .sort(([, a], [, b]) => a.time - b.time)
          .map(([id, { name }]) => {
            return <li key={id}>{name || 'Anonymous'}</li>;
          })
      )}
    </Styles>
  );
}
