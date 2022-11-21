const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const isEscKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export { debounce, isEscKey };
