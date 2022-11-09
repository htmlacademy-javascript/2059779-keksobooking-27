const ROOMS_TO_GUESTS = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};
const GUESTS_TO_ROOMS = {
  0: ['100'],
  1: ['1', '2', '3'],
  2: ['2', '3'],
  3: ['3']
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

const onRoomNumberChange = () => {
  pristine.validate(capacityElement);
  pristine.validate(roomElement);
};

const onGuestsNumberChange = () => {
  pristine.validate(capacityElement);
  pristine.validate(roomElement);
};


const capacityCheck = () => ROOMS_TO_GUESTS[roomElementValue].includes(capacityElementValue);

pristine.addValidator(
  capacityElement,
  capacityCheck,
  'Для такого количества гостей нужно больше комнат'
);

const roomsCheck = () => GUESTS_TO_ROOMS[capacityElementValue].includes(roomElementValue);

pristine.addValidator(
  roomElement,
  roomsCheck,
  'Для такого количества гостей нужно больше комнат'
);

roomElement.addEventListener('change', onRoomNumberChange);
capacityElement.addEventListener('change', onGuestsNumberChange);

offerForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) { evt.preventDefault(); }
});
