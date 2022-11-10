const ROOMS_TO_GUESTS = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

const HOUSING_TYPE_PRICE = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000'
};

const offerForm = document.querySelector('.ad-form');

const capacityElement = offerForm.querySelector('#capacity');

const roomElement = offerForm.querySelector('#room_number');

const timeInElement = offerForm.querySelector('#timein');
const timeOutElement = offerForm.querySelector('#timeout');

const priceELement = offerForm.querySelector('#price');

const typeElement = offerForm.querySelector('#type');

const pristine = new Pristine(offerForm,
  {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    errorTextParent: 'ad-form__element',
    errorTextTag: 'span',
    errorTextClass: 'text-help',
  },
  true
);

const capacityCheck = () => ROOMS_TO_GUESTS[roomElement.value].includes(capacityElement.value);

const onRoomNumberChange = () => {
  pristine.validate(capacityElement);
  pristine.validate(roomElement);
};

const onGuestsNumberChange = () => {
  pristine.validate(capacityElement);
  pristine.validate(roomElement);
};

pristine.addValidator(
  capacityElement,
  capacityCheck,
  'Для такого количества гостей нужно больше комнат'
);

pristine.addValidator(
  roomElement,
  capacityCheck,
  'Для такого количества гостей нужно больше комнат'
);

const onTimeInChange = function () {
  timeOutElement.value = timeInElement.value;
};

const onTimeOutChange = function () {
  timeInElement.value = timeOutElement.value;
};

timeInElement.addEventListener('change', onTimeInChange);
timeOutElement.addEventListener('change', onTimeOutChange);

roomElement.addEventListener('change', onRoomNumberChange);
capacityElement.addEventListener('change', onGuestsNumberChange);

const priceCheck = () => priceELement.value <= HOUSING_TYPE_PRICE[typeElement.value];

pristine.addValidator(
  priceELement,
  priceCheck,
  'Стоимость должна быть выше'
);

const onTypeElementChange = function () {
  priceELement.placeholder = HOUSING_TYPE_PRICE[typeElement.value];
};

typeElement.addEventListener('change', onTypeElementChange);

offerForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) { evt.preventDefault(); }
});
