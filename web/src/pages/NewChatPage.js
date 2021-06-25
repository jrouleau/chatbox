import * as React from 'react';
import * as ReactRouter from 'react-router';
import styled from 'styled-components';
import { useChats } from '../contexts/ChatsCtx';
import { Page } from '../components/Page';

const Styles = styled(Page)``;

export function NewChatPage({ style }) {
  const history = ReactRouter.useHistory();
  const chats = useChats();

  React.useEffect(() => {
    const lastChat = chats.list[0];
    if (lastChat) history.replace(`/c/${lastChat.id}`);
  }, [history, chats.list]);

  return <Styles style={style}></Styles>;
}
