export default class Popup {
   constructor(popup) {
      this._popup = popup;
      this._btnClose = this._popup.querySelector('.btn-close');
   }

   openPopup() {
      this._popup.classList.add('popup_active');
   };

   closePopup() {
      this._deleteEventLesteners();
      this._popup.classList.remove('popup_active');
   };
   
   _setEventLesteners() {
      this._popup.addEventListener('mousedown', this._listenerClickOverley);
      document.addEventListener('keydown', this._handlePopupCloseEsc);
      this._btnClose.addEventListener('click', () => { this.closePopup() });
   };

   _deleteEventLesteners() {
      this._popup.removeEventListener('mousedown', this._listenerClickOverley);
      document.removeEventListener('keydown', this._handlePopupCloseEsc);
      this._btnClose.removeEventListener('click', () => { this.closePopup() });
   };

   _listenerClickOverley = (evt) => {
      if (evt.target === evt.currentTarget) {
         this.closePopup();
      }
   };

   _handlePopupCloseEsc = (evt) => {
      if (evt.key === 'Escape') {
         this.closePopup();

      }
   };
}
