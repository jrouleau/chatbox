import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import styled from 'styled-components';

const Styles = styled.div`
  width: 100%;
`;

export function NotFoundRoute({ style, ...props }) {
  console.log('NotFoundRoute');

  return (
    <ReactRouter.Route {...props}>
      <NotFoundPage style={style} />
    </ReactRouter.Route>
  );
}

function NotFoundPage({ style }) {
  console.log('NotFoundPage');

  return (
    <Styles style={style}>
      <p>NotFoundPage</p>
    </Styles>
  );
}
