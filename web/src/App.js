import * as React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ChatsProvider } from './contexts/ChatsCtx';
import { MeProvider } from './contexts/MeCtx';
import { ChatRoute } from './pages/ChatPage';
import { ChatListRoute } from './pages/ChatListPage';
import { NewChatRoute } from './pages/NewChatPage';
import { NotFoundRoute } from './pages/NotFoundPage';
import { AuthRouter } from './routers/AuthRouter';
import { NewUserRouter } from './routers/NewUserRouter';

export function App() {
  console.log('App');

  const [width, setWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const handleResize = (e) => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <p>App</p>
      <BrowserRouter>
        <MeProvider>
          <ChatsProvider>
            <AuthRouter>
              <NewUserRouter>
                {width > 640 ? (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                    }}
                  >
                    <ChatListRoute
                      style={{ width: '30%', maxWidth: '48rem' }}
                    />
                    <Switch>
                      <NewChatRoute path="/" exact />
                      <NewChatRoute path="/new" exact />
                      <ChatRoute path="/:chatId" exact />
                      <NotFoundRoute />
                    </Switch>
                  </div>
                ) : (
                  <div>
                    <div /> {/* keeps alignment with other layout */}
                    <Switch>
                      <ChatListRoute path="/" exact />
                      <NewChatRoute path="/new" exact />
                      <ChatRoute path="/:chatId" exact />
                      <NotFoundRoute />
                    </Switch>
                  </div>
                )}
              </NewUserRouter>
            </AuthRouter>
          </ChatsProvider>
        </MeProvider>
      </BrowserRouter>
    </>
  );
}
