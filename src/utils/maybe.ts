export const maybe = (fn?: Function) => (...args: any[]) =>
  fn ? fn(...args) : void 0;
