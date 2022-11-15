import { generateRandomOffers } from './mockup.js';
import { turnFormOff, turnFormOn } from './form-switcher.js';
import './form.js';
import { setMap, setMainPinMarker, setStartAddress, setAddressOnPinMove, setOnMapLoad, setOfferPinMarker } from './map.js';

turnFormOff();
setMap();
setOnMapLoad(turnFormOn());
setMainPinMarker();
setStartAddress();
setAddressOnPinMove();

const similarOffers = generateRandomOffers(10);

setOfferPinMarker(similarOffers);


