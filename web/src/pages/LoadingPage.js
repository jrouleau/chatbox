import * as React from 'react';
import * as ReactRouter from 'react-router-dom';

export function LoadingRoute({ style, ...props }) {
  console.log('LoadingRoute');

  return (
    <ReactRouter.Route {...props}>
      <LoadingPage style={style} />
    </ReactRouter.Route>
  );
}

export function LoadingPage({ style }) {
  console.log('LoadingPage');

  return (
    <div style={style}>
      <p>LoadingPage</p>
    </div>
  );
}
