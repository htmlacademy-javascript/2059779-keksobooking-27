const adForm = document.querySelector('.ad-form');
const fieldsets = adForm.querySelectorAll('fieldset');

const turnFormOff = () => {
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });
  adForm.classList.add(`${adForm.classList[0]}--disabled`);
};

const turnFormOn = () => {
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
  adForm.classList.remove(`${adForm.classList[0]}--disabled`);
};

export { turnFormOff, turnFormOn };
