import * as React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  width: 100%;
`;

export function NotFoundPage({ style }) {
  console.log('NotFoundPage');

  return (
    <Styles style={style}>
      <p>NotFoundPage</p>
    </Styles>
  );
}
