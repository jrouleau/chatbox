import * as React from 'react';
import styled from 'styled-components';

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
  const time = message.time?.toDate().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const author = message.author?.displayName || 'Anonymous';

  return (
    <Styles style={style}>
      <div className="message">
        <span className="time">{time}</span>
        <span className="author">{author}</span>
        <span className="text">
          {message.text ? (
            message.text
          ) : message.misc === 'join' ? (
            <i>{'has entered the chat.'}</i>
          ) : message.misc === 'leave' ? (
            <i>{'has left the chat.'}</i>
          ) : (
            <i>{'*internal error*'}</i>
          )}
        </span>
      </div>
    </Styles>
  );
}
