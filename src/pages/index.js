import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
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

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
});

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

const createCard = (cardData) => {
  const card = new Card(cardData, "#card-template", (name, link) => {
    imagePopup.open(name, link);
  });
  return card.generateCard();
};

const section = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  ".cards"
);

const editProfilePopup = new PopupWithForm(
  "#edit-profile-popup",
  (formData) => {
    userInfo.setUserInfo(formData);
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
  section.renderer();
});
