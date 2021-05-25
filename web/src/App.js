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
                {width > 640 ? (
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
