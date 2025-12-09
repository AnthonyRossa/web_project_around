import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import {
  validationConfig,
  editProfileForm,
  addCardForm,
  changeAvatarForm,
} from "../utils/constants.js";

let cardSection;

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "25e44c37-6a52-4a3b-872e-f535279302d8",
    "Content-Type": "application/json",
  },
});

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
    });

    document.querySelector(".profile__image").src = userData.avatar;

    window.currentUserId = userData._id;
  })
  .catch((err) => {
    console.log("Failed to load user info:", err);
  });

api
  .getInitialCards()
  .then((cards) => {
    cardSection = new Section(
      {
        items: cards,
        renderer: createCard,
      },
      ".cards"
    );

    cardSection.renderer();
  })
  .catch((err) => {
    console.log("Failed to load cards:", err);
  });

const editProfileValidator = new FormValidator(
  validationConfig,
  editProfileForm
);
const addCardValidator = new FormValidator(validationConfig, addCardForm);

const changeAvatarValidator = new FormValidator(
  validationConfig,
  changeAvatarForm
);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();
changeAvatarValidator.enableValidation();

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
});

const editProfilePopup = new PopupWithForm(
  "#edit-profile-popup",
  (formData) => {
    const submitButton = document.querySelector(
      "#edit-profile-popup .popup__button"
    );
    const originalText = submitButton.textContent;
    submitButton.textContent = "Salvando...";

    api
      .setUserInfo(formData)
      .then((updatedUserData) => {
        userInfo.setUserInfo(updatedUserData);
        editProfilePopup.close();
      })
      .catch((err) => {
        console.log("Error at updating profile:", err);
      })
      .finally(() => {
        submitButton.textContent = originalText;
      });
  }
);

const changeAvatarPopup = new PopupWithForm(
  "#change-avatar-popup",
  (formData) => {
    const submitButton = document.querySelector(
      "#change-avatar-popup .popup__button"
    );
    const originalText = submitButton.textContent;
    submitButton.textContent = "Salvando...";

    api
      .changeAvatar(formData)
      .then((updatedAvatar) => {
        document.querySelector(".profile__image").src = updatedAvatar.avatar;
        changeAvatarPopup.close();
      })
      .catch((err) => {
        console.log("Error at updating avatar:", err);
      })
      .finally(() => {
        submitButton.textContent = originalText;
      });
  }
);

const addCardPopup = new PopupWithForm("#add-card-popup", (formData) => {
  const submitButton = document.querySelector("#add-card-popup .popup__button");
  const originalText = submitButton.textContent;
  submitButton.textContent = "Salvando...";

  api
    .addCard(formData)
    .then((newCardData) => {
      const cardElement = createCard(newCardData);
      cardSection.addItem(cardElement);
      addCardPopup.close();
    })
    .catch((err) => {
      console.log("Error on adding new card:", err);
    })
    .finally(() => {
      submitButton.textContent = originalText;
    });
});

const imagePopup = new PopupWithImage("#image-popup");

const confirmationPopup = new PopupWithConfirmation("#confirmation-popup");
confirmationPopup.setEventListeners();

const createCard = (cardData) => {
  const card = new Card(
    cardData,
    "#card-template",
    (name, link) => {
      imagePopup.open(name, link);
    },
    confirmationPopup,
    api
  );
  return card.generateCard();
};

editProfilePopup.setEventListeners();
changeAvatarPopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();

const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener("click", () => {
  editProfilePopup.open();
});

const editAvatarButton = document.querySelector(".profile__image-edit-button");
editAvatarButton.addEventListener("click", () => {
  changeAvatarPopup.open();
});

const addCardButton = document.querySelector(".profile__add-button");
addCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

document.addEventListener("DOMContentLoaded", () => {});
