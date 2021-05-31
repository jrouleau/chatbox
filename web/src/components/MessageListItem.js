import * as React from 'react';
import styled from 'styled-components';
import { useUsers } from '../contexts/UsersCtx';

const Styles = styled.li`
  list-style-type: none;
  padding-top: 0.4rem;
  padding-left: 6.4rem;

  & .message {
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
    }
  }
`;

export function MessageListItem({ style, message }) {
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
      <div className="message">
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
      </div>
    </Styles>
  );
}
