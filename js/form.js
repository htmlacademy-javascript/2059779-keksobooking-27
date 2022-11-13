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

const HOUSING_TYPE_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

const offerForm = document.querySelector('.ad-form');
const capacityElement = offerForm.querySelector('#capacity');
const roomElement = offerForm.querySelector('#room_number');
const timeInElement = offerForm.querySelector('#timein');
const timeOutElement = offerForm.querySelector('#timeout');
const priceElement = offerForm.querySelector('#price');
const priceSliderElement = offerForm.querySelector('.ad-form__slider');
const typeElement = offerForm.querySelector('#type');
priceElement.placeholder = HOUSING_TYPE_PRICE[typeElement.value];

// Добавляем экземпляр Pristine. Из материалов и объяснений Академии, я так и не понял, что такое new и экземпляр. Я вижу это просто как какую-то инизиализацию скрипта, где мы добавляем на него ссылку и передаём объект настроек.
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
// Функция, которая содержит логику проверки
const capacityCheck = () => ROOMS_TO_GUESTS[roomElement.value].includes(capacityElement.value);

const getСapacityElementErrorMessage = () => `Для такого количества гостей подойдёт ${GUESTS_TO_ROOMS[capacityElement.value].join(' или ')}`;

// Метод, который передаёт на валидацию определённого элемента нашу функцию.
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

// Функция, которая вызывает валидатор на два элемента. На два, потому что их значения зависимы друг от друга.
const onRoomNumberChange = () => {
  pristine.validate(capacityElement);
  pristine.validate(roomElement);
};

// Вторая функция, для второго слушателя.
const onGuestsNumberChange = () => {
  pristine.validate(capacityElement);
  pristine.validate(roomElement);
};

// Навешиваем обработчики событий на элементы с функциями, которые содержат валидацию.
roomElement.addEventListener('change', onRoomNumberChange);
capacityElement.addEventListener('change', onGuestsNumberChange);

// Изменение времени заселения и выселения
const onTimeInChange = () => {
  timeOutElement.value = timeInElement.value;
};

const onTimeOutChange = () => {
  timeInElement.value = timeOutElement.value;
};

// Навешиваю два обработчика. Не знаю, как сделать изящнее.
timeInElement.addEventListener('change', onTimeInChange);
timeOutElement.addEventListener('change', onTimeOutChange);

// Проверка цены в зависимости от выбранного типа жилья
const priceCheck = (value) => Number.parseInt(value, 10) >= HOUSING_TYPE_PRICE[typeElement.value];

const getPriceErrorMessage = () => `Стоимость должна быть выше ${HOUSING_TYPE_PRICE[typeElement.value]}`;

// Снова сообщаю валидатору, что хочу проверять элемент цены по особым правилам. Передаю функцию.
pristine.addValidator(
  priceElement,
  priceCheck,
  getPriceErrorMessage
);

// Функция, которая валидирует элемент цены.
const onPriceCheck = () => pristine.validate(priceElement);

priceElement.addEventListener('change', onPriceCheck);
typeElement.addEventListener('change', onPriceCheck);

const onTypeElementChange = () => {
  priceElement.placeholder = HOUSING_TYPE_PRICE[typeElement.value];
};

typeElement.addEventListener('change', onTypeElementChange);

offerForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) { evt.preventDefault(); }
});

// Слайдер для инпута с ценой
noUiSlider.create(priceSliderElement, {
  range: {
    min: 0,
    max: 10000,
  },
  start: 1000,
  step: 1000,
  connect: 'lower',
});

// priceSliderElement.noUiSlider.on('update', () => {
//   priceElement.value = priceSliderElement.noUIiSlider.get(); // Всё как в примере, а консоль сыпет ошибкой undefined
// });
