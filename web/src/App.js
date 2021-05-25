import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import styled from 'styled-components';
import { ChatsProvider } from './contexts/ChatsCtx';
import { MeProvider } from './contexts/MeCtx';
import { ChatRoute } from './pages/ChatPage';
import { ChatListRoute } from './pages/ChatListPage';
import { NewChatRoute } from './pages/NewChatPage';
import { NotFoundRoute } from './pages/NotFoundPage';
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

  return (
    <Styles>
      <ReactRouter.BrowserRouter>
        <MeProvider>
          <ChatsProvider>
            <AuthRouter>
              <NewUserRouter>
                {width > 640 ? (
                  <>
                    <ChatListRoute style={{ maxWidth: 'min(37%, 48rem)' }} />
                    <ReactRouter.Switch>
                      <NewChatRoute path="/" exact />
                      <NewChatRoute path="/new" exact />
                      <ChatRoute path="/:chatId" exact />
                      <NotFoundRoute />
                    </ReactRouter.Switch>
                  </>
                ) : (
                  <>
                    <div /> {/* keeps alignment with other layout */}
                    <ReactRouter.Switch>
                      <ChatListRoute path="/" exact />
                      <NewChatRoute path="/new" exact />
                      <ChatRoute path="/:chatId" exact />
                      <NotFoundRoute />
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
