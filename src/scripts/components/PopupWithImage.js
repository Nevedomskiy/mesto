import Popup from './Popup';

export default class PopupWithImage extends Popup {
   constructor(popup) {
      super(popup);
      this._popupPhotoImg = this._popup.querySelector('.popup__img');
      this._popupPhotoName = this._popup.querySelector('.popup__name');
   }
   open(item) {
      super.open();
      this._popupPhotoImg.src = item.link;
      this._popupPhotoName.alt = item.name;
      this._popupPhotoName.textContent = item.name;
   }

}
