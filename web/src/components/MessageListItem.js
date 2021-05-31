import * as React from 'react';
import styled from 'styled-components';
import { ChatMessage } from './ChatMessage';

const Styles = styled.li`
  list-style-type: none;
  padding-top: 0.4rem;
  padding-left: 6.4rem;
`;

export function MessageListItem({ style, message }) {
  return (
    <Styles style={style}>
      <ChatMessage message={message} />
    </Styles>
  );
}
