import * as React from 'react';
import * as ReactRouter from 'react-router-dom';

export function HomePage() {
  console.log('HomePage');

  const inputRef = React.useRef();
  const history = ReactRouter.useHistory();

  const enter = (event) => {
    event.preventDefault();
    const id = inputRef.current?.value;
    history.push(`/${id}`);
  };

  return (
    <>
      <p>{`Please enter a chat id:`}</p>
      <form onSubmit={enter}>
        <input ref={inputRef} type="text" />
        <button type="submit">Enter</button>
      </form>
    </>
  );
}
