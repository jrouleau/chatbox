import * as React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ProvideMe } from './contexts/MeCtx';
import { ChatRoute } from './routes/ChatRoute';
import { ChatListRoute } from './routes/ChatListRoute';
import { NotFoundRoute } from './routes/NotFoundRoute';
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
        <ProvideMe>
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
                  <ChatListRoute style={{ width: '30%', maxWidth: '48rem' }} />
                  <Switch>
                    <ChatRoute path="/:chatId" exact />
                    <NotFoundRoute />
                  </Switch>
                </div>
              ) : (
                <div>
                  <div /> {/* keeps alignment with other layout */}
                  <Switch>
                    <ChatListRoute path="/" exact />
                    <ChatRoute path="/:chatId" exact />
                  </Switch>
                </div>
              )}
            </NewUserRouter>
          </AuthRouter>
        </ProvideMe>
      </BrowserRouter>
    </>
  );
}
