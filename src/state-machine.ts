import { clone, invoker, nthArg, tap } from 'ramda';
import { NullaryFunc, VariadicFunc } from '../typings/common';
import { IStateMachine } from './../typings/interfaces';
import { none } from './utils/ramdax';

export function StateMachine<T>(
  valueProvider: NullaryFunc<T>,
  reducer: VariadicFunc<T> = nthArg(1),
): IStateMachine<T> {

  let state: T = valueProvider();
  const snapshot = () => clone(state);
  const reset = (value: T = valueProvider()) => state = value;

  function* forever(): Generator {
    while (true) {
      state = reducer(state, yield state);
    }
  }

  const { next, return: terminate } = tap(invoker(none(), 'next'), forever());

  return { next, terminate, snapshot, reset };
}
