export type Unsafe<T> = T | undefined | null;

export type NullaryFunc<T = any> = Function & (() => T);

export type UnaryFunc<T = any, TR = T> = Function & ((arg: T) => TR);

export type VariadicFunc<T = any, TR = any> = Function & ((...args: T[]) => TR);

export type NullaryVoid = NullaryFunc<void>;

export type UnaryVoid<T> = UnaryFunc<T, void>;
