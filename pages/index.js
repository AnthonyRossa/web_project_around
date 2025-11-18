import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import {
  validationConfig,
  initialCards,
  editProfileForm,
  addCardForm,
  cardsContainer,
} from "../utils/constants.js";

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

  const card = new Card(cardData, "#card-template", (name, link) => {
    imagePopup.open(name, link);
  });
  const cardElement = card.generateCard();

  cardsContainer.prepend(cardElement);
};

const renderInitialCards = () => {
  const cardsContainer = document.querySelector(".cards");
  initialCards.forEach((cardData) => {
    const card = new Card(cardData, "#card-template", (name, link) => {
      imagePopup.open(name, link);
    });
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
