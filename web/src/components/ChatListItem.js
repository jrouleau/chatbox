import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import styled from 'styled-components';
import { useUsers } from '../contexts/UsersCtx';

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

        & > i {
          margin-left: -0.2rem;
        }
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
  const users = useUsers();

  const message = chat.lastMessage;
  const author = users.get(message?.author);
  const unread = Object.keys(chat.unread || {}).length;
  const time =
    message?.time &&
    new Date(message.time).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <Styles
      style={style}
      className={chat.selected ? 'selected' : unread ? 'unread' : ''}
      onClick={() => history.push(`/c/${chat.id}`)}
    >
      <div className="content">
        <span className="title">{chat.id}</span>
        <div className="message">
          {message ? (
            <>
              <span className="time">{time}</span>
              <span className="author">{author.name || 'Anonymous'}</span>
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
            </>
          ) : (
            <span className="text">{'\u00A0'}</span>
          )}
        </div>
      </div>
      <div className="details">
        <span className="selector material-icons" tooltip="Back">
          chevron_right
        </span>
        <span className="unread-count">{unread < 100 ? unread : '99+'}</span>
      </div>
    </Styles>
  );
}
