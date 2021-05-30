import * as React from 'react';
import styled from 'styled-components';

const Styles = styled.nav`
  width: 100%;
  height: 7.2rem;
  display: flex;
  flex-direction: row;
  align-items: center;

  & > .spacer {
    flex-grow: 1;
  }
`;

export function Nav({ children, style }) {
  return <Styles style={style}>{children}</Styles>;
}

export function Spacer() {
  return <div className="spacer" />;
}
