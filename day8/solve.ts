import { pipe } from "../utils/fp.ts";

type sevenSegment = string;
type combination = sevenSegment[];
type output = [sevenSegment, sevenSegment, sevenSegment, sevenSegment];
type entry = [combination, output];
type data = entry[];

const parseInput = (input: string): data =>
  input.split("\n").filter(Boolean).map((line) =>
    line.split("|").map((x) => x.split(" ").filter(Boolean)) as entry
  );

const countEasyDigitsInOutput = ([_, output]: entry) =>
  output.reduce<number>(
    (count, digit) =>
      (digit.length === 2 || digit.length === 3 || digit.length === 4 ||
          digit.length === 7)
        ? count + 1
        : count,
    0,
  );

const countEasyDigitsInAllOutputs = (data: data) =>
  data.reduce<number>(
    (count, entry) => count + countEasyDigitsInOutput(entry),
    0,
  );

export const solve1 = pipe(
  parseInput,
  countEasyDigitsInAllOutputs,
);

export const solve2 = pipe(
  parseInput,
);
