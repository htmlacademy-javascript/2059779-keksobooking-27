import { setStartAddress, resetMap } from './map.js'; //Утянул сюда. Иначе в main придётся по идее закидывать стартовые координаты. А должны ли они там быть?

const ROOMS_TO_GUESTS = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

const GUESTS_TO_ROOMS = {
  1: ['1', '2', '3 комнаты'],
  2: ['1', '2 комнаты'],
  3: ['3 комнаты'],
  0: ['100 комнат']
};

const MAX_PRICE = 100000;

const HOUSING_TYPE_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

const filterForm = document.querySelector('.map__filters');
const filterFormFieldsets = filterForm.querySelectorAll('fieldset');
const offerForm = document.querySelector('.ad-form');
const offerFormFieldsets = offerForm.querySelectorAll('fieldset');
const formSubmitButton = offerForm.querySelector('.ad-form__submit');
const formResetButton = offerForm.querySelector('.ad-form__reset');
const capacityElement = offerForm.querySelector('#capacity');
const roomElement = offerForm.querySelector('#room_number');
const timeInElement = offerForm.querySelector('#timein');
const timeOutElement = offerForm.querySelector('#timeout');
const priceElement = offerForm.querySelector('#price');
const priceSliderElement = offerForm.querySelector('.ad-form__slider');
const typeElement = offerForm.querySelector('#type');
priceElement.placeholder = HOUSING_TYPE_PRICE[typeElement.value];

//Переключение состояния формы
const turnOfferFormOff = () => {
  offerFormFieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });
  offerForm.classList.add(`${offerForm.classList[0]}--disabled`);
};

const turnOfferFormOn = () => {
  offerFormFieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
  offerForm.classList.remove(`${offerForm.classList[0]}--disabled`);
};

//Переключение состояния фильтров
const turnFilterFormOff = () => {
  filterFormFieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });
  filterForm.classList.add(`${filterForm.classList[0]}--disabled`);
};

const turnFilterFormOn = () => {
  filterFormFieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
  filterForm.classList.remove(`${filterForm.classList[0]}--disabled`);
};

//Валидация
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

// Проверка количества комнат и количества гостей
const capacityCheck = () => ROOMS_TO_GUESTS[roomElement.value].includes(capacityElement.value);

const getСapacityElementErrorMessage = () => `Для такого количества гостей подойдёт ${GUESTS_TO_ROOMS[capacityElement.value].join(' или ')}`;

pristine.addValidator(
  capacityElement,
  capacityCheck,
  getСapacityElementErrorMessage
);

const getRoomElementErrorMessage = () => {
  if (roomElement.value === '100') {
    return 'Комнаты не для гостей';
  }
  return 'Для такого количества гостей нужно больше комнат';
};

pristine.addValidator(
  roomElement,
  capacityCheck,
  getRoomElementErrorMessage
);

const onRoomNumberChange = () => {
  pristine.validate(capacityElement);
  pristine.validate(roomElement);
};

const onGuestsNumberChange = () => {
  pristine.validate(capacityElement);
  pristine.validate(roomElement);
};

roomElement.addEventListener('change', onRoomNumberChange);
capacityElement.addEventListener('change', onGuestsNumberChange);

// Изменение времени заселения и выселения
const onTimeInChange = () => {
  timeOutElement.value = timeInElement.value;
};

const onTimeOutChange = () => {
  timeInElement.value = timeOutElement.value;
};

timeInElement.addEventListener('change', onTimeInChange);
timeOutElement.addEventListener('change', onTimeOutChange);

// Проверка цены в зависимости от выбранного типа жилья
const priceCheck = (value) => Number.parseInt(value, 10) >= HOUSING_TYPE_PRICE[typeElement.value];

const getPriceErrorMessage = () => `Стоимость должна быть выше ${HOUSING_TYPE_PRICE[typeElement.value]}`;

pristine.addValidator(
  priceElement,
  priceCheck,
  getPriceErrorMessage
);

const onPriceCheck = () => pristine.validate(priceElement);

priceElement.addEventListener('change', onPriceCheck);
typeElement.addEventListener('change', onPriceCheck);

const onTypeElementChange = () => {
  priceElement.placeholder = HOUSING_TYPE_PRICE[typeElement.value];
};

typeElement.addEventListener('change', onTypeElementChange);

// Слайдер для инпута с ценой
noUiSlider.create(priceSliderElement, {
  range: {
    min: 0,
    max: MAX_PRICE,
  },
  start: 1000,
  step: 500,
  connect: 'lower',
  format: {
    to: function (value) {
      return parseInt(value, 10);
    },
    from: function (value) {
      return parseInt(value, 10);
    },
  }
});

priceSliderElement.noUiSlider.on('slide', () => {
  priceElement.value = priceSliderElement.noUiSlider.get();
  pristine.validate(priceElement);
});

const onPriceChange = () => {
  priceSliderElement.noUiSlider.set(priceElement.value);
};

priceElement.addEventListener('input', onPriceChange);

const onTypeElementChangeSlider = () => {
  priceSliderElement.noUiSlider.updateOptions({
    range: {
      min: HOUSING_TYPE_PRICE[typeElement.value],
      max: MAX_PRICE
    },
    start: HOUSING_TYPE_PRICE[typeElement.value],
    step: 500
  });
  priceSliderElement.noUiSlider.set(priceElement.value);
};

typeElement.addEventListener('change', onTypeElementChangeSlider);

//Сброс формы
const onFormReset = () => {
  offerForm.reset();
  filterForm.reset();
  priceSliderElement.noUiSlider.reset();
};

formResetButton.addEventListener('click', (evt) => {
  evt.preventDefault(); //Я не уверен, что нужно скидывать, потому что кнопка с типом ресет свою форму прекрасно скидывает.
  onFormReset();
  pristine.reset();
  resetMap();
  setStartAddress();
});

//Отправка формы
const blockSubmitButton = () => {
  formSubmitButton.disabled = true;
  formSubmitButton.textContent = 'Публикация...';
};

const unblockSubmitButton = () => {
  formSubmitButton.disabled = false;
  formSubmitButton.textContent = 'Опубликовать';
};

const setOnOfferFormSubmit = (cb) => {
  offerForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      await cb(new FormData(evt.target));
      unblockSubmitButton();
    }
  });
};

export { turnOfferFormOff, turnOfferFormOn, turnFilterFormOff, turnFilterFormOn, setOnOfferFormSubmit, onFormReset };
