const GET_ALERT_MESSAGE = 'Не удалось загрузить объявления.';
const SEND_ALERT_MESSAGE = 'Не удалось отправить объявление.';

const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch('https://27.javascript.pages.academy/keksobooking/data');

    if (!response.ok) {
      throw new Error(GET_ALERT_MESSAGE);
    }

    const offers = await response.json();
    onSuccess(offers);
  } catch (error) {
    onFail(error.message);
  }
};

const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(
      'https://27.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body
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
