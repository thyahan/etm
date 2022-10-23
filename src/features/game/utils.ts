export type Item = {
  index: number;
  value: number;
  active: boolean;
};

const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomAddition = (level: number) => {
  const from = level == 1 ? 2 : 3;
  const to = level == 1 ? 19 : 49;
  const a = randomIntFromInterval(from, to);
  const b = randomIntFromInterval(from, to);

  const data = [a, b, a + b];
  console.log(data);

  return data;
};

const randomMultiplication = (level: number) => {
  const from = level == 1 ? 2 : 3;
  const to = level == 1 ? 9 : 12;
  const a = randomIntFromInterval(from, to);
  const b = randomIntFromInterval(from, to);

  const data = [a, b, a * b];
  console.log(data);

  return data;
};

export const generateItems = (level: number): Item[] => {
  const operator = [0, 1, 2].map(() => {
    return randomIntFromInterval(0, 3);
  });

  console.log({ operator });

  let resp: number[] = [];

  operator.forEach((op) => {
    if (op === 0 || op === 1) resp = [...resp, ...randomAddition(level)];
    if (op === 2 || op === 3) resp = [...resp, ...randomMultiplication(level)];
  });

  return resp
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }, index) => {
      const it: Item = {
        index,
        value,
        active: true,
      };

      return it;
    });
};
