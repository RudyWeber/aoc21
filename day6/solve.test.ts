import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";

import { solve1, solve2 } from './solve.ts';

Deno.test({
  name: 'aoc example - part 1',
  fn: () => {
    const input = `3,4,3,1,2`;
    const result = 5934;

    assertEquals(solve1(input), result);
  }
});

Deno.test({
  name: 'aoc example - part 2',
  fn: () => {
    const input = `3,4,3,1,2`;
    const result = 26984457539;

    assertEquals(solve2(input), result);
  }
});