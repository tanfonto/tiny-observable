import { Func, Unsafe, VariadicFunc } from '../types';
import { Observer } from './observer';
import { Registry } from './registry';
import { of } from './utils';

type IO<T> = VariadicFunc<Func<T, void>, void>;

export function Observable<T>(connect: IO<Unsafe<T>>) {
  const { register, unregister, snapshot } = Registry<Unsafe<T>>();
  const broadcast = (val: Unsafe<T>) => snapshot().forEach(x => x.next(val));

  return function subscribe(
    continuation: (arg: Unsafe<T>) => void
  ): () => void {
    once(connect)(broadcast);

    const observer = Observer<Unsafe<T>>(continuation, unsafe());
    register(of(observer));

    return function unsubscribe(): void {
      observer.return(unsafe()), unregister(observer);
    };
    // dispose
  };
}
