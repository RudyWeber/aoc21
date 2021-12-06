import { getInput } from "../utils/aoc.ts";
import { fmap, pipe } from "../utils/fp.ts";

const getDay1Data = async () => {
  const inputString = await getInput(1);
  return inputString.split("\n").filter(Boolean).map(Number);
};

const sum = (x: number, y: number): number => x + y;
const sumAll = (xs: number[]): number => xs.reduce(sum);

const makeWindows = (data: number[]): number[][] => {
  const [a, b, c, ...rest] = data;

  if (
    typeof a === "undefined" || typeof b === "undefined" ||
    typeof c === "undefined"
  ) {
    return [];
  }

  return [[a, b, c], ...makeWindows([b, c, ...rest])];
};

const solve1 = (data: number[]) =>
  data.reduce<{ count: number; prev: null | number }>(
    ({ count, prev }, current) => ({
      count: prev ? (prev < current ? count + 1 : count) : count,
      prev: current,
    }),
    { count: 0, prev: null },
  ).count;

const solve2: (xs: number[]) => number = pipe(
  makeWindows,
  fmap(sumAll),
  solve1,
);

const data = await getDay1Data();

const result1 = solve1(data);
const result2 = solve2(data);

console.log(result1);
console.log(result2);
