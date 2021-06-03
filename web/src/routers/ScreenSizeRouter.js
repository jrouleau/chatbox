import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import { useScreenSize } from '../contexts/ScreenSizeCtx';
import { ChatListPage } from '../pages/ChatListPage';
import { NewChatPage } from '../pages/NewChatPage';

export function ScreenSizeRouter({ children }) {
  const screenSize = useScreenSize();

  return screenSize.isLarge ? (
    <>
      <ChatListPage
        style={{
          maxWidth: 'min(37%, 48rem)',
          paddingRight: 0,
          overflow: 'initial',
        }}
      />
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
