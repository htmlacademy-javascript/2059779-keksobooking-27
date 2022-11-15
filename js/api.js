const GET_ALERT_MESSAGE = 'Не удалось загрузить объявления.';
const SEND_ALERT_MESSAGE = 'Не удалось отправить объявление.';

const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch('https://27.javascript.pages.academy/keksobooking/data');

    if (!response.ok) {
      throw new Error(GET_ALERT_MESSAGE); //Вопрос: А JS вообще как-то скрин-ридеру передаст всё это великолепие? Как сделать сообщения об ошибке доступными?
    }

    const offers = await response.json(); //Вот здесь, я не очень понимаю, почему мы опять пишем await. Мы же уже выше дождались выполнения асихронной операции. И распарсивание же результата уже проходит на клиенте по факту получения?
    onSuccess(offers);
  } catch (error) {
    onFail(error.message);
  }
};

const sendData = async (onSuccess, onFail, data) => {
  try {
    const response = await fetch(
      'https://27.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        data
      }
    );

    if (!response.ok) {
      throw new Error(SEND_ALERT_MESSAGE);
    }
    onSuccess();
  } catch (error) {
    onFail(error.message);
  }
};

export { getData, sendData };
