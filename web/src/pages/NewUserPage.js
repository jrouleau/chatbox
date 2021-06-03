import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Nav, Spacer } from '../components/Nav';
import { Page } from '../components/Page';
import { useMe } from '../contexts/MeCtx';

const Styles = styled(Page)`
  max-width: 124rem;

  & > h2 {
    margin-bottom: 1.8rem;
    font-size: 2.4rem;
  }

  & > form {
    width: 100%;
    max-width: 36rem;
    display: flex;
    flex-direction: row;

    @media (max-width: 480px) {
      flex-direction: column;

      & > button {
        width: 100%;
        margin: 1.2rem 0 0 0 !important;
      }
    }
  }
`;

export function NewUserPage({ style }) {
  const history = ReactRouter.useHistory();
  const me = useMe();

  const cancel = async () => {
    history.goBack();
    me.delete();
  };

  const [displayName, setDisplayName] = React.useState('');
  const save = async (e) => {
    e.preventDefault();
    await me.update({ displayName });
  };

  return (
    <Styles style={style}>
      <Nav>
        <Spacer />
        <Button
          className="transparent circle icon"
          tooltip="Cancel"
          onClick={cancel}
        >
          close
        </Button>
      </Nav>
      <h2>Hello, my name is...</h2>
      <form onSubmit={save}>
        <Input
          className="stretch"
          type="text"
          placeholder="Enter name (optional)"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <Button type="submit" className="inverted">
          Continue
        </Button>
      </form>
    </Styles>
  );
}
