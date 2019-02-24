import test from 'ava-ts';
import { add, always, concat } from 'rambda';
import { nthArg } from 'ramda';
import { StateMachine } from '../src/state-machine';

test('snapshot() returns current state', (t) => {
  const { next, snapshot } = StateMachine(always(0), add);
  next(42);
  next(42);

  const actual = snapshot();

  t.deepEqual(actual, 84);
});

test('snapshot() -> internal state is not exposed', (t) => {
  const { next, snapshot } = StateMachine<number[]>(always([]), concat);
  next([ 42 ]);
  next([ 42 ]);

  const state = snapshot();

  state.push(42);
  state.push(42);

  t.deepEqual(snapshot(), [ 42, 42 ]);
});

test('reset swaps the whole internal state with the value provided', (t) => {
  const { next, snapshot, reset } = StateMachine<number[]>(always([]), concat);
  next([ 42 ]);
  next([ 42 ]);

  reset([]);

  t.deepEqual([], snapshot());
});

test('state is accumulated using reducer provided (concatenates lists)', (t) => {
  const { next, snapshot } = StateMachine<number[]>(always([]), concat);
  next([ 42 ]);
  next([ 42 ]);
  next([ 42 ]);

  t.deepEqual([ 42, 42, 42 ], snapshot());
});

test('state is accumulated using reducer provided (adds numbers)', (t) => {
  const { next, snapshot } = StateMachine(always(5), add);
  next(5);
  next(1);

  t.deepEqual(11, snapshot());
});

test('state is accumulated using reducer provided (gets latest)', (t) => {
  const { next, snapshot } = StateMachine<number[]>(always([]), nthArg(1));
  next([ 42 ]);
  next([ 42 ]);

  t.deepEqual([ 42 ], snapshot());
});
