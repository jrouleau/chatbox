import * as React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  height: 4.8rem;
  padding: 0 2.4rem;
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  white-space: nowrap;
  text-transform: uppercase;
  font-weight: 600;
  color: #212121;
  background: #eee;
  transition: all 100ms;
  position: relative;

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

    &:active {
      background: #eee;
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

      &:active {
        background: #141414;
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

      &:active {
        background: #ffffff10;
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

  & > .tooltip {
    display: none;
    top: 100%;
    margin-top: -0.4rem;
    position: absolute;
    background: #212121d4;
    color: #eee;
    border-radius: 0.8rem;
    font-family: 'Open Sans', sans-serif;
    font-size: 1.6rem;
    font-weight: 600;
    padding: 0.6rem 1.2rem;
    z-index: 9999;
  }

  &:not(:disabled):hover {
    & > .tooltip {
      display: block;
    }
  }
`;

export function Button({ children, tooltip, ...props }) {
  return (
    <StyledButton {...props}>
      {tooltip && (
        <div
          className="tooltip"
          ref={(el) => {
            if (!el) return;
          }}
        >
          {tooltip}
        </div>
      )}
      {children}
    </StyledButton>
  );
}
