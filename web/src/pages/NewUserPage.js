import * as React from 'react';
import styled from 'styled-components';
import { Nav, Spacer } from '../components/Nav';
import { Page } from '../components/Page';
import { useMe } from '../contexts/MeCtx';

const Styles = styled(Page)`
  max-width: 124rem;

  & > h2 {
    margin-bottom: 1.8rem;
    font-size: 2.4rem;
  }
`;

export function NewUserPage({ style }) {
  const me = useMe();

  const cancel = async () => {
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
        <button className="transparent circle icon" onClick={cancel}>
          close
        </button>
      </Nav>
      <h2>Hello, my name is...</h2>
      <form onSubmit={save}>
        <input
          type="text"
          placeholder="Enter name (optional)"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <button type="submit" className="inverted">
          Continue
        </button>
      </form>
    </Styles>
  );
}
