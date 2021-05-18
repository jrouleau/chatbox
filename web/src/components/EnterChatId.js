import { db } from '../firebase';
import * as React from 'react';
import * as ReactRouter from 'react-router-dom';

export function EnterChatId() {
  console.log('EnterChatId');

  const inputRef = React.useRef();
  const history = ReactRouter.useHistory();

  const enter = (event) => {
    event.preventDefault();
    const id = inputRef.current?.value || db.collection('id').doc().id;
    history.replace(`/${id}`);
  };

  return (
    <>
      <p>{`Please enter a chat id:`}</p>
      <form
        onSubmit={enter}
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <input
          ref={inputRef}
          type="text"
          style={{
            width: '100%',
          }}
        />
        <button type="submit">Enter</button>
      </form>
      <button
        onClick={() => history.replace(`/${db.collection('id').doc().id}`)}
      >
        +
      </button>
    </>
  );
}
