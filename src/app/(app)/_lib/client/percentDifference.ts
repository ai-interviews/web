export const percentDifference = (n1: number, n2: number) => {
  const difference = n2 - n1;
  const isPositive = difference >= 0;

  const percent = (difference / n1) * 100;
  const delta = `${Math.abs(Math.round(percent))}%`;

  return { delta, isPositive };
};
