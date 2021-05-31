import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import styled from 'styled-components';
import { MessageList } from '../components/MessageList';
import { Nav, Spacer } from '../components/Nav';
import { Page } from '../components/Page';
import { SendMessage } from '../components/SendMessage';
import { useChat } from '../contexts/ChatCtx';
import { useMe } from '../contexts/MeCtx';
import { useMessages } from '../contexts/MessagesCtx';

const Styles = styled(Page)`
  padding-bottom: 2.4rem;
  overflow-y: hidden;

  & > nav > .title {
    margin-left: 0.8rem;
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5;
  }
`;

export function ChatPage({ style }) {
  const history = ReactRouter.useHistory();
  const me = useMe();
  const chat = useChat();
  const messages = useMessages();

  const back = () => history.replace('/');

  const join = React.useCallback(async () => {
    if (me.isAuth) {
      await chat.join();
    } else {
      history.push('/login');
    }
  }, [me.isAuth, chat, history]);

  const leave = React.useCallback(async () => {
    await chat.leave();
  }, [chat]);

  const _delete = React.useCallback(async () => {
    history.replace('/');
    await chat.delete();
  }, [history, chat]);

  React.useEffect(() => {
    if (Object.keys(chat.unread || {}).length > 0) {
      chat.markRead();
    }
  }, [chat]);

  return (
    <Styles style={style}>
      <Nav>
        <button className="transparent circle icon" onClick={back}>
          chevron_left
        </button>
        <h3 className="title">{chat.id}</h3>
        <Spacer />
        <button
          className="transparent circle icon"
          onClick={() => {
            navigator.clipboard.writeText(chat.id);
          }}
        >
          share
        </button>
        {!chat.isLoading && !chat.joined ? (
          <button
            className="transparent circle icon"
            onClick={join}
            disabled={chat.isLoading}
          >
            login
          </button>
        ) : (
          <button
            className="transparent circle icon"
            onClick={leave}
            disabled={chat.isLoading}
          >
            logout
          </button>
        )}
        <button
          className="transparent circle icon"
          onClick={_delete}
          disabled={chat.isLoading || messages.list.length === 0}
        >
          delete
        </button>
      </Nav>
      <MessageList />
      {chat.isLoading || chat.joined ? (
        <SendMessage />
      ) : (
        <button
          className="inverted stretch"
          onClick={join}
          disabled={chat.isLoading}
        >
          Join Chat
        </button>
      )}
    </Styles>
  );
}
