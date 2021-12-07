import { getInputFromFile } from "../utils/aoc.ts";
import { pipe } from "../utils/fp.ts";

const input = await getInputFromFile("./input");

const parseInput = (input: string): string[] =>
  input.split("\n").filter(Boolean);

const flip = (n: string): string =>
  n.split("").map((x) => x === "0" ? "1" : "0").join("");

const calculateGammaAndEpsilonRates = (
  xs: string[],
): { gamma: number; epsilon: number } => {
  const gammaString = xs.reduce<[number, number][]>((acc, n) => {
    n.split("").forEach((x, index) => acc[index][+x]++);
    return acc;
  }, Array.from({ length: xs[0].length }, () => [0, 0])).map(([a, b]) =>
    a > b ? 0 : 1
  ).join("");
  const gamma = Number.parseInt(gammaString, 2);
  const epsilon = Number.parseInt(flip(gammaString), 2);

  return { gamma, epsilon };
};

const calculateScore = (
  { gamma, epsilon }: { gamma: number; epsilon: number },
): number => gamma * epsilon;

const solve1: (input: string) => number = pipe(
  parseInput,
  calculateGammaAndEpsilonRates,
  calculateScore,
);

const result1 = solve1(input);

console.log(result1);
