import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import styled from 'styled-components';
import { ChatProvider } from './contexts/ChatCtx';
import { ChatsProvider } from './contexts/ChatsCtx';
import { MeProvider } from './contexts/MeCtx';
import { MessagesProvider } from './contexts/MessagesCtx';
import { ChatPage } from './pages/ChatPage';
import { ChatListPage } from './pages/ChatListPage';
import { NewChatPage } from './pages/NewChatPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AuthRouter } from './routers/AuthRouter';
import { NewUserRouter } from './routers/NewUserRouter';

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

    &.icon {
      width: 4.8rem;
      border-radius: 50%;
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
`;

export function App() {
  console.log('App');

  const [width, setWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const handleResize = (e) => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const routes = React.useMemo(
    () =>
      [
        {
          path: '/:chatId',
          exact: true,
          render: ({ match }) => (
            <ChatProvider chatId={match.params.chatId}>
              <MessagesProvider>
                <ChatPage />
              </MessagesProvider>
            </ChatProvider>
          ),
        },
        { component: NotFoundPage },
      ].map((route, i) => <ReactRouter.Route key={i} {...route} />),
    [],
  );

  return (
    <Styles>
      <ReactRouter.BrowserRouter>
        <MeProvider>
          <ChatsProvider>
            <AuthRouter>
              <NewUserRouter>
                {width >= 768 ? (
                  <>
                    <ChatListPage style={{ maxWidth: 'min(37%, 48rem)' }} />
                    <ReactRouter.Switch>
                      <ReactRouter.Route
                        path="/"
                        exact
                        component={NewChatPage}
                      />
                      {routes}
                    </ReactRouter.Switch>
                  </>
                ) : (
                  <>
                    <div />
                    <ReactRouter.Switch>
                      <ReactRouter.Route
                        path="/"
                        exact
                        component={ChatListPage}
                      />
                      {routes}
                    </ReactRouter.Switch>
                  </>
                )}
              </NewUserRouter>
            </AuthRouter>
          </ChatsProvider>
        </MeProvider>
      </ReactRouter.BrowserRouter>
    </Styles>
  );
}
