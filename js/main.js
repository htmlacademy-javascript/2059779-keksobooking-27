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

const generateRandomArrayIndex = (Array) => Math.floor(Math.random() * Array.length);

/*  В каком порядке лучше перечислять в файле функции и константы? Сначала константы, а потом функции или наоборот? */

const AVATAR_PATH = 'img/avatars/';

const TITLE_LEADINGS = [
  'Отличный',
  'Большой',
  'Грязный',
  'Бюджетный',
  'Стильный',
  'Викторианский',
  'Готический',
  'Кирпичный',
  'Светлый',
  'Проклятый старый'
];

const TITLE_ITEMS = [
  'замок',
  'дворец',
  'пентхаус',
  'дом для харакири',
  'уголок',
  'притон',
  'дом'
];

const TITLE_ENDINGS = [
  'в центре Токио.',
  'рядом с парком.',
  'вашей мечты.',
  'по небольшой цене.',
  'недалеко от лепрозория.',
  'только для лиц азиатской национальности.'
];

const PRICE_MAX = 10000000;

const HOUSING_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const ROOMS_MAX = 12;

const GUESTS_MAX = 3; /* Больше 3-х не собираться! */

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

const HOUSING_DESCRIPTIONS = [
  'Уютное просторное и светлое помещение с современной бытовой техникой и стильными аксессуарами. Подойдёт для двух состоятельных людей, которые любят роскошь и ненавидят детей.',
  'Евроремонт, евродвушка, евроокна, евродвери. К оплате только евро.',
  'Дорогая мебель чехословакского производства, в отделке использованы лучшие экскрементальные материалы, отличные тихие соседи живут в соседнем районе.',
  'Лучшего места для ритуального самоубийства не найти! Комплиментами гостям являются подарочный набор ножей для харакири, книга «Придумываем хайку за 30 секунд», удобное белое кимоно и корзинка для головы. Группам скидки. ПРЕДОПЛАТА!',
  'Уникальное предложение на рынке! Дом с самым настоящим приведением! Нашего Каспера зовут дядя Стёпа. Жертва трагической любви к алкоголесодержащим напиткам. Ждите проказ от нашего домового в виде шатания мебели, сдачи в ломбард техники и невыключенной газовой плиты.',
  'Любите шумную музыку? Вечеринки на всю ночь? Ваше хобби изготовление скульптур из железобетона при помощи перфоратора? У вашей жены от вашего хобби случается бурный оргазм? У вас есть коллекция шаров для боулинга, которой вы любите хвастать перед друзьями? Тогда эта квартира для вас! '
];

const HOUSING_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

/* С одной стороны для локации наверное можно и один объект завести, но на мой взгляд два разных лучше читаются.  */
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

const generateRandomAuthor = () => ({
  avatar: `${AVATAR_PATH} ${generateRandomPositiveInt(1, ADS_COUNT).toString().padStart(2, 0)}.png`
});

const generateRandomHousing = () => ({
  /* Не могу определиться, что в данном случае лучше использовать: функцию с двумя аргументами, которая уже есть, новую функцию с одним аргументом или просто формулу. Вроде бы читается лучше новая функция. Из названия понятно, что делает. А есть ли способ написать функцию так, чтобы она брала аргумент из названия массива сама? */
  title: `${TITLE_LEADINGS[generateRandomPositiveInt(0, TITLE_LEADINGS.length - 1)]} ${TITLE_ITEMS[generateRandomArrayIndex(TITLE_ITEMS)]} ${TITLE_ENDINGS[Math.floor(Math.random() * TITLE_ENDINGS.length)]}`,
  address: `${generateRandomPositiveFloat(LOCATION_LATITUDE_RANGE.start, LOCATION_LATITUDE_RANGE.end, LOCATION_PRECISION)} ${generateRandomPositiveFloat(LOCATION_LONGITUDE_RANGE.start, LOCATION_LONGITUDE_RANGE.end, LOCATION_PRECISION)}`,
  price: generateRandomPositiveInt(1, PRICE_MAX),
  type: HOUSING_TYPES[generateRandomArrayIndex(HOUSING_TYPES)],
  rooms: generateRandomPositiveInt(1, ROOMS_MAX),
  guests: generateRandomPositiveInt(1, GUESTS_MAX),
  checkin: Object.values(CHECKIN_HOURS)[generateRandomArrayIndex(Object.values(CHECKIN_HOURS))], /* Как-то сложно читается. Не знаю, как проще. */
  checkout: Object.values(CHECKOUT_HOURS)[generateRandomArrayIndex(Object.values(CHECKOUT_HOURS))],
  features: HOUSING_FEATURES.slice(0, generateRandomPositiveInt(1, HOUSING_FEATURES.length)),
  description: HOUSING_DESCRIPTIONS[generateRandomArrayIndex(HOUSING_DESCRIPTIONS)],
  photos: HOUSING_PHOTOS.slice(0, generateRandomPositiveInt(1, HOUSING_PHOTOS.length)),
});

const generateRandomLocation = () => ({
  lat: generateRandomPositiveFloat(LOCATION_LATITUDE_RANGE.start, LOCATION_LATITUDE_RANGE.end, LOCATION_PRECISION),
  lng: generateRandomPositiveFloat(LOCATION_LONGITUDE_RANGE.start, LOCATION_LONGITUDE_RANGE.end, LOCATION_PRECISION)
});

const generateRandomOffer = () => ({
  author: generateRandomAuthor(),
  offer: generateRandomHousing(),
  location: generateRandomLocation()
});

const generateRandomOffers = () => Array.from({ length: ADS_COUNT }, generateRandomOffer);

generateRandomOffers();
