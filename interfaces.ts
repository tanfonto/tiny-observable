import { Func, Unsafe } from './types';

export interface IObserver<T> {
  next: Func<T, IObservation<T>>;
  return: Func<T, IObservation<T>>;
}

export interface IObservation<T> extends IteratorResult<Unsafe<T>> {}

export interface IStateMachine<T> {
  next: Func<T, IObservation<T>>;
  snapshot: () => T;
  reset: Func<T>;
  terminate?: (arg: T) => void;
}
