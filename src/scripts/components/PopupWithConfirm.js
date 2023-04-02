import Popup from './Popup';

export default class PopupWithConfirm extends Popup {
  constructor(popup, api, clearAndRenderCards) {
    super(popup);
    this._clearAndRenderCards = clearAndRenderCards;
    this._popupForm = this._popup.querySelector('.popup__form');
    // this._submitForm = submitForm;
    this._api = api;
    // this._dataCard = dataCard
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
  }

  setEventLesteners(card, element) {
    this._cardData = card;
    this._element = element;
    super.setEventLesteners();
    this._popupForm.addEventListener('submit', (evt) => {
      this.removeCard(evt)
    });
  }

  removeCard(evt) {
    evt.preventDefault();
    this._api.deleteCard(this._cardData).then(() => { this._element.remove() })
    this._clearAndRenderCards();
    this.close();
  }
  //  _getInputValues() {
  //     this._inputsData = {};
  //     this._inputList.forEach(element => {
  //        this._inputsData[element.name] = element.value;
  //     });
  //     return this._inputsData;
  //  }

  //  _eventSubmit = (evt) => {
  //     evt.preventDefault();
  //     this._submitForm(this._getInputValues());
  //     this.close();
  //  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
