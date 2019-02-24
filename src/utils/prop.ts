export const prop = <T extends object>(key: keyof T) => (x: T) =>
  x ? x[key] : void 0;
