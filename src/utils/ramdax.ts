import { always, ifElse, isNil, unapply, uncurryN } from 'ramda';

export const noop = always(void 0 );
export const safe = uncurryN(2, ifElse(isNil, noop, unapply ));
export const unsafe = always(undefined );
export const none = always(0);
