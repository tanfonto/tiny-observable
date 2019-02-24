import { IObserver } from '../interfaces';
import { StateMachine } from './state-machine';

type Observers<T> = Array<IObserver<T>>;

export function Registry<T>() {
  const { next, snapshot, reset } = StateMachine<Observers<T>>(
    always(new Array<IObserver<T>>()),
    concat
  );

  function unregister(observer: IObserver<T>) {
    reset(without([observer], snapshot()));
  }

  return { register: next, unregister, snapshot };
}
