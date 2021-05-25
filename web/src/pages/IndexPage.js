import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import styled from 'styled-components';
import { EnterChatId } from '../components/EnterChatId';

const Styles = styled.div`
  width: 100%;
`;

export function IndexPage({ style }) {
  console.log('IndexPage');

  const history = ReactRouter.useHistory();

  return (
    <Styles style={style}>
      <p>IndexPage</p>
      <button onClick={() => history.push('/login')}>Login</button>
      <EnterChatId />
    </Styles>
  );
}
