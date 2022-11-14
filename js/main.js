import { generateRandomOffers } from './mockup.js';
import { turnAdFormOff, turnAdFormOn } from './form-switcher.js';
import './form.js';
import { setMap, setMainPinMarker, setStartAddress, setAddressOnPinMove, setOnMapLoad, setOfferPinMarker } from './map.js';

turnAdFormOff();
setMap();
setOnMapLoad(turnAdFormOn());
setMainPinMarker();
setStartAddress();
setAddressOnPinMove();

const similarOffers = generateRandomOffers(10);

setOfferPinMarker(similarOffers);


