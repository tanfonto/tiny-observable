import { NullaryFunc, UnaryFunc, UnaryVoid, Unsafe } from './common';

export interface IObserver<T> {
  next: UnaryFunc<T, IObservation<T>>;
  return: UnaryFunc<T, IObservation<T>>;
}

export interface IObservation<T> extends IteratorResult<Unsafe<T>> {}

export interface IStateMachine<T> {
  next: UnaryFunc<T, IObservation<T>>;
  snapshot: NullaryFunc<T>;
  reset: UnaryFunc<T>;
  terminate?: UnaryVoid<T>;
}
