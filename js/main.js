import { generateRandomOffers } from './mockup.js';
import { turnAdFormOff, turnAdFormOn, } from './form.js';
import { mapInit, setStartAddress, setOnMapLoad, } from './map.js';

const OFFERS_COUNT = 10;

const similarOffers = generateRandomOffers(OFFERS_COUNT);

turnAdFormOff();
mapInit(similarOffers);
setOnMapLoad(turnAdFormOn());
setStartAddress();
