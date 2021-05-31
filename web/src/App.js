import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import styled from 'styled-components';
import { ChatProvider } from './contexts/ChatCtx';
import { ChatsProvider } from './contexts/ChatsCtx';
import { MeProvider } from './contexts/MeCtx';
import { MessagesProvider } from './contexts/MessagesCtx';
import { UsersProvider } from './contexts/UsersCtx';
import { ChatPage } from './pages/ChatPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AuthRouter } from './routers/AuthRouter';
import { NewUserRouter } from './routers/NewUserRouter';
import { WidthRouter } from './routers/WidthRouter';

const Styles = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: stretch;

  button {
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
  }

  input {
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
  }

  input + button {
    margin-left: 0.8rem;
  }

  .scroll {
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 0.8rem;
    }

    &::-webkit-scrollbar-track {
      border-radius: 0.4rem;
      background: #21212154;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 0.4rem;
      border-radius: 0.4rem;
      background: #212121;

      &:hover {
        background: #191919;
      }
    }
  }
`;

export function App() {
  return (
    <Styles>
      <ReactRouter.BrowserRouter>
        <UsersProvider>
          <MeProvider>
            <AuthRouter>
              <NewUserRouter>
                <ChatsProvider>
                  <WidthRouter>
                    <ReactRouter.Route
                      path="/:chatId"
                      exact
                      render={({ match }) => (
                        <ChatProvider chatId={match.params.chatId}>
                          <MessagesProvider>
                            <ChatPage />
                          </MessagesProvider>
                        </ChatProvider>
                      )}
                    />
                    <ReactRouter.Route component={NotFoundPage} />
                  </WidthRouter>
                </ChatsProvider>
              </NewUserRouter>
            </AuthRouter>
          </MeProvider>
        </UsersProvider>
      </ReactRouter.BrowserRouter>
    </Styles>
  );
}
