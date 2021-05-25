import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import styled from 'styled-components';

const Styles = styled.div`
  width: 100%;
`;

export function LoadingRoute({ style, ...props }) {
  console.log('LoadingRoute');

  return (
    <ReactRouter.Route {...props}>
      <LoadingPage style={style} />
    </ReactRouter.Route>
  );
}

export function LoadingPage({ style }) {
  console.log('LoadingPage');

  return (
    <Styles style={style}>
      <p>LoadingPage</p>
    </Styles>
  );
}
