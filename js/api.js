const FAIL_TEXT = 'Не удалось отправить данные. Попробуйте ещё раз через некоторое время.';

const getData = async () => {
  await fetch('https://27.javascript.pages.academy/keksobooking/data');
};

const sendData = async (onFail, body) => {
  try {
    await fetch('https://27.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body,
      });
  } catch (error) {
    onFail(FAIL_TEXT);
  }
};

export { getData, sendData };
