export const compose = <T>(...fns: ((arg: T) => any)[]) => (val: T) =>
  fns.reduce((v, f) => f(v), val);
