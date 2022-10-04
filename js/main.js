const generateRandomInt = (min, max) => {
  if (min < 0 || max < 0 || min === max) {
    return NaN;
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.round((Math.random() * (max - min + 1) + min));
};

const generateDummyCoordinates = (min, max, points) => {
  if (points > 20) {
    points = 20;
  }
  if (min < 0 || max < 0 || points < 0 || min === max) {
    return NaN;
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  return +((Math.random() * (max - min + 1) + min)).toFixed(points);
};

generateDummyCoordinates(3, 4.5, 4);
generateRandomInt(2.5, 10);
