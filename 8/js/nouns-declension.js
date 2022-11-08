
function nounsDeclension(value, words) { /** Скопировал из интернета. Пока смотрю в дебаггере как работает, вроде бы понимаю. Как только закрываю, принцип работы могу объяснить с трудом. Немного даже в голове не укладывается, что такую концепцию как склонение существительных можно объяснить такой простой математикой. */
  value = Math.abs(value) % 100;
  const num = value % 10;
  if (value > 10 && value < 20) {
    return words[2];
  }
  if (num > 1 && num < 5) {
    return words[1];
  }
  if (num === 1) {
    return words[0];
  }
  return words[2];
}

export { nounsDeclension };
