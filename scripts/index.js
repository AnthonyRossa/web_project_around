const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close");
const formElement = document.querySelector(".popup__form");

function configurePopup(title, formContent, submitText) {
  const popup = document.querySelector(".popup");
  const popupTitle = popup.querySelector(".popup__title");
  const popupForm = popup.querySelector(".popup__form");
  const submitButton = popup.querySelector(".popup__save");

  popupTitle.textContent = title;
  popupForm.innerHTML = formContent;
  submitButton.textContent = submitText;

  return popup;
}

function openEditProfilePopup() {
  const formContent = `
    <input type="text" name="name" class="popup__input" placeholder="Nome">
    <input type="text" name="about" class="popup__input" placeholder="Sobre mim">
    <button type="submit" class="popup__save">Salvar</button>
  `;

  const popup = configurePopup("Editar Perfil", formContent, "Salvar");

  const nameInput = popup.querySelector('input[name="name"]');
  const aboutInput = popup.querySelector('input[name="about"]');

  nameInput.value = document.querySelector(".profile__name").textContent;
  aboutInput.value = document.querySelector(".profile__about").textContent;

  openPopup(popup);
}

function openAddCardPopup() {
  const formContent = `
    <input type="text" name="title" class="popup__input" placeholder="Título">
    <input type="url" name="link" class="popup__input" placeholder="Link da imagem">
    <button type="submit" class="popup__save">Criar</button>
    `;

  const popup = configurePopup("Novo Lugar", formContent, "Criar");

  openPopup(popup);
}

function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", openEditProfilePopup);
addButton.addEventListener("click", openAddCardPopup);
closeButton.addEventListener("click", closePopup);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameInput = document.querySelector('.popup__input[name="name"]');
  const aboutInput = document.querySelector('.popup__input[name="about"]');
  const nameValue = nameInput.value;
  const aboutValue = aboutInput.value;
  const profileName = document.querySelector(".profile__name");
  const profileAbout = document.querySelector(".profile__about");
  profileName.textContent = nameValue;
  profileAbout.textContent = aboutValue;

  closePopup();
}
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  closePopup();
}

document.addEventListener("submit", function (evt) {
  if (evt.target.classList.contains("popup__form")) {
    const nameInput = evt.target.querySelector('input[name="name"]');

    if (nameInput) {
      handleProfileFormSubmit(evt);
    } else {
      handleAddCardFormSubmit(evt);
    }
  }
});
