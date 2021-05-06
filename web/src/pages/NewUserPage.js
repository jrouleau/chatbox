import { auth } from '../firebase';
import * as React from 'react';

export function NewUserPage({ onSave }) {
  console.log('NewUserPage');

  const inputRef = React.useRef();

  const save = async (event) => {
    event.preventDefault();
    const name = inputRef.current?.value;
    await auth.currentUser.updateProfile({
      displayName: name,
    });
    if (typeof onSave === 'function') onSave();
  };

  return (
    <>
      <p>{`Please enter a name:`}</p>
      <form onSubmit={save}>
        <input ref={inputRef} type="text" />
        <button type="submit">Save</button>
      </form>
    </>
  );
}
