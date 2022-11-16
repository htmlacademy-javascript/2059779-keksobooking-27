const generateRandomPositiveInt = (min, max) => {
  if (min < 0 || max < 0 || min === max) {
    return NaN;
  }
  const lower = Math.floor(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  return Math.floor((Math.random() * (upper - lower + 1) + lower));
};

const generateRandomPositiveFloat = (min, max, points) => {
  if (points > 20) {
    points = 20;
  }
  if (min < 0 || max < 0 || points < 0 || min === max) {
    return NaN;
  }
  if (min > max) {
    const swap = max;
    max = min;
    min = swap;
  }
  return +((Math.random() * (max - min) + min)).toFixed(points);
};

const generateRandomArrayIndex = (Array) => Math.floor(Math.random() * Array.length);

export { generateRandomPositiveInt, generateRandomPositiveFloat, generateRandomArrayIndex };
