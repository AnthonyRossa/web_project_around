import FormValidator from "./FormValidator.js";
import { PopupWithForm, PopupWithImage } from "./utils.js";
import Card from "./Card.js";

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const editProfileForm = document.querySelector("#edit-profile-popup");
const addCardForm = document.querySelector("#add-card-popup");
const cardsContainer = document.querySelector(".cards");

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

const editProfileValidator = new FormValidator(
  validationConfig,
  editProfileForm
);
const addCardValidator = new FormValidator(validationConfig, addCardForm);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

const updateProfile = (formData) => {
  const profileName = document.querySelector(".profile__name");
  const profileAbout = document.querySelector(".profile__about");

  profileName.textContent = formData.name;
  profileAbout.textContent = formData.about;
};

const handleAddCardSubmit = () => {
  const nameInput = addCardForm.querySelector("#place-title");
  const linkInput = addCardForm.querySelector("#place-link");

  const cardData = {
    name: nameInput.value,
    link: linkInput.value,
  };

  const card = new Card(cardData, "#card-template");
  const cardElement = card.generateCard();

  cardsContainer.prepend(cardElement);
};

const renderInitialCards = () => {
  const cardsContainer = document.querySelector(".cards");
  initialCards.forEach((cardData) => {
    const card = new Card(cardData, "#card-template");
    const cardElement = card.generateCard();
    cardsContainer.appendChild(cardElement);
  });
};

const editProfilePopup = new PopupWithForm(
  "#edit-profile-popup",
  (formData) => {
    updateProfile(formData);
  }
);

const addCardPopup = new PopupWithForm("#add-card-popup", (formData) => {
  handleAddCardSubmit(formData);
});

const imagePopup = new PopupWithImage("#image-popup");

editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();

const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener("click", () => {
  editProfilePopup.open();
});

const addCardButton = document.querySelector(".profile__add-button");
addCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

document.addEventListener("DOMContentLoaded", () => {
  renderInitialCards();
});
