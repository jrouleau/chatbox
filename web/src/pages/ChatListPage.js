import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import styled from 'styled-components';
import { useMe } from '../contexts/MeCtx';
import { ChatList } from '../components/ChatList';
import { EnterChatId } from '../components/EnterChatId';
import { Nav, Spacer } from '../components/Nav';
import { Page } from '../components/Page';
import { Button } from '../components/Button';

const Styles = styled(Page)`
  padding-bottom: 2.4rem;

  & > nav {
    margin-top: 1.2rem;
    margin-bottom: 1.6rem;

    & > #name {
      height: 4.8rem;
      line-height: 4.8rem;
      padding-left: 1.6rem;
      padding-right: 0.4rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 2.8rem;
      font-weight: bold;
      color: #fff;
    }

    & > input#name {
      width: 100%;
      padding-right: 1.6rem;
      margin-right: 0.4rem;
      background: #21212180;
      outline: none;
      border: none;
      border-radius: 0.4rem;
    }
  }
`;

export function ChatListPage({ style }) {
  const history = ReactRouter.useHistory();
  const me = useMe();

  /* Name */
  const [isEdittingName, setIsEdittingName] = React.useState(false);
  const [name, setName] = React.useState(me.name);
  const editName = React.useCallback(() => {
    setIsEdittingName(true);

    // const el = document.getElementById('name');
    // if (el) el.focus();
  }, []);

  const cancelEdittingName = React.useCallback(() => {
    setIsEdittingName(false);
    setName(me.name);
  }, [me.name]);

  const saveName = async () => {
    await me.update({ name });
    setIsEdittingName(false);
  };

  /* Logout */
  const logout = () => {
    history.push('/');
    me.signOut();
  };

  /* Delete Account */
  const deleteAccount = () => {
    history.push('/');
    me.delete();
  };

  return (
    <Styles style={style}>
      <Nav>
        {!me.isAuth ? (
          <>
            <Button className="icon" onClick={() => history.push('/')}>
              home
            </Button>
            <Button
              className="stretch"
              style={{ marginLeft: '0.8rem' }}
              onClick={() => history.push('/login')}
            >
              Login
            </Button>
          </>
        ) : (
          <>
            {!isEdittingName ? (
              <>
                <h2 id="name">{me.name || 'Anonymous'}</h2>
                <Button className="transparent circle icon" onClick={editName}>
                  edit
                </Button>
                <Spacer />
                {me.isAnonymous ? (
                  <Button
                    className="transparent circle icon"
                    tooltip="Delete Account"
                    onClick={deleteAccount}
                  >
                    delete
                  </Button>
                ) : (
                  <Button
                    className="transparent circle icon"
                    tooltip="Logout"
                    onClick={logout}
                  >
                    logout
                  </Button>
                )}
              </>
            ) : (
              <>
                <input
                  id="name"
                  placeholder="Anonymous"
                  maxLength={16}
                  value={name}
                  autoFocus
                  onChange={(e) => setName(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.key === 'Escape') {
                      cancelEdittingName();
                    } else if (e.key === 'Enter') {
                      saveName();
                    }
                  }}
                />
                <Button className="transparent circle icon" onClick={saveName}>
                  save
                </Button>
                <Button
                  className="transparent circle icon"
                  onClick={cancelEdittingName}
                >
                  cancel
                </Button>
              </>
            )}
          </>
        )}
      </Nav>
      <EnterChatId withNew />
      <ChatList />
    </Styles>
  );
}
