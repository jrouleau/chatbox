import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../components/Button';
import { MessageList } from '../components/MessageList';
import { Nav, Spacer } from '../components/Nav';
import { Page } from '../components/Page';
import { SendMessage } from '../components/SendMessage';
import { UserList } from '../components/UserList';
import { useChat } from '../contexts/ChatCtx';
import { useMe } from '../contexts/MeCtx';
import { useMessages } from '../contexts/MessagesCtx';
import { useScreenSize } from '../contexts/ScreenSizeCtx';

const Styles = styled(Page)`
  padding-bottom: 2.4rem;
  overflow-y: hidden;

  & > nav {
    padding-right: 0.6rem;

    & > .title {
      margin-left: 0.8rem;
      flex-grow: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.5;
    }

    & > #users {
      position: 'relative';

      & > .users-count {
        position: absolute;
        top: 0;
        right: 0;
        color: #fff;
        font-family: 'Open Sans', sans-serif;
        font-weight: 600;
        font-size: 1.2rem;
        background: #212121a0;
        border-radius: 0.4rem;
        padding: 0.2rem 0.4rem;
      }
    }
  }

  & > .container {
    display: flex;
    height: 100%;
    width: 100%;
    margin-bottom: 1.2rem;
  }
`;

export function ChatPage({ style }) {
  const history = ReactRouter.useHistory();
  const location = ReactRouter.useLocation();
  const screenSize = useScreenSize();
  const me = useMe();
  const chat = useChat();
  const messages = useMessages();

  const [usersListIsOpen, setUsersListIsOpen] = React.useState(false);
  let usersCount = Object.keys(chat.users || {}).length;
  if (usersCount > 1000) usersCount = '1000+';

  const copyLink = React.useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
  }, []);

  React.useEffect(() => {
    const state = location.state || {};
    if (state.action === 'joinChat') {
      history.replace({ ...location, state: undefined });
      if (me.isAuth) chat.join();
    }
  }, [me.isAuth, history, location, chat]);

  const joinChat = React.useCallback(() => {
    if (!me.isAuth) {
      history.push('/login', {
        redirectTo: {
          ...location,
          state: {
            action: 'joinChat',
          },
        },
      });
    } else {
      chat.join();
    }
  }, [me.isAuth, history, location, chat]);

  const leaveChat = React.useCallback(async () => {
    await chat.leave();
  }, [chat]);

  const deleteChat = React.useCallback(async () => {
    history.push('/');
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
        <Button
          className="transparent circle icon"
          tooltip="Back"
          onClick={() => history.goBack()}
          style={{
            visibility: screenSize.isLarge ? 'hidden' : 'initial',
          }}
        >
          chevron_left
        </Button>
        <h3 className="title">{chat.id}</h3>
        <Spacer />
        <Button
          className="transparent circle icon"
          tooltip="Copy Link"
          onClick={copyLink}
        >
          share
        </Button>
        <Button
          id="users"
          className="transparent circle icon"
          tooltip="Users"
          onClick={() => setUsersListIsOpen((p) => !p)}
        >
          people
          <span className="users-count">{usersCount}</span>
        </Button>
        {!chat.isLoading && !chat.joined ? (
          <Button
            className="transparent circle icon"
            tooltip="Join Chat"
            onClick={joinChat}
            disabled={chat.isLoading}
          >
            login
          </Button>
        ) : (
          <Button
            className="transparent circle icon"
            tooltip="Leave Chat"
            onClick={leaveChat}
            disabled={chat.isLoading}
          >
            logout
          </Button>
        )}
        <Button
          className="transparent circle icon"
          tooltip="Delete Chat"
          onClick={deleteChat}
          disabled={chat.isLoading || messages.list.length === 0}
        >
          delete
        </Button>
      </Nav>
      <div className="container">
        <MessageList />
        {usersListIsOpen && <UserList />}
      </div>
      {me.isAuth && (chat.isLoading || chat.joined) ? (
        <SendMessage />
      ) : (
        <Button
          className="inverted stretch"
          onClick={joinChat}
          disabled={chat.isLoading}
        >
          Join Chat
        </Button>
      )}
    </Styles>
  );
}
