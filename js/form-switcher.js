const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const filterForm = document.querySelector('.map__filters');
const filterFormFieldsets = filterForm.querySelector('fieldset');


// Сначала я думал соорудить универсальную функцию, которая будет принимать в параметры элементы, но потом мне эта идея разонравилась. Потому что придётся в main переносить поиск элементов форм. Хотя если дублировать, как я сделал ниже, то это не DRY. Как лучше?
const turnAdFormOff = () => {
  adFormFieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });
  adForm.classList.add(`${adForm.classList[0]}--disabled`);
};

const turnAdFormOn = () => {
  adFormFieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
  adForm.classList.remove(`${adForm.classList[0]}--disabled`);
};

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

const resetForms = () => {
  adForm.reset();
  filterForm.reset();
  //Видимо этот весь код есть смысл объединить с form.js, потому что здесь нужно ещё слайдеру скидывать значение, и я дважды ищу одни и те же элементы. Но пока этого делать не буду, чтобы не вызывать ещё больше конфликтов при ребейсе и мёрдже.
};

export { turnAdFormOff, turnAdFormOn, turnFilterFormOff, turnFilterFormOn, resetForms };
