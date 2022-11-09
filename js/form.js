const ROOMS_TO_GUESTS = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

const offerForm = document.querySelector('.ad-form');
const capacityElement = offerForm.querySelector('#capacity');
const roomElement = offerForm.querySelector('#room_number');
const roomElementValue = roomElement.value;
const capacityElementValue = capacityElement.value;

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

const capacityCheck = () => ROOMS_TO_GUESTS[roomElementValue].includes(capacityElementValue);

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

roomElement.addEventListener('change', onRoomNumberChange);
capacityElement.addEventListener('change', onGuestsNumberChange);

offerForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) { evt.preventDefault(); }
});
