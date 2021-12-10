import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";

import { solve1, solve2 } from './solve.ts';

Deno.test({
  name: 'aoc example - part 1',
  fn: () => {
    const input = `16,1,2,0,4,2,7,1,2,14`;
    const result = 37;

    assertEquals(solve1(input), result);
  }
});

Deno.test({
  name: 'aoc example - part 2',
  fn: () => {
    const input = `16,1,2,0,4,2,7,1,2,14`;
    const result = 168;

    assertEquals(solve2(input), result);
  }
});