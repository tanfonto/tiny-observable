import { Unsafe } from '../types';
import { IObserver } from '../interfaces';
import { StateMachine } from './state-machine';
import { tap, compose, prop, always, maybe } from './utils';

const done = <T>(value: T) => ({ done: true, value });

export function Observer<T>(
  continuation: (arg: Unsafe<T>) => void,
  value: T
): IObserver<T> {
  const { next, terminate } = StateMachine(always(value));

  return {
    next: compose(
      tap(
        compose(
          continuation,
          prop('value')
        )
      ),
      next
    ),
    return: (val: T) => (maybe(terminate), done(val))
  };
}
