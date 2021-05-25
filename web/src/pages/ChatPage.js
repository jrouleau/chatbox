import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import styled from 'styled-components';
import { MessageList } from '../components/MessageList';
import { ChatProvider, useChat } from '../contexts/ChatCtx';
import { useMe } from '../contexts/MeCtx';
import { MessagesProvider, useMessages } from '../contexts/MessagesCtx';
import { LoadingPage } from './LoadingPage';

const Styles = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export function ChatRoute({ style, ...props }) {
  console.log('ChatRoute');

  return (
    <ReactRouter.Route
      {...props}
      render={({ match }) => (
        <ChatProvider chatId={match.params.chatId}>
          <MessagesProvider>
            <ChatPage style={style} />
          </MessagesProvider>
        </ChatProvider>
      )}
    />
  );
}

function ChatPage({ style }) {
  console.log('ChatPage');

  const history = ReactRouter.useHistory();
  const me = useMe();
  const chat = useChat();
  const messages = useMessages();

  const join = async (e) => {
    e.target.disabled = true;
    if (me.isAuth) {
      await chat.join();
    } else {
      history.push('/login');
    }
    e.target.disabled = false;
  };

  const leave = async (e) => {
    e.target.disabled = true;
    await chat.leave();
    e.target.disabled = false;
  };

  const del = async (e) => {
    e.target.disabled = true;
    await chat.delete();
    e.target.disabled = false;
  };

  const messageRef = React.useRef();
  const sendMessage = (e) => {
    e.preventDefault();
    messages.send(messageRef.current?.value);
    messageRef.current.value = '';
  };

  React.useEffect(() => {
    if (Object.keys(chat.unread || {}).length > 0) {
      chat.markRead();
    }
  }, [chat]);

  if (chat.isLoading) return <LoadingPage />;
  return (
    <Styles style={style}>
      <p>ChatPage</p>
      <p>{`chat: ${chat.id}`}</p>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <button onClick={() => history.replace('/')}>Back</button>
        {!chat.isJoined ? (
          <button onClick={join}>Join Chat</button>
        ) : (
          <button onClick={leave}>Leave Chat</button>
        )}
        <button onClick={del} disabled={chat.isJoined || !chat.lastMessage}>
          Delete Chat
        </button>
        <span> ({Object.keys(chat.users || {}).length})</span>
      </div>
      <MessageList />
      {chat.isJoined && (
        <form onSubmit={sendMessage}>
          <input ref={messageRef} type="text" />
          <button type="submit">Send</button>
        </form>
      )}
    </Styles>
  );
}
