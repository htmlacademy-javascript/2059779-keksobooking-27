const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const imageChooser = document.querySelector('#images');
const imagePreviewContainer = document.querySelector('.ad-form__photo');

imageChooser.addEventListener('change', () => {
  const file = imageChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imagePreviewContainer.innerHTML = '';
    const imageElement = document.createElement('img');
    imageElement.alt = 'Фотография жилья';
    imageElement.classList.add('ad-form__image');
    imageElement.src = URL.createObjectURL(file);
    imagePreviewContainer.append(imageElement);
  }
});

const resetImage = () => {
  imagePreviewContainer.innerHTML = '';
};

export { resetImage };
