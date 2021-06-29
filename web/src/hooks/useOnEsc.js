import * as React from 'react';

export const useOnEsc = (onEsc, deps = []) => {
  React.useEffect(() => {
    const cb = (e) => {
      if (e.key === 'Escape') onEsc();
    };
    document.addEventListener('keyup', cb, false);
    return () => document.removeEventListener('keyup', cb, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onEsc, ...deps]);
};
