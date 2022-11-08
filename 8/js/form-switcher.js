const fieldsets = document.querySelectorAll('fieldset');

const turnFormOff = () => {
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
    fieldset.classList.add(`${fieldset.classList[0]}--disabled`);
  });
};

const turnFormOn = () => {
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
    fieldset.classList.remove(`${fieldset.classList[0]}--disabled`);
  });
};

export { turnFormOff, turnFormOn };
