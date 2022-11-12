import { createOfferElement } from './popup.js';

const START_COORDINATES = {
  startLat: 35.683171,
  startLng: 139.753143
};
const START_ZOOM = 12;

const map = L.map('map-canvas');
const addressElement = document.querySelector('#address');

const setMap = () => {
  map.setView({
    lat: START_COORDINATES.startLat,
    lng: START_COORDINATES.startLng
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
    lat: START_COORDINATES.startLat,
    lng: START_COORDINATES.startLng
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const commonPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const setMainPinMarker = () => mainPinMarker.addTo(map);

const setStartAddress = () => {
  const { lat, lng } = mainPinMarker.getLatLng();
  addressElement.value = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
};

const setAddressOnPinMove = () => {
  mainPinMarker.on('move', (evt) => {
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
    offerMarker.addTo(map).bindPopup(createOfferElement);
  });
};

const setOnMapLoad = (cb) => map.on('load', cb);

export { setMap, setMainPinMarker, setStartAddress, setAddressOnPinMove, setOnMapLoad, setOfferPinMarker };
