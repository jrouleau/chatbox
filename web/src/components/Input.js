import * as React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  height: 4.8rem;
  padding: 0 1.2rem;
  border: none;
  border-radius: 0.4rem;
  outline: none;
  color: #212121;
  background: #fff;

  &:disabled {
    color: #2121218a;
    background: #ddd;
  }

  &.stretch {
    width: 100%;
  }

  & + button {
    margin-left: 0.8rem;
  }
`;

export function Input({ children, ...props }) {
  return <StyledInput {...props}>{children}</StyledInput>;
}
