export type Unsafe<T> = T | undefined | null;
export type Func<T = any, TR = T> = (arg: T) => TR;
export type VariadicFunc<T = any, TR = any> = Function & ((...args: T[]) => TR);
