export const compose = (list) => {
  let children = null;
  list
    .slice()
    .reverse()
    .forEach((func) => {
      children = func(children);
    });
  return children;
};
