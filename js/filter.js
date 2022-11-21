const OFFERS_COUNT = 10;

const Price = {
  MIDDLE: 10000,
  HIGH: 50000
};

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

const filterByGuests = (housing, guests) => guests === 'any' || housing.offer.guests === +guests;

const filterByFeatures = (housing, features) => {
  if (!features.length) {
    return true;
  }

  if (!housing.offer.features) {
    return false;
  }

  return features.every((feature) => housing.offer.features.includes(feature));
};

const getFilteredHousings = (housings) => {
  const selectedType = housingType.value;
  const selectedPrice = housingPrice.value;
  const selectedRooms = housingRooms.value;
  const selectedGuests = housingGuests.value;
  const selectedFeatures = [];
  const filteredHousings = [];

  housingFeatures.forEach((feature) => {
    if (feature.checked) {
      selectedFeatures.push(feature.value);
    }
  });

  for (const housing of housings) {
    if (filteredHousings.length >= OFFERS_COUNT) {
      break;
    }

    if (
      filterByType(housing, selectedType) &&
      filterByPrice(housing, selectedPrice) &&
      filterByRooms(housing, selectedRooms) &&
      filterByGuests(housing, selectedGuests) &&
      filterByFeatures(housing, selectedFeatures)
    ) {
      filteredHousings.push(housing);
    }
  }

  return filteredHousings;
};

const setOnFilterChange = (cb) => {
  offerFiltersForm.addEventListener('change', () => {
    cb();
  });
};

export { getFilteredHousings, setOnFilterChange };
