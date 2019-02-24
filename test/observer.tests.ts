import { test } from 'ava-ts';
import { Observer } from '../src';
import { noop } from '../src/utils';

test('next() fires continuation function provided', t => {
  const evidence = new Array();
  const observer = Observer(x => evidence.push(x), 0);
  observer.next(2);

  t.deepEqual(evidence, [2]);
});

test('terminate() closes the generator', t => {
  const observer = Observer(noop, null);
  const res = observer.return(null);

  t.true(res.done);
});
