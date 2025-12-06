import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector(".popup__button_confirm");
  }

  open(cardToDelete) {
    this._cardToDelete = cardToDelete;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", () => {
      if (this._cardToDelete) {
        this._cardToDelete.deleteCard();
        this.close();
      }
    });
  }
}

export default PopupWithConfirmation;
