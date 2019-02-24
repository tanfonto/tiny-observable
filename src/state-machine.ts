import { VariadicFunc } from '../types';
import { IStateMachine } from './../interfaces';
import { tap, nthArg } from './utils';
import { clone } from 'clone-deep';

export function StateMachine<T>(
  valueProvider: () => T,
  reducer: VariadicFunc<T> = nthArg(1)
): IStateMachine<T> {
  let state: T = valueProvider();
  const snapshot = () => clone(state);
  const reset = (value: T = valueProvider()) => (state = value);

  function* forever(): Generator {
    while (true) {
      state = reducer(state, yield state);
    }
  }

  const { next, return: terminate } = forever().next();
  // invoker(none(), 'next'))(forever());

  return { next, terminate, snapshot, reset };
}
