import * as React from 'react';
import styled from 'styled-components';
import { Page } from '../components/Page';

const Styles = styled(Page)``;

export function NotFoundPage({ style }) {
  console.log('NotFoundPage');

  return (
    <Styles style={style}>
      <p>NotFoundPage</p>
    </Styles>
  );
}
