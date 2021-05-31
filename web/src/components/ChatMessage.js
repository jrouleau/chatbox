import * as React from 'react';
import styled from 'styled-components';
import { useUsers } from '../contexts/UsersCtx';

const Styles = styled.div`
  padding-left: 6.4rem;
  margin-left: -6.4rem;
  text-indent: -6.4rem;

  & > .time {
    font-size: 1.4rem;
    opacity: 0.5;
    margin-right: 0.6rem;
  }

  & > .author {
    font-weight: 600;
    margin-right: 0.6rem;
  }

  & > .text {
    line-height: 1.2;

    & > i {
      margin-left: -0.2rem;
    }
  }
`;

export function ChatMessage({ style, message }) {
  const users = useUsers();

  const author = users.get(message.author);
  const time =
    message.time &&
    new Date(message.time).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <Styles style={style}>
      <span className="time">{time}</span>
      <span className="author">{author.displayName || 'Anonymous'}</span>
      <span className="text">
        {message.type === 'text' ? (
          message.text
        ) : message.type === 'join' ? (
          <i>{'has entered the chat.'}</i>
        ) : message.type === 'leave' ? (
          <i>{'has left the chat.'}</i>
        ) : (
          <i>{'*internal error*'}</i>
        )}
      </span>
    </Styles>
  );
}
