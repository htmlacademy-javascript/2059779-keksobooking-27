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
  return +((Math.random() * (max - min + 1) + min)).toFixed(points);
};

const AVATAR_PATH = 'img/avatars/';
const HOUSING_TYPE = [
  palace,
  flat,
  house,
  bungalow,
  hotel
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
  wifi,
  dishwasher,
  parking,
  washer,
  elevator,
  conditioner
];

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

let location = {
  lat: 1,
  lng: 1
};



generateRandomPositiveFloat(3, 4.5, 4);
generateRandomPositiveInt(2.5, 10);
