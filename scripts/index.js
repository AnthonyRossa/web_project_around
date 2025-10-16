const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close");
const formElement = document.querySelector(".popup__form");
const imagePopup = document.querySelector(".image-popup");
const imagePopupClose = document.querySelector(".image-popup__close-button");
const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

function configurePopup(title, formContent, submitText) {
  const popup = document.querySelector(".popup");
  const popupTitle = popup.querySelector(".popup__title");
  const popupForm = popup.querySelector(".popup__form");
  const submitButton = popup.querySelector(".popup__button");

  popupTitle.textContent = title;
  popupForm.innerHTML = formContent;
  submitButton.textContent = submitText;

  return popup;
}

function openEditProfilePopup() {
  const formContent = `
    <input id="profile-name" type="text" name="name" class="popup__input" placeholder="Nome" required minlength="2" maxlength="40">
    <span class="popup__input-error profile-name-error"></span>
    <input id="profile-about" type="text" name="about" class="popup__input" placeholder="Sobre mim" required minlength="2" maxlength="200">
    <span class="popup__input-error profile-about-error"></span>
    <button type="submit" class="popup__button">Salvar</button>
  `;

  const popup = configurePopup("Editar Perfil", formContent, "Salvar");

  const nameInput = popup.querySelector('input[name="name"]');
  const aboutInput = popup.querySelector('input[name="about"]');

  nameInput.value = document.querySelector(".profile__name").textContent;
  aboutInput.value = document.querySelector(".profile__about").textContent;

  openPopup(popup);

  enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  });
}

function openAddCardPopup() {
  const formContent = `
    <input id= "place-title" type="text" name="title" class="popup__input" placeholder="Título" required minlength="2" maxlength="30">
    <span class="popup__input-error place-title-error"></span>
    <input id="place-link" type="url" name="link" class="popup__input" placeholder="Link da imagem" required>
    <span class="popup__input-error place-link-error"></span>
    <button type="submit" class="popup__button">Criar</button>
    `;

  const popup = configurePopup("Novo Lugar", formContent, "Criar");

  openPopup(popup);

  enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  });
}

function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  popupElement.addEventListener("click", closePopupOnOverlay);
  document.addEventListener("keydown", closePopupOnEsc);
}

function closePopup() {
  popup.classList.remove("popup_opened");
  popupElement.removeEventListener("click", closePopupOnOverlay);
  document.removeEventListener("keydown", closePopupOnEsc);
}

editButton.addEventListener("click", openEditProfilePopup);
addButton.addEventListener("click", openAddCardPopup);
closeButton.addEventListener("click", closePopup);

const closePopupOnOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
};

const closePopupOnEsc = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
};

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

function renderInitialCards() {
  const cardsContainer = document.querySelector(".cards");
  initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData.name, cardData.link);
    cardsContainer.appendChild(cardElement);
  });
}

function createCard(name, link) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".cards__card")
    .cloneNode(true);

  cardElement.querySelector(".cards__card-image").src = link;
  cardElement.querySelector(".cards__card-image").alt = name;
  cardElement.querySelector(".cards__card-title").textContent = name;

  const deleteButton = cardElement.querySelector(".cards__delete-button");
  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });

  const likeButton = cardElement.querySelector(".cards__like-button");
  likeButton.addEventListener("click", () => {
    toggleLike(likeButton);
  });

  const imageElement = cardElement.querySelector(".cards__card-image");
  imageElement.addEventListener("click", () => {
    openImage(imageElement);
  });

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function toggleLike(likeButton) {
  likeButton.classList.toggle("cards__like-button_active");
}

function openImage(imageElement) {
  const imageSrc = imageElement.src;
  const imageAlt = imageElement.alt;

  const popupImage = imagePopup.querySelector(".image-popup__image");
  const popupCaption = imagePopup.querySelector(".image-popup__caption");

  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  popupCaption.textContent = imageAlt;

  imagePopup.classList.add("image-popup_opened");
  imagePopup.addEventListener("click", closeImagePopupOnOverlay);
  document.addEventListener("keydown", closeImagePopupOnEsc);
}

imagePopupClose.addEventListener("click", closeImagePopup);

function closeImagePopup() {
  imagePopup.classList.remove("image-popup_opened");
  imagePopup.removeEventListener("click", closeImagePopupOnOverlay);
  document.removeEventListener("keydown", closeImagePopupOnEsc);
}

const closeImagePopupOnOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closeImagePopup(evt.target);
  }
};

const closeImagePopupOnEsc = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".image-popup_opened");
    if (openedPopup) {
      closeImagePopup(openedPopup);
    }
  }
};

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const titleInput = document.querySelector('.popup__input[name="title"]');
  const linkInput = document.querySelector('.popup__input[name="link"]');

  const titleValue = titleInput.value;
  const linkValue = linkInput.value;

  const newCard = createCard(titleValue, linkValue);

  const cardsContainer = document.querySelector(".cards");
  cardsContainer.prepend(newCard);

  titleInput.value = "";
  linkInput.value = "";

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

document.addEventListener("DOMContentLoaded", () => {
  renderInitialCards();
});
