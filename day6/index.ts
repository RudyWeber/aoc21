import { getInputFromFile } from '../utils/aoc.ts';
import { solve1, solve2 } from './solve.ts';

const input = await getInputFromFile("./input");

console.log(solve1(input));
console.log(solve2(input));
