// deno-lint-ignore no-explicit-any
export const pipe = (...fns: ((...args: any[]) => any)[]) => fns.reduce((g, f) => (...args: any[]) => f(g(...args)));
export const fmap = <T, U>(f: (x: T) => U) => (xs: T[]): U[] => xs.map(f); 