const removeEmptyElements = (element) => {
  for (let i = 0; i < element.children.length; i++) {
    if (element.children[i].textContent === '') {
      element.children[i].remove();
    }
  }
};

export { removeEmptyElements };
