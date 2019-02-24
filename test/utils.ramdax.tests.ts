import test from 'ava-ts';
import { noop, unsafe, safe, none } from '../src/utils/ramdax';
import { identity } from 'ramda';

test('noop() returns undefined', (t) => {
  const actual = noop();
  t.deepEqual(undefined, actual);
});

test('unsafe() returns undefined', (t) => {
  const actual = unsafe();
  t.deepEqual(undefined, actual);
});

test('safe() calls provided function', t => {
  const actual = safe(identity, 42);
  t.deepEqual(actual, [ 42 ]);
});

test('safe() does nothing if provided with nil function reference', t => {
  safe(null, 42);
  t.pass();
});

test('none() returns 0', t => {
  const actual = none();
  t.deepEqual(actual, 0);
});