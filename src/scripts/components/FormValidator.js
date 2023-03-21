//класс валидации форм
class FormValidator {
   constructor(config, form) {
      this._form = form;
      this._formSelector = config.formSelector;
      this._inputSelector = config.inputSelector;
      this._errorClass = config.errorClass;
      this._buttonSubmit = this._form.querySelector(config.buttonSubmitSelector);
      this._buttonSubmitDisabledClass = config.buttonSubmitDisabledClass;
      this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
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
      this._inputList.forEach((inputElement) => {
         inputElement.addEventListener('input', () => { this._handleFormInput(inputElement) });
      })
   }

   //проверка валидации(используется для проверки полей инпутов при открытии попапа)
   checkValidation() {
      this._inputList.forEach((inputElement) => {
         this._setParametersInput(inputElement);
         inputElement.classList.remove(this._errorClass);
         this._spanError.textContent = '';
      })
   }

   // назначает переменные по селектору инпута
   _setParametersInput(inputElement) {
      this._inputElement = inputElement;
      this._inputElementId = this._inputElement.id;
      this._spanError = this._form.querySelector(`#${this._inputElementId}-error`);
   }

   //проверяем валидность формы (показываем стиль ошибки и его текст или удаляем его)
   _handleFormInput(inputElement) {
      this._setParametersInput(inputElement);
      if (this._inputElement.validity.valid) {
         this._inputElement.classList.remove(this._errorClass);
         this._spanError.textContent = '';
      }
      else {
         this._inputElement.classList.add(this._errorClass);
         this._spanError.textContent = this._inputElement.validationMessage;
      }
   }
   //блокировка кнопки невалидной кнопки(используется снаружи при открытии попапов, поэтому публичный)
   toggleButton() {
      this._isFormValid = this._form.checkValidity();
      this._buttonSubmit.disabled = !this._isFormValid;
      this._buttonSubmit.classList.toggle(this._buttonSubmitDisabledClass, !this._isFormValid);
   }



}



export { FormValidator };
