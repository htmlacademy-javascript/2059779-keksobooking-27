import { turnOfferFormOff, turnOfferFormOn, turnFilterFormOn, turnFilterFormOff, setOnOfferFormSubmit, onFormReset } from './form.js';
import { mapInit, setStartAddress, setOnMapLoad, setOfferPinMarker, resetMap, resetCommonPins } from './map.js';
import { getData, sendData } from './api.js';
import { showSuccessMessage, showErrorMessage, showAlertMessage } from './show-message.js';
import { getFilteredHousings, setOnFilterChange } from './filter.js';
import { debounce } from './util.js';

const RERENDER_DELAY = 500;

turnFilterFormOff();
turnOfferFormOff();
mapInit();

const onGetDataSuccess = (offers) => {
  turnFilterFormOn();
  setOfferPinMarker(getFilteredHousings(offers));
  setOnFilterChange(debounce(
    () => resetCommonPins(getFilteredHousings(offers)),
    RERENDER_DELAY
  ));
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
