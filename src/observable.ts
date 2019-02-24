import { always, juxt, of, once, pluck } from 'ramda';
import { NullaryVoid, UnaryFunc, UnaryVoid, Unsafe, VariadicFunc } from '../typings/common';
import { Observer } from './observer';
import { Registry } from './registry';
import { unsafe } from './utils/ramdax';

type IO<T> = VariadicFunc<UnaryFunc<T, void>, void>;

export function Observable<T>(connect: IO<Unsafe<T>>) {
  const { register, unregister, snapshot } = Registry<Unsafe<T>>();
  const notify = always(juxt(pluck('next', snapshot())));

  return function subscribe(
    continuation: UnaryVoid<Unsafe<T>>,
  ): NullaryVoid {
    // dispose
    once(connect)(notify);

    const observer = Observer<Unsafe<T>>(continuation, unsafe());
    register(of(observer));

    return function unsubscribe(): void {
      (observer.return(unsafe()), unregister(observer));
    };
  };
}
