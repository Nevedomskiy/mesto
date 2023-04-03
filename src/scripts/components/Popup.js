export default class Popup {
  constructor(popup) {
    this._popup = popup;
    this._btnClose = this._popup.querySelector('.btn-close');
  }

  open() {
    this._popup.classList.add('popup_active');
    this._setEscEventListener();
  };

  close() {
    this._popup.classList.remove('popup_active');
    this._removeEscEventListener();
  };

  _setEscEventListener() {
    document.addEventListener('keydown', this._handleCloseByEsc);
  }

  _removeEscEventListener() {
    document.removeEventListener('keydown', this._handleCloseByEsc);
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', this._handleCloseByOverlay);
    this._btnClose.addEventListener('click', () => { this.close() });
  };

  _handleCloseByOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  };

  _handleCloseByEsc = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  };
}
