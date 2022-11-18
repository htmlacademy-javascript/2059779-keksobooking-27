import { turnOfferFormOff, turnOfferFormOn, turnFilterFormOn, turnFilterFormOff, setOnOfferFormSubmit, setOnFormReset, setOnResetButton } from './form.js';
import { mapInit, setStartAddress, setOnMapLoad, setOfferPinMarker, resetMap, resetCommonPins } from './map.js';
import { getData, sendData } from './api.js';
import { showSuccessMessage, showErrorMessage, showAlertMessage } from './show-message.js';
import { getFilteredHousings, setOnFilterChange } from './filter.js';
import { debounce } from './util.js';

const RERENDER_DELAY = 500;

turnFilterFormOff();
turnOfferFormOff();
mapInit();

const onGetDataSuccess = (offers) => { //Здесь какая-то мешанина получилась. Но хотя бы работает. Не знаю, как сделать это изящнее и понятнее.
  turnFilterFormOn();
  setOfferPinMarker(getFilteredHousings(offers));
  setOnFilterChange(debounce(
    () => resetCommonPins(getFilteredHousings(offers)),
    RERENDER_DELAY
  ));
  setOnResetButton(getFilteredHousings(offers));
};

const onSendDataSuccess = () => {
  showSuccessMessage();
  resetMap();
  setOnFormReset();
  setStartAddress();
};

setOnOfferFormSubmit(async (data) => {
  await sendData(onSendDataSuccess, showErrorMessage, data);
});


setOnMapLoad(turnOfferFormOn);
getData(onGetDataSuccess, showAlertMessage);
setStartAddress();
