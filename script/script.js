//испорты
import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
import { initialCards, formValidationConfig } from './arrays.js';


//перменные
const popupProfile = document.querySelector('.popup_type_profile');
const btnEditProfile = document.querySelector('.profile__button-edit');
const popupProfileName = document.querySelector('.popup__input_type_name-profile');
const popupProfileProfession = document.querySelector('.popup__input_type_profession-profile');
const profileName = document.querySelector('.profile__name');
const profileSubName = document.querySelector('.profile__subname');
const bodywork = document.querySelector('.bodywork');
const btnCloseAll = bodywork.querySelectorAll('.btn-close');
const formProfile = document.forms.profileForm;
const formPlace = document.forms.placeForm;
const btnAddCard = document.querySelector('.profile__button-add');
const popupPlace = document.querySelector('.popup_type_place');
const popupPhoto = document.querySelector('.popup_type_photo');
const popupPhotoImg = document.querySelector('.popup__img');
const popupPhotoName = document.querySelector('.popup__name');
const popupPlaceName = popupPlace.querySelector('.popup__input_type_name-place');
const popupPlaceLink = popupPlace.querySelector('.popup__input_type_link-place');
const popupFormPlace = document.querySelector('.popup__form_type_place');
const popupFormProfile = document.querySelector('.popup__form_type_profile');
const photoTemplate = document.querySelector('#photo-template').content;
const photoContainer = document.querySelector('.photo__container');

//создание классов
const formValidationPlace = new FormValidator(formValidationConfig, popupFormPlace);
formValidationPlace.enabledValidationForm();
const formValidationProfile = new FormValidator(formValidationConfig, popupFormProfile);
formValidationProfile.enabledValidationForm();


//функции
function openPopup(popup) {
   popup.classList.add('popup_active');
   popup.addEventListener('mousedown', listenerClickOverley);
   document.addEventListener('keydown', handlePopupCloseEsc);
   formValidationProfile.checkValidation();
}

function closePopup(popup) {
   popup.classList.remove('popup_active');
   popup.removeEventListener('mousedown', listenerClickOverley);
   document.removeEventListener('keydown', handlePopupCloseEsc);

}

function listenerClickOverley(evt) {
   if (evt.target === evt.currentTarget) {
      const popupАctive = document.querySelector('.popup_active');
      closePopup(popupАctive);
   }
}

function handlePopupCloseEsc(evt) {
   if (evt.key === 'Escape') {
      const popupАctive = document.querySelector('.popup_active');
      closePopup(popupАctive);
   }
};

function handleOpenPopupPhoto(evt) {
   popupPhotoImg.src = evt.target.src;
   popupPhotoName.alt = evt.target.alt;
   popupPhotoName.textContent = evt.target.nextElementSibling.textContent;
   openPopup(popupPhoto);
}

function handleOpenPopupProfile() {
   popupProfileName.value = profileName.textContent;
   popupProfileProfession.value = profileSubName.textContent;
   openPopup(popupProfile);
}

function handleChangePopupProfile(evt) {
   evt.preventDefault();
   profileName.textContent = popupProfileName.value;
   profileSubName.textContent = popupProfileProfession.value;
   closePopup(popupProfile);
}

function createNewCard(Data) {
   const card = new Card(Data, photoTemplate, handleOpenPopupPhoto);
   photoContainer.prepend(card.createCard());
}

function handleAddNewCard(evt) {
   evt.preventDefault();
   const newCardData = {
      name: popupPlaceName.value,
      link: popupPlaceLink.value
   };
   createNewCard(newCardData);
   popupPlaceName.value = '';
   popupPlaceLink.value = '';
   closePopup(popupPlace);
}

initialCards.forEach((arrayElement) => {
   createNewCard(arrayElement);
});

//слушатели
btnEditProfile.addEventListener('click', (evt) => {
   handleOpenPopupProfile(evt);
   formValidationProfile.enabledValidationForm();
});
formProfile.addEventListener('submit', handleChangePopupProfile);
btnAddCard.addEventListener('click', () => {
   openPopup(popupPlace);
   formValidationPlace.toggleButton();
});
formPlace.addEventListener('submit', handleAddNewCard);
btnCloseAll.forEach(function (buttonClose) {
   buttonClose.addEventListener('click', function (evt) {
      closePopup(evt.target.closest('.popup'));
   })
})









