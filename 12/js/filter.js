const Price = {
  MIDDLE: 10000,
  HIGH: 50000
};

const OFFERS_COUNT = 10;


const offerFiltersForm = document.querySelector('.map__filters');

const housingType = offerFiltersForm.querySelector('#housing-type');
const housingPrice = offerFiltersForm.querySelector('#housing-price');
const housingRooms = offerFiltersForm.querySelector('#housing-rooms');
const housingGuests = offerFiltersForm.querySelector('#housing-guests');

const housingFeatures = offerFiltersForm.querySelectorAll('.map__checkbox');

const filterByType = (housing, type) => type === 'any' || housing.offer.type === type;
const filterByPrice = (housing, price) => {
  switch (price) {
    case 'any':
      return true;
    case 'low':
      return housing.offer.price < Price.MIDDLE;
    case 'middle':
      return housing.offer.price >= Price.MIDDLE && housing.offer.price <= Price.HIGH;
    case 'high':
      return housing.offer.price > Price.HIGH;
  }
};

const filterByRooms = (housing, rooms) => rooms === 'any' || housing.offer.rooms === +rooms;

const filterByGuests = (housing, guests) => guests === 'any' || housing.offer.rooms === +guests;

const getFilteredHousings = (housings) => {
  const selectedType = housingType.value;
  const selectedPrice = housingPrice.value;
  const selectedRooms = housingRooms.value;
  const selectedGuests = housingGuests.value;
  const filteredHousings = [];

  for (const housing of housings) {
    if (filteredHousings.length >= OFFERS_COUNT) {
      break;
    }

    if (
      filterByType(housing, selectedType) &&
      filterByPrice(housing, selectedPrice) &&
      filterByRooms(housing, selectedRooms) &&
      filterByGuests(housing, selectedGuests)
    ) {
      filteredHousings.push(housing);
    }
  }

  return filteredHousings;
};

const setOnFilterChange = (housings) => {
  offerFiltersForm.addEventListener('change', (evt) => {
    if (evt.target.nodeName === 'SELECT') {
      getFilteredHousings(housings);
    }
  });
};


const getOfferRank = (offer) => {
  let rank = 0;

  for (let i = 0; i < housingFeatures.length; i++) {
    if (housingFeatures[i].checked && offer.features.includes(housingFeatures[i].value)) { //Тут два раза обходы массивов, но я не знаю, как сделать по-другому.
      rank += 1;
    }
  }
  return rank;
};

const compareOffers = (offerA, offerB) => {
  const rankA = getOfferRank(offerA);
  const rankB = getOfferRank(offerB);

  return rankB - rankA;
};

const setFeatureChange = (cb) => {
  offerFiltersForm.addEventListener('change', (evt) => {
    if (evt.target.className === 'map__checkbox') {
      cb();
    }
  });
};

export { compareOffers, setFeatureChange, setOnFilterChange };
