import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import styled from 'styled-components';
import { useMe } from '../contexts/MeCtx';

const Styles = styled.div`
  height: 100%;
  width: 100%;
  max-width: 124rem;
  margin: 0 auto;
  padding: 0 2.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > nav {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 2.4rem;

    & > .spacer {
      flex-grow: 1;
    }

    & > .close {
      width: 4.8rem;
      height: 4.8rem;
      background: none;
      border: 0;
      border-radius: 50%;
      color: #eee;
      cursor: pointer;
      outline: none;
      transition: all 0.1s;

      &:hover {
        background: #eeeeee1a;
        color: #fff;
      }

      & > span {
        font-size: 2.4rem;
      }
    }
  }

  & > .buttons {
    width: 38.4rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > h3 {
      margin-bottom: 1.2rem;
      font-size: 2.4rem;
    }

    & > .divider {
      margin: 0.6rem 0;
      font-weight: 600;
    }

    & > button {
      width: 100%;
      height: 4.8rem;
      padding: 0 2rem;
      margin: 0.4rem 0;
      border: 0;
      border-radius: 0.3rem;
      cursor: pointer;
      outline: none;
      text-transform: uppercase;
      font-weight: 600;
      transition: all 0.1s;

      &:disabled {
        background: #eee;
        color: #bbb;
        cursor: auto;
      }

      &.anonymous {
        background: #212121;
        color: #eee;

        &:hover {
          background: #191919;
          color: #fff;
        }
      }
    }
  }
`;

export function AuthPage({ style }) {
  console.log('AuthPage');

  const history = ReactRouter.useHistory();
  const me = useMe();

  const anonymousLogin = (e) => {
    e.target.disabled = true;
    me.signInAnonymously().catch((err) => {
      e.target.disabled = false;
      throw err;
    });
  };

  return (
    <Styles style={style}>
      <nav>
        <div className="spacer" />
        <button className="close" onClick={() => history.goBack()}>
          <span class="material-icons">close</span>
        </button>
      </nav>
      <div className="buttons">
        <h3>Login with</h3>
        <button className="google" disabled>
          Google
        </button>
        <button className="facebook" disabled>
          Facebook
        </button>
        <button className="github" disabled>
          GitHub
        </button>
        <button className="email" disabled>
          Email
        </button>
        <p className="divider">or</p>
        <button className="anonymous" onClick={anonymousLogin}>
          Continue Anonymously
        </button>
      </div>
    </Styles>
  );
}
