const BASE_URL = 'https://adventofcode.com/2021/day/';

export const getInput = async (dayNumber: number): Promise<string> => {
  const AOC_SESSION = Deno.env.get('AOC_SESSION');

  if (!AOC_SESSION) {
    console.log('[!] AOC_SESSION env variable missing.');
    Deno.exit(-1);
  }

  const headers = new Headers({
    cookie: `session=${AOC_SESSION}`
  });
  const response = await fetch(`${BASE_URL}${dayNumber}/input`, { headers });
  return response.text();
}

export const getInputFromFile = async (filename: string): Promise<string> => {
  const file = await Deno.readFile(filename);
  const decoder = new TextDecoder('utf-8');
  return decoder.decode(file);
};
