const getDummyCoordinates = (min, max, points) => {
  if (points < 0) {
    points = points * -1;
  }
  if (points > 20) {
    points = 20;
  }
  if (min < 0 || max < 0) {
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

getDummyCoordinates(3, 4.5, 4);
