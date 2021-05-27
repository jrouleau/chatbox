import * as React from 'react';
import styled from 'styled-components';
import { Page } from '../components/Page';

const Styles = styled(Page)``;

export function LoadingPage({ style }) {
  console.log('LoadingPage');

  return (
    <Styles style={style}>
      <p>LoadingPage</p>
    </Styles>
  );
}
