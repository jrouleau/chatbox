import * as React from 'react';

export const ScreenSizeCtx = React.createContext();

export const ScreenSizeProvider = ({ children }) => {
  const [width, setWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const handleResize = (e) => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const iface = React.useMemo(() => {
    return {
      isLarge: width >= 768,
      isSmall: width < 768,
    };
  }, [width]);

  return (
    <ScreenSizeCtx.Provider value={iface}>{children}</ScreenSizeCtx.Provider>
  );
};

export const useScreenSize = () => {
  const screenSize = React.useContext(ScreenSizeCtx);
  if (!screenSize) throw new Error('Missing ScreenSizeCtx.Provider');
  return screenSize;
};
