import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import styled from 'styled-components';
import { useMe } from '../contexts/MeCtx';

const Styles = styled.div`
  width: 100%;
`;

export function NewUserRoute({ style, ...props }) {
  console.log('NewUserRoute');

  return (
    <ReactRouter.Route {...props}>
      <NewUserPage style={style} />
    </ReactRouter.Route>
  );
}

function NewUserPage({ style }) {
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
