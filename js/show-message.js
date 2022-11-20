import { isEscKey } from './util.js';

const bodyElement = document.body;
const successMessageTemplate = bodyElement.querySelector('#success')
  .content
  .querySelector('.success');
const errorMessageTemplate = bodyElement.querySelector('#error')
  .content
  .querySelector('.error');

const hideMessage = () => {
  const messageElement = bodyElement.querySelector('.success') || bodyElement.querySelector('.error');
  messageElement.remove();
  bodyElement.style.overflow = 'auto';
};

const onMouseClick = () => hideMessage();

const onEscKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    hideMessage();
    document.removeEventListener('keydown', onEscKeydown);
  }
};

const showSuccessMessage = () => {
  const successMessageElement = successMessageTemplate.cloneNode(true);
  successMessageElement.addEventListener('click', onMouseClick);
  document.addEventListener('keydown', onEscKeydown);
  bodyElement.append(successMessageElement);
  bodyElement.style.overflow = 'hidden';
};

const showErrorMessage = () => {
  const errorMessageElement = errorMessageTemplate.cloneNode(true);
  const errorButton = errorMessageElement.querySelector('.error__button');
  errorMessageElement.addEventListener('click', onMouseClick);
  errorButton.addEventListener('click', onMouseClick);
  document.addEventListener('keydown', onEscKeydown);
  bodyElement.append(errorMessageElement);
  bodyElement.style.overflow = 'hidden';
};

const showAlertMessage = (message) => {
  const alertElement = document.createElement('div');
  alertElement.setAttribute('role', 'alert');
  alertElement.classList.add('alert');
  alertElement.textContent = message;
  document.body.append(alertElement);

  setTimeout(() => {
    alertElement.remove();
  }, 2000);
};

export { showSuccessMessage, showErrorMessage, showAlertMessage };
