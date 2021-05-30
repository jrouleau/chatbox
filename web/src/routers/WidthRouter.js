import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import { ChatListPage } from '../pages/ChatListPage';
import { NewChatPage } from '../pages/NewChatPage';

export function WidthRouter({ children }) {
  const [width, setWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const handleResize = (e) => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width >= 768 ? (
    <>
      <ChatListPage style={{ maxWidth: 'min(37%, 48rem)', paddingRight: 0 }} />
      <ReactRouter.Switch>
        <ReactRouter.Route path="/" exact component={NewChatPage} />
        {children}
      </ReactRouter.Switch>
    </>
  ) : (
    <>
      <div />
      <ReactRouter.Switch>
        <ReactRouter.Route path="/" exact component={ChatListPage} />
        {children}
      </ReactRouter.Switch>
    </>
  );
}
