import { turnOfferFormOff, turnOfferFormOn, turnFilterFormOn, turnFilterFormOff, setOnOfferFormSubmit, onFormReset } from './form.js';
import { mapInit, setStartAddress, setOnMapLoad, setOfferPinMarker, resetMap, removeCommonPins } from './map.js';
import { getData, sendData } from './api.js';
import { showSuccessMessage, showErrorMessage, showAlertMessage } from './show-message.js';
import { getFilteredHousings } from './filter.js';

const offerFiltersForm = document.querySelector('.map__filters');

turnFilterFormOff();
turnOfferFormOff();
mapInit();

const onGetDataSuccess = (offers) => {
  setOfferPinMarker(getFilteredHousings(offers));
  turnFilterFormOn();
  offerFiltersForm.addEventListener('change', () => {
    removeCommonPins();
    setOfferPinMarker(getFilteredHousings(offers));
  });
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
