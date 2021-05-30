import * as React from 'react';
import styled from 'styled-components';
import { Loading } from '../components/Loading';
import { Page } from '../components/Page';

const Styles = styled(Page)`
  padding: 0;
`;

export function LoadingPage({ style }) {
  return (
    <Styles style={style}>
      <Loading />
    </Styles>
  );
}
