export const tap = (effect: Function) => x => (effect(), x);
