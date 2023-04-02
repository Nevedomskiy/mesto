export default class ReloudButton {
  constructor(btn) {
    this._btn = btn;
    this._nextButton = this._btn.nextElementSibling;
  }
  hiddenButton() {
    this._btn.style.display = 'none';
    this._nextButton.style.display = 'block';
  }

  unhiddenButton() {
    this._btn.style.display = 'block';
    this._nextButton.style.display = 'none';
  }
}
