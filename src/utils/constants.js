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

export { validationConfig, editProfileForm, addCardForm, cardsContainer };
