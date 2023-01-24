//variables
const popupProfile = document.querySelector('.popup_type_profile');
const btnEditProfile = document.querySelector('.profile__button-edit');
const popupProfileName = document.querySelector('.popup__text_type_name-profile');
const popupProfileProfession = document.querySelector('.popup__text_type_profession-profile');
const profileName = document.querySelector('.profile__name');
const profileSubName = document.querySelector('.profile__subname');
const bodywork = document.querySelector('.bodywork');
const btnCloseAll = bodywork.querySelectorAll('.btn-close');
const formProfile = document.forms.profileForm;
const formPlace = document.forms.placeForm;
const btnAddCard = document.querySelector('.profile__button-add');
const popupPlace = document.querySelector('.popup_type_place');
const photoTemplate = document.querySelector('#photo-template').content;
const photoContainer = document.querySelector('.photo__container');
const popupPhoto = document.querySelector('.popup_type_photo');
const popupPhotoImg = document.querySelector('.popup__img');
const popupPhotoName = document.querySelector('.popup__name');
const popupPlaceName = popupPlace.querySelector('.popup__text_type_name-place');
const popupPlaceLink = popupPlace.querySelector('.popup__text_type_link-place');
const photoElement = photoTemplate.querySelector('.photo__element');

//funcstions
const openPopup = function (popup) {
   popup.classList.add('popup_active');
}

const closePopup = function (popup) {
   popup.classList.remove('popup_active');
}

function handleOpenPopupPhoto(evt) {
   openPopup(popupPhoto);
   popupPhotoImg.src = evt.target.src;
   popupPhotoName.alt = evt.target.alt;
   popupPhotoName.textContent = evt.target.nextElementSibling.textContent;
}

function handleOpenPopupProfile() {
   openPopup(popupProfile);
   popupProfileName.value = profileName.textContent;
   popupProfileProfession.value = profileSubName.textContent;
}

function handleChangePopupProfile(evt) {
   evt.preventDefault();
   profileName.textContent = popupProfileName.value;
   profileSubName.textContent = popupProfileProfession.value;
   closePopup(popupProfile);
}

function handleAddNewCard(evt) {
   evt.preventDefault();
   const newCard = {
      name: popupPlaceName.value,
      link: popupPlaceLink.value
   };
   closePopup(popupPlace);
   popupPlaceName.value = '';
   popupPlaceLink.value = '';
   addNewCard(newCard);
}


function createCard(cardData) {
   const photoElementClone = photoElement.cloneNode(true);
   const cardPhoto = photoElementClone.querySelector('.photo__img');
   cardPhoto.src = cardData.link;
   cardPhoto.alt = cardData.name;
   photoElementClone.querySelector('.photo__title').textContent = cardData.name;
   cardPhoto.addEventListener('click', handleOpenPopupPhoto);
   const photoDelete = photoElementClone.querySelector('.photo__delete');
   photoDelete.addEventListener('click', () => {
      photoElementClone.remove();
   });
   const photoLike = photoElementClone.querySelector('.photo__like');
   photoLike.addEventListener('click', () => {
      photoLike.classList.toggle('photo__like_active');
   });
   return photoElementClone;
};

function addNewCard(cardData) {
   photoContainer.prepend(createCard(cardData));
};

initialCards.forEach(function (arrayElement) { addNewCard(arrayElement) });

//listeners
btnEditProfile.addEventListener('click', handleOpenPopupProfile);
formProfile.addEventListener('submit', handleChangePopupProfile);
btnAddCard.addEventListener('click', function () { openPopup(popupPlace) });
formPlace.addEventListener('submit', handleAddNewCard);
btnCloseAll.forEach(function (buttonClose) {
   buttonClose.addEventListener('click', function (evt) {
      closePopup(evt.target.closest('.popup'));
   })
})
