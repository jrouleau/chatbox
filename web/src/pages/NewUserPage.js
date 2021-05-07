import { auth, db } from '../firebase';
import * as React from 'react';

export function NewUserPage({ onSave }) {
  console.log('NewUserPage');

  const inputRef = React.useRef();

  const save = async (event) => {
    event.preventDefault();
    const name = inputRef.current?.value;
    if (auth.currentUser) {
      await db.collection('users').doc(auth.currentUser.uid).set(
        {
          displayName: name,
        },
        { merge: true },
      );
    }
    if (typeof onSave === 'function') onSave();
  };

  return (
    <>
      <p>NewUserPage</p>
      <p>{`Please enter a name:`}</p>
      <form onSubmit={save}>
        <input ref={inputRef} type="text" />
        <button type="submit">Save</button>
      </form>
    </>
  );
}
