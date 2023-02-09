// валидация
const formValidationConfig = {
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   errorClass: 'form__input_error',
   buttonSubmitSelector: '.popup__submit-btn',
}

function disableSubmit(evt) { evt.preventDefault(); };

function enabledValidation(config) {
   const formList = Array.from(document.querySelectorAll(config.formSelector));
   formList.forEach((form) => {
      enabledValidationForm(form, config);

   })
}

function enabledValidationForm(form, config) {
   addInputListners(form, config);
   form.addEventListener('submit', disableSubmit);
   addInputListners(form, config);

   form.addEventListener('input', () => {
      toggleButton(form, config);
   })
   toggleButton(form, config);
}

function addInputListners(form, config) {
   const inputList = Array.from(form.querySelectorAll(config.inputSelector));
   inputList.forEach(function (inputElement) {
      inputElement.addEventListener('input', (evt) => { handleFormInput(evt, config) })
   })

}

function handleFormInput(evt, config) {
   const inputEvent = evt.target;
   const inputEventId = inputEvent.id;
   const spanError = document.querySelector(`#${inputEventId}-error`);


   if (inputEvent.validity.valid) {
      inputEvent.classList.remove(config.errorClass);
      spanError.textContent = '';
   }
   else {
      inputEvent.classList.add(config.errorClass);
      spanError.textContent = inputEvent.validationMessage;

   }
}

function toggleButton(form, config) {
   const buttonSubmit = form.querySelector(config.buttonSubmitSelector);
   const isFormValid = form.checkValidity();
   buttonSubmit.disabled = !isFormValid;
   buttonSubmit.classList.toggle('popup__submit-btn_disabled', !isFormValid);

}

enabledValidation(formValidationConfig);

