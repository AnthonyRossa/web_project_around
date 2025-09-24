const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close");
const formElement = document.querySelector(".popup__form");
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

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function toggleLike(likeButton) {
  likeButton.classList.toggle("cards__like-button_active");
}

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
