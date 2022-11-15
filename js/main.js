import { turnAdFormOff, turnAdFormOn, } from './form.js';
import { mapInit, setStartAddress, setOnMapLoad, setOfferPinMarker } from './map.js';
import { getData } from './api.js';

const OFFERS_COUNT = 10;

turnAdFormOff();
mapInit();

const onGetDataSuccess = (offers) => {
  setOfferPinMarker(offers.slice(0, OFFERS_COUNT));
};

setOnMapLoad(turnAdFormOn());
getData(onGetDataSuccess);
setStartAddress();
