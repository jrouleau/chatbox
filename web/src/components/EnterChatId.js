import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import styled from 'styled-components';
import { uid } from 'uid/secure';
import { Button } from './Button';

const Styles = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  & > form {
    width: 100%;
    display: flex;
    flex-direction: row;

    & > input {
      width: 100%;
    }
  }

  & > .new-chat {
    margin-left: 0.8rem;
  }
`;

export function EnterChatId({ style, withNew }) {
  const history = ReactRouter.useHistory();

  const [chatId, setChatId] = React.useState('');

  const enterChat = (e) => {
    e.preventDefault();
    if (chatId.length === 20) {
      history.push(`/c/${chatId}`);
      setChatId('');
    }
  };

  const newChat = () => {
    history.push(`/c/${uid(20)}`);
  };

  return (
    <Styles style={style}>
      <form onSubmit={enterChat}>
        <input
          type="text"
          value={chatId}
          placeholder="Enter chat ID"
          onChange={(e) => setChatId(e.target.value)}
        />
        <Button type="submit" disabled={chatId.length !== 20}>
          Go
        </Button>
      </form>
      {withNew && (
        <Button className="new-chat inverted icon" onClick={newChat}>
          add
        </Button>
      )}
    </Styles>
  );
}
