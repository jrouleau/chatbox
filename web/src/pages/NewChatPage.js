import * as React from 'react';
import styled from 'styled-components';
import { EnterChatId } from '../components/EnterChatId';

const Styles = styled.div`
  width: 100%;
`;

export function NewChatPage({ style }) {
  console.log('NewChatPage');

  return (
    <Styles style={style}>
      <p>NewChatPage</p>
      <EnterChatId />
    </Styles>
  );
}
