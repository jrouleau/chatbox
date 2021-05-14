import * as React from 'react';
import { useMe } from '../contexts/MeCtx';

export function NewUserPage({ style }) {
  console.log('NewUserPage');

  const me = useMe();

  const displayNameRef = React.useRef();
  const save = async (e) => {
    e.preventDefault();
    await me.set('displayName', displayNameRef.current?.value);
  };

  return (
    <>
      <p>NewUserPage</p>
      <p>{`Please enter a name:`}</p>
      <form onSubmit={save}>
        <input ref={displayNameRef} type="text" />
        <button type="submit">Save</button>
      </form>
    </>
  );
}
