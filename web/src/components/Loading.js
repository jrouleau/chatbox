import * as React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 400ms;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  & > div {
    width: 12rem;
    height: 16rem;
    align-self: center;
    position: relative;

    & > div {
      position: absolute;
      width: 2.4rem;
      border-radius: 0.4rem;
      background: #ffffff54;
      animation: loading 1.2s cubic-bezier(0, 0.25, 0.75, 1) infinite;
    }

    & > div:nth-child(1) {
      left: 1.2rem;
      animation-delay: -300ms;
    }
    & > div:nth-child(2) {
      left: 4.8rem;
      animation-delay: -150ms;
    }
    & > div:nth-child(3) {
      left: 8.4rem;
      animation-delay: 0;
    }

    @keyframes loading {
      0% {
        top: 1.2rem;
        height: 13.6rem;
      }
      50%,
      100% {
        top: 5.6rem;
        height: 4.8rem;
      }
    }
  }
`;

export function Loading({ style }) {
  return (
    <Styles style={style}>
      <div>
        <div />
        <div />
        <div />
      </div>
    </Styles>
  );
}
