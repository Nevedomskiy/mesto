//перменные
export const popupProfile = document.querySelector('.popup_type_profile');
export const btnEditProfile = document.querySelector('.profile__button-edit');
export const popupProfileName = document.querySelector('.popup__input_type_name-profile');
export const popupProfileProfession = document.querySelector('.popup__input_type_profession-profile');
export const profileName = document.querySelector('.profile__name');
export const profileSubName = document.querySelector('.profile__subname');
export const btnAddCard = document.querySelector('.profile__button-add');
export const popupPlace = document.querySelector('.popup_type_place');
export const popupPhoto = document.querySelector('.popup_type_photo');
export const popupPhotoImg = document.querySelector('.popup__img');
export const popupPhotoName = document.querySelector('.popup__name');
export const popupFormPlace = document.querySelector('.popup__form_type_place');
export const popupFormProfile = document.querySelector('.popup__form_type_profile');
export const photoTemplate = document.querySelector('#photo-template').content;
export const photoContainer = document.querySelector('.photo__container');

//объект с данными карточек
export const initialCards = [
   {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
   },
   {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
   },
   {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
   },
   {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
   },
   {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
   },
   {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
   }
];

//объект с данными для валидации
export const formValidationConfig = {
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   errorClass: 'form__input_error',
   buttonSubmitSelector: '.popup__submit-btn',
   buttonSubmitDisabledClass: 'popup__submit-btn_disabled'
}


