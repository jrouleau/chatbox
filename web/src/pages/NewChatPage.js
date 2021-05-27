import * as React from 'react';
import styled from 'styled-components';
import { EnterChatId } from '../components/EnterChatId';
import { Page } from '../components/Page';

const Styles = styled(Page)``;

export function NewChatPage({ style }) {
  console.log('NewChatPage');

  return (
    <Styles style={style}>
      <p>NewChatPage</p>
      <EnterChatId />
    </Styles>
  );
}
