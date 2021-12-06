const BASE_URL = 'https://adventofcode.com/2021/day/';
const AOC_SESSION = Deno.env.get('AOC_SESSION');

if (!AOC_SESSION) {
  console.log('[!] AOC_SESSION env variable missing.');
  Deno.exit(-1);
}

export const getInput = async (dayNumber: number): Promise<string> => {
  const headers = new Headers({
    cookie: `session=${AOC_SESSION}`
  });
  const response = await fetch(`${BASE_URL}${dayNumber}/input`, { headers });
  return response.text();
}
