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

const calculateOxygenRating = (xs: string[], index = 0): string[] => {
  const onlyNthBit = xs.map((x) => +x[index]);
  const { zeros, ones } = onlyNthBit.reduce(({ zeros, ones }, bit) => ({
    zeros: bit === 0 ? zeros + 1 : zeros,
    ones: bit === 1 ? ones + 1 : ones,
  }), { zeros: 0, ones: 0 });
  const bitToKeep = zeros > ones ? 0 : 1;
  const kept = xs.filter((x) => +x[index] === bitToKeep);

  if (kept.length === 1) {
    return kept;
  }

  return calculateOxygenRating(kept, index + 1);
};

const calculateCO2Rating = (xs: string[], index = 0): string[] => {
  const onlyNthBit = xs.map((x) => +x[index]);
  const { zeros, ones } = onlyNthBit.reduce(({ zeros, ones }, bit) => ({
    zeros: bit === 0 ? zeros + 1 : zeros,
    ones: bit === 1 ? ones + 1 : ones,
  }), { zeros: 0, ones: 0 });
  const bitToKeep = zeros <= ones ? 0 : 1;
  const kept = xs.filter((x) => +x[index] === bitToKeep);

  if (kept.length === 1) {
    return kept;
  }

  return calculateCO2Rating(kept, index + 1);
};

const calculateScore1 = (
  { gamma, epsilon }: { gamma: number; epsilon: number },
): number => gamma * epsilon;

const calculateScore2 = (
  { oxigen, co2 }: { oxigen: number; co2: number },
) => oxigen * co2;

const solve1: (input: string) => number = pipe(
  parseInput,
  calculateGammaAndEpsilonRates,
  calculateScore1,
);

const solve2: (input: string) => number = pipe(
  parseInput,
  (x) => ({
    oxigen: Number.parseInt(calculateOxygenRating(x)[0], 2),
    co2: Number.parseInt(calculateCO2Rating(x)[0], 2),
  }),
  calculateScore2,
);

const result1 = solve1(input);
const result2 = solve2(input);

console.log(result1);
console.log(result2);
