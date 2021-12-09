// deno-lint-ignore no-explicit-any
export const pipe = (...fns: ((...args: any[]) => any)[]) => fns.reduce((g, f) => (...args: any[]) => f(g(...args)));
export const fmap = <T, U>(f: (x: T) => U) => (xs: T[]): U[] => xs.map(f); 
export const tap1 = <T>(f: (x: T) => void) => (x: T): T => (f(x), x);
export const zip = <T, U>(xs: T[], ys: U[]): [T, U][] => xs.map((x, index) => [x, ys[index]]);