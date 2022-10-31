const turnFormOff = (form) => {
  const formElement = document.querySelector(form);
  const formChildren = formElement.children;
  formElement.classList.add(`${formElement.classList[0]}--disabled`);
  for (const child of formChildren) {
    child.disabled = true;
  }
};

const turnFormOn = (form) => {
  const formElement = document.querySelector(form);
  const formChildren = formElement.children;
  formElement.classList.remove(`${formElement.classList[0]}--disabled`);
  for (const child of formChildren) {
    child.disabled = false;
  }
};

export { turnFormOff, turnFormOn };
