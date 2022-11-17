import { turnOfferFormOff, turnOfferFormOn, turnFilterFormOn, turnFilterFormOff, setOnOfferFormSubmit, onFormReset } from './form.js';
import { mapInit, setStartAddress, setOnMapLoad, setOfferPinMarker, resetMap } from './map.js';
import { getData, sendData } from './api.js';
import { showSuccessMessage, showErrorMessage, showAlertMessage } from './show-message.js';
import { compareOffers, setFeatureChange, setOnFilterChange } from './filter.js';

const OFFERS_COUNT = 10;

turnFilterFormOff();
turnOfferFormOff();
mapInit();

const onGetDataSuccess = (offers) => {
  const rankedOffers = offers.slice().sort(compareOffers).slice(0, OFFERS_COUNT);
  const filteredOffers = setOnFilterChange(rankedOffers);
  setOfferPinMarker(filteredOffers);
  setFeatureChange(() => setOfferPinMarker(filteredOffers));
  turnFilterFormOn();
};

const onSendDataSuccess = () => {
  showSuccessMessage();
  resetMap();
  onFormReset();
  setStartAddress();
};

setOnOfferFormSubmit(async (data) => {
  await sendData(onSendDataSuccess, showErrorMessage, data);
});

setOnMapLoad(turnOfferFormOn);
getData(onGetDataSuccess, showAlertMessage);
setStartAddress();
