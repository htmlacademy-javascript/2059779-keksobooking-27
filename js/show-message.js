const bodyElement = document.body;
const successMessageTemplate = bodyElement.querySelector('#success')
  .content
  .querySelector('.success');
const errorMessageTemplate = bodyElement.querySelector('#error')
  .content
  .querySelector('.error');

const hideMessage = () => {
  const messageElement = bodyElement.querySelector('.success') || bodyElement.querySelector('.error');
  messageElement.remove(); //Вообще не знаю, насколько это нужно. У кнопки стоит атрибут type=reset. Браузер и сам прекрасно справляется.
  bodyElement.style.overflow = 'auto';
};

const isEscKey = (evt) => evt.key === 'Escape'; // В ретро зачем-то добавляют такой код. || evt.key === 'Esc'; Но в MDN указан только Escape без вариантов. Код перенесу в utils после мерджа.

const onPointerClick = () => hideMessage(); //Не знаю, удачное название или нет. В подкасте слышал про Pointer Events, которые объединяют в себе и клики и тапы. Указательный палец же тоже Pointer Finger.

const onEscKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
};

const showSuccessMessage = () => {
  const successMessageElement = successMessageTemplate.cloneNode(true);
  document.addEventListener('click', onPointerClick);
  document.addEventListener('keydown', onEscKeydown);
  bodyElement.append(successMessageElement);
  bodyElement.style.overflow = 'hidden';
};

const showErrorMessage = () => {
  const errorMessageElement = errorMessageTemplate.cloneNode(true);
  document.removeEventListener('click', onPointerClick);
  document.removeEventListener('keydown', onEscKeydown);
  bodyElement.append(errorMessageElement);
  bodyElement.style.overflow = 'hidden';
};

export { showSuccessMessage, showErrorMessage };
