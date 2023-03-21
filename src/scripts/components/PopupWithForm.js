import Popup from './Popup';

export default class PopupWithForm extends Popup {
   constructor(popup, { submitForm }) {
      super(popup);
      this._popupForm = this._popup.querySelector('.popup__form');
      this._submitForm = submitForm;
      this._inputList = this._popupForm.querySelectorAll('.popup__input');
   }

   setEventLesteners() {
      super.setEventLesteners();
      this._popupForm.addEventListener('submit', this._eventSubmit);
   }

   _getInputValues() {
      this._inputsData = {};
      this._inputList.forEach(element => {
         this._inputsData[element.name] = element.value;
      });
      return this._inputsData;
   }

   _eventSubmit = (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      this.close();
   }

   close() {
      super.close();
      this._popupForm.reset();
   }
}
