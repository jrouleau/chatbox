import * as React from 'react';
import styled from 'styled-components';
import { Page } from '../components/Page';
import { useMe } from '../contexts/MeCtx';

const Styles = styled(Page)``;

export function NewUserPage({ style }) {
  console.log('NewUserPage');

  const me = useMe();

  const displayNameRef = React.useRef();
  const save = async (e) => {
    e.preventDefault();
    await me.set('displayName', displayNameRef.current?.value);
  };

  return (
    <Styles style={style}>
      <p>NewUserPage</p>
      <p>{`Please enter a name:`}</p>
      <form onSubmit={save}>
        <input ref={displayNameRef} type="text" />
        <button type="submit">Save</button>
      </form>
    </Styles>
  );
}
