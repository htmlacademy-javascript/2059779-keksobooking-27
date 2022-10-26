import { generateRandomOffers } from './mockup.js';

const HOUSING_TYPES_TITLES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const mapCanvas = document.querySelector('#map-canvas'); /** Наверное потом этой переменной нужно будет задать имя popup и другой селектор */
const offerTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const similarOffers = generateRandomOffers(1);

similarOffers.forEach((housing) => {
  const offerELement = offerTemplate.cloneNode(true);
  offerELement.querySelector('.popup__title').textContent = housing.offer.title; /** Здесь как-то криво выходит с именами. В целом это предложение, но внутри него по ТЗ лежит объект offer.  */
  offerELement.querySelector('.popup__text--address').textContent = housing.offer.address;
  offerELement.querySelector('.popup__text--price').innerHTML = `${housing.offer.price} <span>₽/ночь</span>`;
  offerELement.querySelector('.popup__type').textContent = HOUSING_TYPES_TITLES[housing.offer.type];
  offerELement.querySelector('.popup__text--capacity').textContent = `${housing.offer.rooms} комнаты для ${housing.offer.guests} гостей`; /** Падежи едут с некоторыми числами. Делать ли здесь проверку числа, чтобы менять падеж или дальше всё равно всё будет с сервера приходить? */
  offerELement.querySelector('.popup__text--time').textContent = `Заезд после ${housing.offer.checkin}, выезд до ${housing.offer.checkout}`;

  const featuresList = offerELement.querySelector('.popup__features');
  const featuresItems = featuresList.querySelectorAll('.popup__feature');
  const housingFeatures = housing.offer.features; /** Что-то у меня не получается с синтаксисом, чтобы без этой переменной метод .some приделать. */
  featuresItems.forEach((item) => {
    const isInclude = housingFeatures.some(
      (feature) => item.classList.contains(`popup__feature--${feature}`),);
    if (!isInclude) {
      item.remove();
    }
  });

  offerELement.querySelector('.popup__description').textContent = housing.offer.description;

  const photosContainer = offerELement.querySelector('.popup__photos');
  const photoElement = photosContainer.querySelector('.popup__photo');
  photosContainer.innerHTML = '';
  const photosList = housing.offer.photos;
  photosList.forEach((photo) => {
    photoElement.src = photo;
    photosContainer.append(photoElement.cloneNode(true));
  });

  offerELement.querySelector('.popup__avatar').src = housing.author.avatar;

  mapCanvas.append(offerELement);
});
