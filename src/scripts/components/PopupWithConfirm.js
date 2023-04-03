import Popup from './Popup';

export default class PopupWithConfirm extends Popup {
  constructor(popup) {
    super(popup);
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  setCallback(callback) {
    this._callback = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callback();
    });
  }
}
