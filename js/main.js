const generateRandomPositiveInt = (min, max) => {
  if (min < 0 || max < 0 || min === max) {
    return NaN;
  }
  if (min > max) {
    const swap = max;
    max = min;
    min = swap;
  }
  return Math.round((Math.random() * (max - min + 1) + min));
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

const AVATAR_PATH = 'img/avatars/';
const HOUSING_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const CHECKIN_HOURS = {
  early: '12:00',
  standard: '13:00',
  late: '14:00'
};

const CHECKOUT_HOURS = {
  early: '12:00',
  standard: '13:00',
  late: '14:00'
};

const HOUSING_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const LOCATION_LATITUDE_RANGE = {
  start: 35.65000,
  end: 35.70000
};

const LOCATION_LONGITUDE_RANGE = {
  start: 139.70000,
  end: 139.80000
};

const LOCATION_PRECISION = 5;

const ADS_COUNT = 10;

let author = {
  avatar: 'img/avatars/user01.png'
};

let offer = {
  title: '',
  address: '',
  price: '',
  type: '',
  rooms: 1,
  guests: 1,
  checkin: '',
  checkout: '',
  features: '',
  description: '',
  photos: ''
};


const setLocation = () => {
  return {
    lat: generateRandomPositiveFloat(LOCATION_LATITUDE_RANGE.start, LOCATION_LATITUDE_RANGE.end, LOCATION_PRECISION),
    lng: generateRandomPositiveFloat(LOCATION_LONGITUDE_RANGE.start, LOCATION_LONGITUDE_RANGE.end, LOCATION_PRECISION)
  };
};

const similarLocations = Array.from({length: ADS_COUNT}, setLocation);

generateRandomPositiveFloat(3, 4.5, 4);
generateRandomPositiveInt(2.5, 10);
console.log(similarLocations);
