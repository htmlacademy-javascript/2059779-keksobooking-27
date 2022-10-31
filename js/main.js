import { generateRandomOffers } from './mockup.js';
import { markupOffers } from './popup.js';
import { turnFormOff, turnFormOn } from './form-switcher.js';

const similarOffers = generateRandomOffers(3);
markupOffers(similarOffers);

turnFormOff('.ad_form');
