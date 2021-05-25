import * as React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  width: 100%;
`;

export function LoadingPage({ style }) {
  console.log('LoadingPage');

  return (
    <Styles style={style}>
      <p>LoadingPage</p>
    </Styles>
  );
}
