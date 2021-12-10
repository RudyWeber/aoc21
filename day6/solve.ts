import { pipe } from "../utils/fp.ts";

type timer = number;
type timers = timer[];
type timerCounts = number[];

const makeInitialTimerCounts = () => Array.from({ length: 9 }, (_) => 0);

const parseInput = (input: string): timers => input.split(",").map(Number);

const getTimersCount = (timers: timers): timerCounts =>
  timers.reduce<timers>(
    (acc, timer) => (acc[timer]++, acc),
    makeInitialTimerCounts(),
  );

const getNextDay = (timerCounts: timerCounts): timerCounts => {
  const numberOfNewBorns = timerCounts[0];

  return timerCounts.map((_, timer) => {
    if (timer === 6) {
      return timerCounts[timer + 1] + numberOfNewBorns;
    }

    if (timer === 8) {
      return numberOfNewBorns;
    }

    return timerCounts[timer + 1];
  });
};

const getNthDay = (n: number) =>
  (timerCounts: timerCounts): timerCounts => {
    const aux = (timerCounts: timerCounts, n: number): timerCounts =>
      !n ? timerCounts : aux(getNextDay(timerCounts), n - 1);

    return aux(timerCounts, n);
  };

const sum = (a: number, b: number): number => a + b;
const getNumberOfTimers = (timerCounts: timerCounts): number =>
  timerCounts.reduce(sum);

export const solve1 = pipe(
  parseInput,
  getTimersCount,
  getNthDay(80),
  getNumberOfTimers,
);

export const solve2 = pipe(
  parseInput,
  getTimersCount,
  getNthDay(256),
  getNumberOfTimers,
);
