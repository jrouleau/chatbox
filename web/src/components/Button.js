import * as React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  height: 4.8rem;
  padding: 0 2.4rem;
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;
  outline: none;
  white-space: nowrap;
  text-transform: uppercase;
  font-weight: 600;
  color: #212121;
  background: #eee;
  transition: all 0.1s;

  &:disabled {
    cursor: auto;
    color: #2121218a;
    background: #ddd;
  }

  &:not(:disabled) {
    &:hover {
      color: #191919;
      background: #fff;
    }
  }

  &.inverted {
    color: #eee;
    background: #212121;

    &:disabled {
      color: #eeeeee8a;
    }

    &:not(:disabled) {
      &:hover {
        color: #fff;
        background: #191919;
      }
    }
  }

  &.transparent {
    color: #eee;
    background: none;

    &:disabled {
      color: #eeeeee8a;
    }

    &:not(:disabled) {
      &:hover {
        color: #fff;
        background: #ffffff1a;
      }
    }
  }

  &.circle {
    width: 4.8rem;
    border-radius: 50%;
  }

  &.icon {
    width: 4.8rem;
    display: flex;
    align-items: center;
    justify-content: center;

    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 2.4rem;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
  }

  &.stretch {
    width: 100%;
  }
`;

export function Button({ children, ...props }) {
  return <StyledButton {...props}>{children}</StyledButton>;
}
