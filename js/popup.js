import { declineNoun } from './decline-noun.js';

const housingTypesTitles = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const offerTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const createOfferElement = (offersData) => {
  const { author, offer } = offersData;

  const offerELement = offerTemplate.cloneNode(true);
  offerELement.querySelector('.popup__title').textContent = offer.title;
  offerELement.querySelector('.popup__text--address').textContent = offer.address;
  offerELement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  offerELement.querySelector('.popup__type').textContent = housingTypesTitles[offer.type];
  offerELement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${declineNoun(offer.rooms, ['комната', 'комнаты', 'комнат'])} для ${offer.guests} ${declineNoun(offer.guests, ['гостя', 'гостей', 'гостей'])}`;
  offerELement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const featuresList = offerELement.querySelector('.popup__features');
  const featuresListItem = featuresList.querySelector('.popup__feature');
  featuresList.innerHTML = '';
  featuresListItem.classList.remove(featuresListItem[1]);
  if (offer.features && offer.features.length) {
    const baseClass = featuresListItem.classList[0];
    const modificatorClass = `${baseClass}--`;
    offer.features.forEach((item) => {
      featuresListItem.classList.add(`${modificatorClass}${item}`);
      featuresList.append(featuresListItem.cloneNode(false));
    });
  } else {
    featuresList.remove();
  }

  if (offer.description && offer.description.length) {
    offerELement.querySelector('.popup__description').textContent = offer.description;
  } else {
    offerELement.querySelector('.popup__description').remove();
  }

  const photosContainer = offerELement.querySelector('.popup__photos');
  const photoElement = photosContainer.querySelector('.popup__photo');
  photosContainer.innerHTML = '';
  if (offer.photos && offer.photos.length) {
    offer.photos.forEach((photo) => {
      photoElement.src = photo;
      photosContainer.append(photoElement.cloneNode(false));
    });
  } else {
    photosContainer.remove();
  }

  if (author.avatar && author.avatar.length) {
    offerELement.querySelector('.popup__avatar').src = author.avatar;
  } else {
    offerELement.querySelector('.popup__avatar').remove();
  }
  return offerELement;
};
export { createOfferElement };
