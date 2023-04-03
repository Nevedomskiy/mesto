import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(popup, { submitForm }) {
    super(popup);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._submitForm = submitForm;
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
    this._btnSubmit = this._popup.querySelector('.popup__submit-btn');
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', this._handleSubmit);
  }

  _getInputValues() {
    this._inputsData = {};
    this._inputList.forEach(element => {
      this._inputsData[element.name] = element.value;
    });
    return this._inputsData;
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();
    this._submitForm(this._getInputValues());
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  setSubmitButtonText(text) {
    this._btnSubmit.textContent = `${text}`
  }

}
