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

const isEscKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const onMouseClick = () => hideMessage();
const onEscKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
};

const showSuccessMessage = () => {
  const successMessageElement = successMessageTemplate.cloneNode(true);
  document.addEventListener('click', onMouseClick);
  document.addEventListener('keydown', onEscKeydown);
  bodyElement.append(successMessageElement);
  bodyElement.style.overflow = 'hidden';
};

const showErrorMessage = () => {
  const errorMessageElement = errorMessageTemplate.cloneNode(true);
  document.addEventListener('click', onMouseClick); //В объявлении об ошибке есть кнопка "Попробовать снова". По идее на неё нужно навешивать сабмит отправки формы? А сейчас она у меня закрывается просто из-за глобального слушателя клика.
  document.addEventListener('keydown', onEscKeydown);
  bodyElement.append(errorMessageElement);
  bodyElement.style.overflow = 'hidden';
};

const showAlertMessage = (message) => {
  const alertElement = document.createElement('div');
  alertElement.classList.add('alert');
  alertElement.textContent = message;
  document.body.append(alertElement);

  setTimeout(() => {
    alertElement.remove();
  }, 2000);
};

export { showSuccessMessage, showErrorMessage, showAlertMessage };
