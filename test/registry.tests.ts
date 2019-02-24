import { test } from 'ava-ts';
import { Observer } from '../src/observer';
import { Registry } from '../src/registry';
import { noop } from '../src/utils/ramdax';

test('register() stores observer provided', t => {
  const { register, snapshot } = Registry();

  const observerOne = Observer(noop, {});
  const observerTwo = Observer(noop, {});
  register([ observerOne, observerTwo ]);

  t.deepEqual(snapshot(), [ observerOne, observerTwo ]);
});

test('unregister() removes observer provided', t => {
  const { register, unregister, snapshot } = Registry();

  const observerOne = Observer(noop, {});
  const observerTwo = Observer(noop, {});
  register([ observerOne, observerTwo ]);
  unregister(observerOne);

  t.deepEqual(snapshot(), [ observerTwo ]);
});