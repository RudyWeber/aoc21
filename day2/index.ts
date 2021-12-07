import { getInputFromFile } from '../utils/aoc.ts';
import { pipe } from '../utils/fp.ts';

type command = 'forward' | 'up' | 'down';

const input = await getInputFromFile('./input');

const parseInput = (input: string): [cmd: command, n: number][] =>
  input.split('\n').filter(Boolean).map(entry => {
    const splitEntry = entry.split(' ');
    return [splitEntry[0] as command, +splitEntry[1]];
  })

const calculatePosition = (xs: [cmd: command, n:number][]): {horizontal: number, depth: number} =>
  xs.reduce<{horizontal: number, depth: number}>(({ horizontal, depth }, [cmd, n]) => {
    switch (cmd) {
      case 'forward':
        return { horizontal: horizontal + n, depth };
      case 'down':
        return { horizontal, depth: depth + n };
      case 'up':
        return { horizontal, depth: depth - n };
    }
  }, { horizontal: 0, depth: 0 });

const calculatePositionWithAim = (xs: [cmd: command, n:number][]): {horizontal: number, depth: number, aim: number} =>
  xs.reduce<{horizontal: number, depth: number, aim: number }>(({ horizontal, depth, aim }, [cmd, n]) => {
    switch (cmd) {
      case 'forward':
        return { horizontal: horizontal + n, depth: depth + aim * n, aim };
      case 'down':
        return { horizontal, depth, aim: aim + n };
      case 'up':
        return { horizontal, depth, aim: aim - n };
    }
  }, { horizontal: 0, depth: 0, aim: 0 });

const calculateScore = ({ horizontal, depth }: { horizontal: number, depth: number }): number => horizontal * depth;

const solve1: (input: string) => number = 
  pipe(
    parseInput,
    calculatePosition,
    calculateScore
  );

const solve2: (input: string) => number =
  pipe(
    parseInput,
    calculatePositionWithAim,
    calculateScore,
  );

const result1 = solve1(input);
const result2 = solve2(input);

console.log(result1);
console.log(result2);