import { generateRandomOffers } from './mockup.js';
import { markupOffers } from './popup.js';

const similarOffers = generateRandomOffers(3);
markupOffers(similarOffers);
