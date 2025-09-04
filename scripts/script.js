const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close");
const formElement = document.querySelector(".popup__form");

function openPopup() {
  let currentName = document.querySelector(".profile__name").textContent;
  let currentAbout = document.querySelector(".profile__about").textContent;

  let nameInput = document.querySelector('.popup__input[name="name"]');
  let aboutInput = document.querySelector('.popup__input[name="about"]');

  nameInput.value = currentName;
  aboutInput.value = currentAbout;

  popup.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  let nameInput = document.querySelector('.popup__input[name="name"]');
  let aboutInput = document.querySelector('.popup__input[name="about"]');
  let nameValue = nameInput.value;
  let aboutValue = aboutInput.value;
  let profileName = document.querySelector(".profile__name");
  let profileAbout = document.querySelector(".profile__about");
  profileName.textContent = nameValue;
  profileAbout.textContent = aboutValue;

  closePopup();
}

formElement.addEventListener("submit", handleProfileFormSubmit);
