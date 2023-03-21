export default class Popup {
   constructor(popup) {
      this._popup = popup;
      this._btnClose = this._popup.querySelector('.btn-close');
   }

   open() {
      this._popup.classList.add('popup_active');
      this._handleEscClose();
   };

   close() {
      this._popup.classList.remove('popup_active');
      this._removeEscClose();
   };

   _handleEscClose() {
      document.addEventListener('keydown', this._handlePopupCloseEsc);
   }

   _removeEscClose() {
      document.removeEventListener('keydown', this._handlePopupCloseEsc);
   }

   setEventLesteners() {
      this._popup.addEventListener('mousedown', this._listenerClickOverley);
      this._btnClose.addEventListener('click', () => { this.close() });
   };

   _listenerClickOverley = (evt) => {
      if (evt.target === evt.currentTarget) {
         this.close();
      }
   };

   _handlePopupCloseEsc = (evt) => {
      if (evt.key === 'Escape') {
         this.close();
      }
   };
}
