const offerForm = document.querySelector('.ad-form');
const roomNumber = offerForm.querySelector('#room_number').value;
const capacity = offerForm.querySelector('#capacity').value;
const capacityElement = offerForm.querySelector('#capacity');

const pristine = new Pristine(offerForm,
  {
    classTo: 'ad-form__element',
    errorTextParent: 'ad-form__element',
    errorTextClass: 'ad-form__element--invalid'
  },
  true
);


const capacityCheck = () => roomNumber >= capacity && capacity <= 100;

pristine.addValidator(
  capacityElement,
  capacityCheck,
  'Для такого количества гостей нужно больше комнат'
);

offerForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});
