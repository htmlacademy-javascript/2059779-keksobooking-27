import { generateRandomOffers } from './mockup.js';
import { nounsDeclension } from './nouns-declension.js';
import { removeEmptyElements } from './remove-empty-elements.js';

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

similarOffers.forEach(({ author, offer }) => {
  const offerELement = offerTemplate.cloneNode(true);
  offerELement.querySelector('.popup__title').textContent = offer.title;
  offerELement.querySelector('.popup__text--address').textContent = offer.address;
  offerELement.querySelector('.popup__text--price').innerHTML = `${offer.price} <span>₽/ночь</span>`;
  offerELement.querySelector('.popup__type').textContent = HOUSING_TYPES_TITLES[offer.type];
  offerELement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${nounsDeclension(offer.rooms, ['комната', 'комнаты', 'комнат'])} для ${offer.guests} ${nounsDeclension(offer.guests, ['гостя', 'гостей', 'гостей'])}`;
  offerELement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const featuresList = offerELement.querySelector('.popup__features');
  const featuresItems = featuresList.querySelectorAll('.popup__feature');
  const housingFeatures = offer.features; /** Вспомнил, что можно сделать деструктуризацию объекта. Но не знаю, убирать ли переменную теперь. */
  featuresItems.forEach((item) => {
    const isInclude = housingFeatures.some(
      (feature) => item.classList.contains(`popup__feature--${feature}`),);
    if (!isInclude) {
      item.remove();
    }
  });

  offerELement.querySelector('.popup__description').textContent = offer.description;

  const photosContainer = offerELement.querySelector('.popup__photos');
  const photoElement = photosContainer.querySelector('.popup__photo');
  photosContainer.innerHTML = '';
  const photosList = offer.photos;
  photosList.forEach((photo) => {
    photoElement.src = photo;
    photosContainer.append(photoElement.cloneNode(true));
  });

  offerELement.querySelector('.popup__avatar').src = author.avatar;

  removeEmptyElements(offerELement);

  mapCanvas.append(offerELement);
});
