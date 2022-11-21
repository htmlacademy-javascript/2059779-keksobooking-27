const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const avatarChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

const resetAvatar = () => {
  avatarPreview.src = DEFAULT_AVATAR;
};

export { resetAvatar };
