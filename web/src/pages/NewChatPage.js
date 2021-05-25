import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import styled from 'styled-components';
import { EnterChatId } from '../components/EnterChatId';

const Styles = styled.div`
  width: 100%;
`;

export function NewChatRoute({ style, ...props }) {
  console.log('NewChatRoute');

  return (
    <ReactRouter.Route {...props}>
      <NewChatPage style={style} />
    </ReactRouter.Route>
  );
}

export function NewChatPage({ style }) {
  console.log('NewChatPage');

  const history = ReactRouter.useHistory();
  const match = ReactRouter.useRouteMatch({
    path: '/new',
    exact: true,
  });

  return (
    <Styles style={style}>
      <p>NewChatPage</p>
      {match && <button onClick={() => history.replace('/')}>Back</button>}
      <EnterChatId />
    </Styles>
  );
}
