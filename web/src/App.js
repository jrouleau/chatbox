import { db } from './firebase';
import * as React from 'react';

function App() {
  const inputRef = React.useRef();

  const send = () => {
    const message = inputRef.current?.value;
    if (message) inputRef.current.value = '';

    db.collection('chats').doc('TODO').collection('messages').add({
      author: 'TODO',
      message,
    });
  };

  return (
    <>
      <input ref={inputRef} type="text"></input>
      <button onClick={send}>Send</button>
    </>
  );
}

export default App;
