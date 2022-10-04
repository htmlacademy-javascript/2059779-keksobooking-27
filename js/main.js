const generateRandomInt = (min, max) => {
  if (min < 0 || max < 0 || min === max) {
    return NaN;
  }
  let swap;
  if (min > max) {
    swap = max;
    max = min;
    min = swap;
  }
  return Math.round((Math.random() * (max - min + 1) + min));
};

const generateRandomFloat = (min, max, points) => {
  if (points > 20) {
    points = 20;
  }
  if (min < 0 || max < 0 || points < 0 || min === max) {
    return NaN;
  }
  let swap;
  if (min > max) {
    swap = max;
    max = min;
    min = swap;
  }
  return +((Math.random() * (max - min + 1) + min)).toFixed(points);
};

generateRandomFloat(3, 4.5, 4);
generateRandomInt(2.5, 10);
