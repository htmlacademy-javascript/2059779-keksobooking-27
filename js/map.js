import { createOfferElement } from './popup.js';

const START_COORDINATE = {
  lat: 35.683171,
  lng: 139.753143
};
const START_ZOOM = 13;

const map = L.map('map-canvas');
const addressElement = document.querySelector('#address');
addressElement.readOnly = true;

const setMap = () => {
  map.setView({
    lat: START_COORDINATE.lat,
    lng: START_COORDINATE.lng
  }, START_ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: START_COORDINATE.lat,
    lng: START_COORDINATE.lng
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const commonPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const commonPinsGroup = L.layerGroup().addTo(map);

const setMainPinMarker = () => mainPinMarker.addTo(map);

const setStartAddress = () => {
  addressElement.value = `${START_COORDINATE.lat}, ${START_COORDINATE.lng}`;
};

const setAddressOnPinMove = () => {
  mainPinMarker.on('moveend', (evt) => {
    const { lat, lng } = evt.target.getLatLng();
    addressElement.value = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  });
};

const setOfferPinMarker = (offers) => {
  offers.forEach((offer) => {
    const offerMarker = L.marker(
      {
        lat: offer.location.lat,
        lng: offer.location.lng
      },
      {
        icon: commonPinIcon
      }
    );
    offerMarker
      .addTo(commonPinsGroup)
      .bindPopup(createOfferElement(offer));
  });
};

const setOnMapLoad = (cb) => map.on('load', cb());

const mapInit = () => {
  setMap();
  setMainPinMarker();
  setAddressOnPinMove();
};

const resetMap = () => {
  map.closePopup();
  map.setView({
    lat: START_COORDINATE.lat,
    lng: START_COORDINATE.lng
  }, START_ZOOM);
  mainPinMarker.setLatLng({
    lat: START_COORDINATE.lat,
    lng: START_COORDINATE.lng
  });
};

const removeCommonPins = () => commonPinsGroup.clearLayers();

export { mapInit, setStartAddress, setOnMapLoad, setMainPinMarker, setOfferPinMarker, resetMap, removeCommonPins };
