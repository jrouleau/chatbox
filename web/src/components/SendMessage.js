import * as React from 'react';
import styled from 'styled-components';
import { useChat } from '../contexts/ChatCtx';
import { useMessages } from '../contexts/MessagesCtx';

const Styles = styled.div`
  width: 100%;

  & > form {
    display: flex;
    flex-direction: row;

    & > input {
      width: 100%;
    }
  }
`;

export function SendMessage({ style }) {
  console.log('SendMessage');

  const chat = useChat();
  const messages = useMessages();

  const [message, setMessage] = React.useState('');
  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      messages.send(message);
      setMessage('');
    }
  };

  return (
    <Styles style={style}>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          disabled={!chat.isJoined}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="inverted"
          disabled={!chat.isJoined || !message}
        >
          Send
        </button>
      </form>
    </Styles>
  );
}
