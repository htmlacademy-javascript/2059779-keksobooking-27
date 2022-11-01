import { generateRandomOffers } from './mockup.js';
import { markupOffers } from './popup.js';
import { turnFormOff, turnFormOn } from './form-switcher.js';

const similarOffers = generateRandomOffers(1);
const offer = similarOffers[0];
markupOffers(offer);

turnFormOff('.ad_form');
