//variables
const popupProfile = document.querySelector('.popup_type_profile');
const btnEditProfile = document.querySelector('.profile__button-edit');
const popupProfileName = document.querySelector('.popup__text_type_name_profile');
const popupProfileProfession = document.querySelector('.popup__text_type_profession_profile');
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
const popupPlaceName = popupPlace.querySelector('.popup__text_type_name_place');
const popupPlaceLink = popupPlace.querySelector('.popup__text_type_link_place');
const photoElement = photoTemplate.querySelector('.photo__element');

//funcstions
btnCloseAll.forEach(function (buttonClose) {
   buttonClose.addEventListener('click', function (evt) {
      evt.target.closest('.popup').classList.remove('popup_active');
   })
})

const handleOpenOrClosePopup = function (popup) {
   popup.classList.toggle('popup_active');
}

function handleOpenPopupPhoto(evt) {
   handleOpenOrClosePopup(popupPhoto);
   popupPhotoImg.src = evt.target.src;
   popupPhotoName.alt = evt.target.alt;
   popupPhotoName.textContent = evt.target.nextElementSibling.textContent;
}

function handleOpenPopupProfile() {
   handleOpenOrClosePopup(popupProfile);
   popupProfileName.value = profileName.textContent;
   popupProfileProfession.value = profileSubName.textContent;
}

function handleChangePopupProfile(evt) {
   evt.preventDefault();
   profileName.textContent = popupProfileName.value;
   profileSubName.textContent = popupProfileProfession.value;
   handleOpenOrClosePopup(popupProfile);
}

function handleAddNewCard(evt) {
   evt.preventDefault();
   const newCard = {
      name: `${popupPlaceName.value}`,
      link: `${popupPlaceLink.value}`
   };
   handleOpenOrClosePopup(evt.target.closest('.popup'));
   popupPlaceName.value = '';
   popupPlaceLink.value = '';
   addNewCard(newCard);
}


function createCard(item) {
   const photoElementClone = photoElement.cloneNode(true);
   const cardPhoto = photoElementClone.querySelector('.photo__img');
   cardPhoto.src = item.link;
   cardPhoto.alt = item.name;
   photoElementClone.querySelector('.photo__title').textContent = item.name;
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

function addNewCard(card) {
   photoContainer.prepend(createCard(card));
};

initialCards.forEach(function (item) { addNewCard(item) });

//listeners
btnEditProfile.addEventListener('click', handleOpenPopupProfile);
formProfile.addEventListener('submit', handleChangePopupProfile);
btnAddCard.addEventListener('click', function () { handleOpenOrClosePopup(popupPlace) });
formPlace.addEventListener('submit', handleAddNewCard);
