import { pipe, zip } from "../utils/fp.ts";

type entry = { x1: number; y1: number; x2: number; y2: number };
type parsedInput = entry[];

const parseInput = (input: string): parsedInput =>
  input.split("\n").reduce<parsedInput>((acc, current) => {
    const { x1, y1, x2, y2 } = current.replaceAll(" ", "").match(
      /(?<x1>\d+),(?<y1>\d+)->(?<x2>\d+),(?<y2>\d+)/,
    )?.groups ?? {};

    return [...acc, { x1: +x1, y1: +y1, x2: +x2, y2: +y2 }];
  }, []);

const range = (start: number, end: number): number[] =>
  Array.from(
    { length: Math.abs(end - start) + 1 },
    (_, index) => start + (start < end ? index : -index),
  );

const makeMap = (part: "part1" | "part2") =>
  (parsedInput: parsedInput): Map<string, number> =>
    parsedInput.reduce<Map<string, number>>((map, { x1, y1, x2, y2 }) => {
      const keys = (x1 === x2)
        ? range(y1, y2).map((y) => `${x1},${y}`)
        : (y1 === y2)
        ? range(x1, x2).map((x) => `${x},${y1}`)
        : (part === "part1"
          ? []
          : zip(range(x1, x2), range(y1, y2)).map(([x, y]) => `${x},${y}`));

      keys.forEach((key) => {
        map.set(key, (map.get(key) ?? 0) + 1);
      });

      return map;
    }, new Map());

const countValuesAbove = (threshold: number) =>
  (map: Map<string, number>): number =>
    [...map.values()].reduce<number>(
      (acc, current) => current >= threshold ? acc + 1 : acc,
      0,
    );

export const solve1: (input: string) => number = pipe(
  parseInput,
  makeMap("part1"),
  countValuesAbove(2),
);

export const solve2: (input: string) => number = pipe(
  parseInput,
  makeMap('part2'),
  countValuesAbove(2),
);
