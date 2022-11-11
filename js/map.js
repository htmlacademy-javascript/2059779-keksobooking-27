const map = L.map('map-canvas')
  .setView({
    lat: 35.683171,
    lng: 139.753143
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.683171,
    lng: 139.753143
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

const addressElement = document.querySelector('#address');
addressElement.value = mainPinMarker.getLatLng();

mainPinMarker.on('move', (evt) => {
  addressElement.value = evt.target.getLatLng(); // Не понятно. Метод мне возвращает координаты зачем-то с припиской LatLng перед числами.
});
