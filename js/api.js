const ALERT_MESSAGE = 'Не удалось загрузить объявления';

const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch('https://27.javascript.pages.academy/keksobooking/data');

    if (!response.ok) {
      throw new Error(ALERT_MESSAGE);
    }

    const offers = await response.json();
    onSuccess(offers);
  } catch (error) {
    onFail(error.message);
  }
};

export { getData};
