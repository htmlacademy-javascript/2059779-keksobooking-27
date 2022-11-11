import { generateRandomOffers } from './mockup.js';
import { markupOffers } from './popup.js';
import { turnFormOff, turnFormOn } from './form-switcher.js';
import './form.js';
import './map.js';

const similarOffers = generateRandomOffers(1);
const offer = similarOffers[0];
markupOffers(offer);

turnFormOff();
turnFormOn();
