import * as React from 'react';
import styled from 'styled-components';
import { useChat } from '../contexts/ChatCtx';
import { useMessages } from '../contexts/MessagesCtx';
import { Button } from './Button';
import { Input } from './Input';

const Styles = styled.div`
  width: 100%;

  & > form {
    display: flex;
    flex-direction: row;
  }
`;

export function SendMessage({ style }) {
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
        <Input
          className="stretch"
          type="text"
          disabled={!chat.joined}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          type="submit"
          className="inverted"
          disabled={!chat.joined || !message}
        >
          Send
        </Button>
      </form>
    </Styles>
  );
}
