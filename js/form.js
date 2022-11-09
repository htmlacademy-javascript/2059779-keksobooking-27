const offerForm = document.querySelector('.ad-form');
const roomNumber = offerForm.querySelector('#room_number').value;
const capacity = offerForm.querySelector('#capacity').value;
const capacityElement = offerForm.querySelector('#capacity');

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


const capacityCheck = () => roomNumber >= capacity && capacity <= 100;

pristine.addValidator(
  capacityElement,
  capacityCheck,
  'Для такого количества гостей нужно больше комнат'
);

offerForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) { evt.preventDefault(); }
});
