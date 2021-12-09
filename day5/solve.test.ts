import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";

import { solve1, solve2 } from './solve.ts';

Deno.test({
  name: 'aoc example - part 1',
  fn: () => {
    const input = `0,9 -> 5,9
    8,0 -> 0,8
    9,4 -> 3,4
    2,2 -> 2,1
    7,0 -> 7,4
    6,4 -> 2,0
    0,9 -> 2,9
    3,4 -> 1,4
    0,0 -> 8,8
    5,5 -> 8,2`;
    const result = 5;

    assertEquals(solve1(input), result);
  }
});

Deno.test({
  name: 'aoc example - part 2',
  fn: () => {
    const input = `0,9 -> 5,9
    8,0 -> 0,8
    9,4 -> 3,4
    2,2 -> 2,1
    7,0 -> 7,4
    6,4 -> 2,0
    0,9 -> 2,9
    3,4 -> 1,4
    0,0 -> 8,8
    5,5 -> 8,2`;
    const result = 12;

    assertEquals(solve2(input), result);
  }
});