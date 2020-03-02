interface SurroundingValues {
  lower: any;
  upper: any;
  weight: number;
}

export const getSurroundingValues = (
  arr: any[],
  percentage: number
): SurroundingValues => {
  // I'm sure there's a more mathy way to do this...
  if (arr.length === 2)
    return { lower: arr[0], upper: arr[1], weight: percentage };

  const stepSize = 100 / (arr.length - 1);

  const lowerIndex = arr.findIndex((pos, i) => (i + 1) * stepSize > percentage);

  const percentageBetween =
    (percentage - stepSize * lowerIndex) * (arr.length - 1);

  return {
    lower: arr[lowerIndex],
    upper: arr[lowerIndex + 1],
    weight: percentageBetween
  };
};
