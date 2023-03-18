import Popup from './Popup';

export default class PopupWithForm extends Popup {
   constructor(popup, { submitForm }) {
      super(popup);
      this._popupForm = this._popup.querySelector('.popup__form');
      this._submitForm = submitForm;
      this._inputList = this._popupForm.querySelectorAll('.popup__input');
   }

   openPopup() {
      super.openPopup();
      this._setEventLesteners();
   }

   _getInputValues() {
      this._inputsData = {};
      this._inputList.forEach(element => {
         this._inputsData[element.name] = element.value;
      });
      return this._inputsData;
   }

   _setEventLesteners() {
      super._setEventLesteners();
      this._popupForm.addEventListener('submit', this._eventSubmit);
   };


   _deleteEventLesteners() {
      super._deleteEventLesteners();
      this._popupForm.removeEventListener('submit', this._eventSubmit);
   }

   _eventSubmit = (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      this.closePopup();
   }


   closePopup() {
      this._deleteEventLesteners();
      super.closePopup();
      this._popupForm.reset();
   }
}
