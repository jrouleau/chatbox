import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import styled from 'styled-components';

const Styles = styled.form`
  width: 100%;
  display: flex;
  flex-direction: row;

  & > input {
    width: 100%;
  }
`;

export function EnterChatId({ style }) {
  console.log('EnterChatId');

  const history = ReactRouter.useHistory();

  const [chatId, setChatId] = React.useState('');
  const enterChat = (e) => {
    e.preventDefault();
    if (chatId.length === 20) {
      history.replace(`/${chatId}`);
    }
  };
  return (
    <Styles style={style} onSubmit={enterChat}>
      <input
        type="text"
        placeholder="Enter chat ID"
        onChange={(e) => setChatId(e.target.value)}
      />
      <button type="submit" disabled={chatId.length !== 20}>
        Go
      </button>
    </Styles>
  );
}
