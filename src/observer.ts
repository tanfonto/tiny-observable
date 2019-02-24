import { always, compose, prop, tap } from 'ramda';
import { UnaryVoid, Unsafe } from '../typings/common';
import { IObserver } from '../typings/interfaces';
import { StateMachine } from './state-machine';
import { safe } from './utils/ramdax';

const done = <T>(value: T) => ({ done: true, value });

export function Observer<T>(
  continuation: UnaryVoid<Unsafe<T>>,
  value: T,
): IObserver<T> {
  const { next, terminate } = StateMachine(always(value));

  return {
    next: compose(tap(compose(continuation, prop('value'))), next),
    return: (val: T) => (safe(terminate), done(val)),
  };
}
