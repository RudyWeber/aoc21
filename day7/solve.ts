import { pipe } from "../utils/fp.ts";

/**
  S = 1 + 2 + 3 + 4 + ... +  (n - 2) +  (n - 1) +   n
  S =     1 + 2 + 3 + ... +  (n - 3) +  (n - 2) +  (n - 1) + n
 2S = 1 + 3 + 5 + 7 + ... + (2n - 5) + (2n - 3) + (2n - 1) + n
 2S = 0 + 0 + 0 + 0 + ... +  2n      +  2n      +  2n      + n
 2S = (n / 2)2n + n
 2S = n^2 + n
 2S = n(n + 1)
  S = n(n + 1) / 2
 */

const parseInput = (input: string): number[] => input.split(",").map(Number);

const getNumberOfCrabsAtEachPosition = (crabPositions: number[]): number[] =>
  crabPositions.reduce<number[]>((a, b) => (a[b] ??= 0, a[b]++, a), []);

const calculateFuelNeededConstant = (
  numberOfCrabsAtPositions: number[],
) =>
  (positionToAlignAt: number) =>
    numberOfCrabsAtPositions.reduce<number>(
      (fuelNeeded, numberOfCrabs, position) =>
        fuelNeeded +
        Math.abs(position - positionToAlignAt) * numberOfCrabs,
      0,
    );

const calculateFuelNeededIncreasing = (
  numberOfCrabsAtPositions: number[],
) =>
  (positionToAlignAt: number) =>
    numberOfCrabsAtPositions.reduce<number>(
      (fuelNeeded, numberOfCrabs, position) =>
        fuelNeeded +
        Math.abs(position - positionToAlignAt) *
          (Math.abs(position - positionToAlignAt) + 1) / 2 * numberOfCrabs,
      0,
    );

// const calculateCostAtEachPosition = (numberOfCrabsAtPositions: number[]) =>
//   Array.from({ length: numberOfCrabsAtPositions.length }, (_, index) => index)
//     .map(calculateFuelNeededToAlignAtPosition(numberOfCrabsAtPositions));

const calculateCostAtEachPosition = (
  calculationFunction: (xs: number[]) => (p: number) => number,
) =>
  (
    numberOfCrabsAtPositions: number[],
  ) =>
    Array.from({ length: numberOfCrabsAtPositions.length }, (_, index) => index)
      .map(
        calculationFunction(
          numberOfCrabsAtPositions,
        ),
      );

const arrayMin = (xs: number[]): number => Math.min(...xs);

export const solve1 = pipe(
  parseInput,
  getNumberOfCrabsAtEachPosition,
  calculateCostAtEachPosition(calculateFuelNeededConstant),
  arrayMin,
);

export const solve2 = pipe(
  parseInput,
  getNumberOfCrabsAtEachPosition,
  calculateCostAtEachPosition(calculateFuelNeededIncreasing),
  arrayMin,
);
