//класс валидации форм
class FormValidator {
   constructor(config, form) {
      this._form = form;
      this._formSelector = config.formSelector;
      this._inputSelector = config.inputSelector;
      this._errorClass = config.errorClass;
      this._buttonSubmitSelector = config.buttonSubmitSelector;
      this._buttonSubmitDisabledClass = config.buttonSubmitDisabledClass;
   }
//отключение стандартной отправки данных при событии submit
   _disableSubmit(evt) {
      evt.preventDefault();

   }
//запуск валидации(публичный, потому что используется для запуска валидации в других файлах)
   enabledValidationForm() {
      this._addInputListners();
      this._form.addEventListener('submit', this._disableSubmit);
      this._form.addEventListener('input', () => { this.toggleButton() });
      this.toggleButton();
   }

//вешаем слушатели на все поля инпутов
   _addInputListners() {
      this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
      this._inputList.forEach((inputElement) => {
         inputElement.addEventListener('input', (evt) => { this._handleFormInput(evt) });
      })
   }
//проверяем валидность формы (показываем стиль ошибки и его текст или удаляем его)
   _handleFormInput(evt) {
      this._inputEvent = evt.target;
      this._inputEventId = this._inputEvent.id;
      this._spanError = this._form.querySelector(`#${this._inputEventId}-error`);
      if (this._inputEvent.validity.valid) {
         this._inputEvent.classList.remove(this._errorClass);
         this._spanError.textContent = '';
      }
      else {
         this._inputEvent.classList.add(this._errorClass);
         this._spanError.textContent = this._inputEvent.validationMessage;
      }
   }
//блокировка кнопки невалидной кнопки(используется снаружи при открытии попапов, поэтому публичный)
   toggleButton() {
      this._buttonSubmit = this._form.querySelector(this._buttonSubmitSelector);
      this._isFormValid = this._form.checkValidity();
      this._buttonSubmit.disabled = !this._isFormValid;
      this._buttonSubmit.classList.toggle(this._buttonSubmitDisabledClass, !this._isFormValid);
   }

}



export { FormValidator };
