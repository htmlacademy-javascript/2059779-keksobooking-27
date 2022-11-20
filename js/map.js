import { createOfferElement } from './popup.js';

const START_ZOOM = 13;

const StartCoordinate = { //Я не уверен в правилах именования. Это может быть константой? Или это перечисление?
  LAT: 35.683171,
  LNG: 139.753143
};

const map = L.map('map-canvas');
const addressElement = document.querySelector('#address');
addressElement.readOnly = true;

const setMap = () => {
  map.setView({
    lat: StartCoordinate.LAT,
    lng: StartCoordinate.LNG
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
    lat: StartCoordinate.LAT,
    lng: StartCoordinate.LNG
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
  addressElement.value = `${StartCoordinate.lat}, ${StartCoordinate.LNG}`;
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
    lat: StartCoordinate.LAT,
    lng: StartCoordinate.LNG
  }, START_ZOOM);
  mainPinMarker.setLatLng({
    lat: StartCoordinate.LAT,
    lng: StartCoordinate.LNG
  });
};

const resetCommonPins = (offers) => {
  commonPinsGroup.clearLayers();
  setOfferPinMarker(offers);
};

export { mapInit, setStartAddress, setOnMapLoad, setOfferPinMarker, resetMap, resetCommonPins };
