import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import { MessageList } from '../components/MessageList';
import { useChat } from '../contexts/ChatCtx';
import { useMessages } from '../contexts/MessagesCtx';
import { LoadingPage } from './LoadingPage';

export function ChatPage({ style }) {
  console.log('ChatPage');

  const history = ReactRouter.useHistory();
  const chat = useChat();
  const messages = useMessages();

  const join = async (e) => {
    e.target.disabled = true;
    await chat.join();
    e.target.disabled = false;
  };

  const leave = async (e) => {
    e.target.disabled = true;
    await chat.leave();
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
    <div style={{ ...style, display: 'flex', flexDirection: 'column' }}>
      <p>ChatPage</p>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <button onClick={() => history.replace('/')}>Back</button>
        {!chat.isJoined ? (
          <button onClick={join}>Join Chat</button>
        ) : (
          <button onClick={leave}>Leave Chat</button>
        )}
        <span> ({Object.keys(chat.users || {}).length})</span>
      </div>
      <MessageList />
      {chat.isJoined && (
        <form onSubmit={sendMessage}>
          <input ref={messageRef} type="text" />
          <button type="submit">Send</button>
        </form>
      )}
    </div>
  );
}
