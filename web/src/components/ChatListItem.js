import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import styled from 'styled-components';

const Styles = styled.li`
  list-style-type: none;
  width: 100%;
  height: 9.6rem;
  border-radius: 0.4rem;
  font-weight: 500;
  color: #eee;
  background: #21212121;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;

  & > .content {
    min-width: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    margin: 0 2.4rem;

    & > .title {
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 600;
      margin-bottom: 0.4rem;
    }

    & > .message {
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

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
  }

  & > .details {
    width: 4.8rem;
    flex-shrink: 0;
    text-align: center;
    margin-left: -2.4rem;
    font-size: 2.4rem;

    & > .selector {
      display: none;
      font-size: 3.6rem;
    }

    & > .unread-count {
      display: none;
    }
  }

  &:hover {
    background: #21212180;
  }

  &.selected {
    background: #212121cc;
  }

  &:hover,
  &.selected {
    & > .details {
      & > .selector {
        display: block;
      }
      & > .unread-count {
        display: none !important;
      }
    }
  }

  &.unread {
    font-weight: 600;

    & > .details > .unread-count {
      display: block;
    }
  }
`;

export function ChatListItem({ style, chat }) {
  const history = ReactRouter.useHistory();

  const unread = Object.keys(chat.unread || {}).length;
  const message = chat.lastMessage;
  const time = message?.time?.toDate().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const author = message?.author?.displayName || 'Anonymous';

  return (
    <Styles
      style={style}
      className={chat.selected ? 'selected' : unread ? 'unread' : ''}
      onClick={() => history.replace(`/${chat.id}`)}
    >
      <div className="content">
        <span className="title">{chat.id}</span>
        <div className="message">
          {message?.text || message?.misc ? (
            <>
              <span className="time">{time}</span>
              <span className="author">{author}</span>
              <span className="text">
                {message?.text ? (
                  message.text
                ) : message?.misc === 'join' ? (
                  <i>{'has entered the chat.'}</i>
                ) : message?.misc === 'leave' ? (
                  <i>{'has left the chat.'}</i>
                ) : (
                  <i>{'*internal error*'}</i>
                )}
              </span>
            </>
          ) : (
            <span className="text">
              <i>{'Send a message'}</i>
            </span>
          )}
        </div>
      </div>
      <div className="details">
        <span className="selector material-icons">chevron_right</span>
        <span className="unread-count">{unread < 100 ? unread : '99+'}</span>
      </div>
    </Styles>
  );
}
