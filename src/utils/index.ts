export { compose } from './compose';
export { concat } from './concat';
export { prop } from './prop';
export { tap } from './tap';
export { maybe } from './maybe';

export const of = x => [x];
export const identity = x => x;
export const always = x => () => x;
export const add = (x: number, y: number) => x + y;
export const none = always(0);
export const noop = () => void 0;
export const nthArg = (n: number) => (...args: any[]) => args[n];
// export { juxt, once, pluck, without, invoker, nthArg } from 'ramda';
// unsafe;
// none;
//without
