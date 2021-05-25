import * as React from 'react';
import * as ReactRouter from 'react-router-dom';

export function NotFoundRoute({ style, ...props }) {
  console.log('NotFoundRoute');

  return (
    <ReactRouter.Route {...props}>
      <NotFoundPage style={style} />
    </ReactRouter.Route>
  );
}

function NotFoundPage({ style }) {
  console.log('NotFoundPage');

  return (
    <div style={style}>
      <p>NotFoundPage</p>
    </div>
  );
}
