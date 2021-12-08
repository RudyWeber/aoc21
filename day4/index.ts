import { getInputFromFile } from "../utils/aoc.ts";
import { pipe } from "../utils/fp.ts";

const input = await getInputFromFile("./input");

const parseLine = (xs: string, sep = " "): number[] =>
  xs.split(sep).filter(Boolean).map((x) => +x);

type parsedInput = { numbers: number[]; grids: number[][][] };
type bingoMap = Map<
  number,
  { checked: boolean; gridIndexes: number[]; positions: [number, number][] }
>;
type parsedInputWithMap = parsedInput & { map: bingoMap };

const parseInput = (input: string): parsedInput => {
  const [numbersLine, , ...lines] = input.split("\n");
  const numbers = parseLine(numbersLine, ",");

  const { grids } = lines.reduce<{ grids: number[][][]; gridNumber: number }>(
    ({ grids, gridNumber }, line) => {
      const row = parseLine(line);
      if (!row.length) {
        return { grids, gridNumber: gridNumber + 1 };
      }
      if (!grids[gridNumber]) {
        grids[gridNumber] = [row];
      } else {
        grids[gridNumber].push(row);
      }

      return { grids, gridNumber };
    },
    { grids: [], gridNumber: 0 },
  );

  return { numbers, grids };
};

const buildGridMaps = (parsedInput: parsedInput): parsedInputWithMap => ({
  ...parsedInput,
  map: parsedInput.grids.reduce<bingoMap>(
    (map, grid, gridIndex) => {
      for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
          const n = grid[y][x];
          const existingValue = map.get(n);
          if (!existingValue) {
            const positions: [number, number][] = [];
            map.set(n, {
              checked: false,
              gridIndexes: [gridIndex],
              positions: (positions[gridIndex] = [x, y], positions),
            });
          } else {
            map.set(n, {
              checked: false,
              gridIndexes: [...existingValue.gridIndexes, gridIndex],
              positions:
                (existingValue.positions[gridIndex] = [x, y],
                  existingValue.positions),
            });
          }
        }
      }

      return map;
    },
    new Map(),
  ),
});

const getLine = (grid: number[][], index: number): number[] => grid[index];
const getColumn = (grid: number[][], index: number): number[] =>
  grid.map((line) => line[index]);
const isChecked = (map: bingoMap) => (n: number) => !!map.get(n)?.checked;

const gridWins = (
  grid: number[][],
  [x, y]: [x: number, y: number],
  map: bingoMap,
): boolean => {
  const line = getLine(grid, y);
  const column = getColumn(grid, x);

  return line.every(isChecked(map)) ||
    column.every(isChecked(map));
};

const sum = (a: number, b: number): number => a + b;

const sumAllUnmarkedNumbers = (grid: number[][], map: bingoMap) =>
  grid.reduce<number>(
    (total, line) =>
      total + line.filter((n) => !map.get(n)?.checked).reduce(sum, 0),
    0,
  );

const checkNumber = (map: bingoMap, n: number) => {
  const existingValue = map.get(n);

  if (!existingValue) {
    return;
  }

  map.set(n, {
    ...existingValue,
    checked: true,
  });

  return map.get(n);
};

const play = (
  { numbers, grids, map }: parsedInputWithMap,
  winningList: [number, number][] = [],
  winners: number[] = [],
): [number, number][] => {
  if (numbers.length === 0 || winners.length === grids.length) {
    return winningList;
  }

  const [n, ...rest] = numbers;

  const { positions, gridIndexes } = checkNumber(map, n)!;

  const newWinners: [number, number][] = [];
  const newWinnersIndexes = [];
  for (const gridIndex of gridIndexes) {
    const position = positions[gridIndex];

    if (
      gridWins(grids[gridIndex], position, map) && !winners.includes(gridIndex)
    ) {
      const sum = sumAllUnmarkedNumbers(grids[gridIndex], map);
      newWinners.push([sum, n]);
      newWinnersIndexes.push(gridIndex);
    }
  }

  return play({ numbers: rest, grids, map }, [...winningList, ...newWinners], [
    ...winners,
    ...newWinnersIndexes,
  ]);
};

const calculateScore = (
  [sumOfAllUnmarkedNumbers, n]: [number, number],
): number => sumOfAllUnmarkedNumbers * n;

const getGameResults = pipe(parseInput, buildGridMaps, play);

const gameResults: [number, number][] = getGameResults(input);

const getFirstWinner = (xs: [number, number][]) => xs[0];
const getLastWinner = (xs: [number, number][]) => xs[xs.length - 1];

const solve1: (gameResults: [number, number][]) => number = pipe(
  getFirstWinner,
  calculateScore,
  console.log,
);

const solve2: (gameResults: [number, number][]) => number = pipe(
  getLastWinner,
  calculateScore,
  console.log,
);

solve1(gameResults);
solve2(gameResults);
