class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector);
    const cardElement = cardTemplate.content
      .querySelector(".cards__card")
      .cloneNode(true);

    return cardElement;
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle("cards__like-button_active");
  }

  _setEventListeners() {
    this._deleteButton.addEventListener(
      "click",
      this._handleDeleteClick.bind(this)
    );
    this._likeButton.addEventListener(
      "click",
      this._handleLikeClick.bind(this)
    );
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector(".cards__card-image").src = this._link;
    this._element.querySelector(".cards__card-image").alt = this._name;
    this._element.querySelector(".cards__card-title").textContent = this._name;
    this._likeButton = this._element.querySelector(".cards__like-button");
    this._deleteButton = this._element.querySelector(".cards__delete-button");

    this._setEventListeners();

    return this._element;
  }
}

export default Card;
