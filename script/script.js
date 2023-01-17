const popapProfile = document.querySelector('.popup-profile');
const btEditProfle = document.querySelector('.profile__button-edit');
const popapProfileName = document.querySelector('.popup-profile__text_type_name');
const popapProfileProfession = document.querySelector('.popup-profile__text_type_profession');
const profileName = document.querySelector('.profile__name');
const profileSubname = document.querySelector('.profile__subname');
const bodywork = document.querySelector('.bodywork');
const btClose = bodywork.querySelector('.bt-close');
const btCloseAll = bodywork.querySelectorAll('.bt-close');
const formProfile = document.forms.profileForm;
const formPlace = document.forms.placeForm;
const btAddCard = document.querySelector('.profile__button-add');
const popapPlace = document.querySelector('.popup-place');
const photoTemplate = document.querySelector('#photo-template').content;
const photoElements = document.querySelector('.photo__elements');
const popapPhoto = document.querySelector('.popup-photo');
const popupPhotoImg = document.querySelector('.popup-photo__img');
const popupPhotoName = document.querySelector('.popup-photo__name');
const initialCards = [
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

btEditProfle.addEventListener('click', openPopapProfile);
formProfile.addEventListener('submit', changePopapProfile);
btAddCard.addEventListener('click', openPopapPlace);
formPlace.addEventListener('submit', addNewCard);

btCloseAll.forEach(function (btClose) {
   btClose.addEventListener('click', function (evt) {
      evt.target.parentElement.parentElement.classList.remove('popap-active');
   })
})

function openPopapPlace() {
   popapPlace.classList.add('popap-active');
}

function deleteCard(evt) {
   evt.target.parentElement.remove();
}

function openPopapPhoto(evt) {
   popapPhoto.classList.add('popap-active');
   popupPhotoImg.src = evt.target.src;
   popupPhotoName.alt = evt.target.alt;
   popupPhotoName.textContent = evt.target.nextElementSibling.textContent;
}

function openPopapProfile() {
   popapProfile.classList.add('popap-active');
   popapProfileName.value = profileName.textContent;
   popapProfileProfession.value = profileSubname.textContent;
}

function changePopapProfile(evt) {
   evt.preventDefault();
   profileName.textContent = popapProfileName.value;
   profileSubname.textContent = popapProfileProfession.value;
   evt.target.parentElement.parentElement.classList.remove('popap-active');
}

cardLike = function (evt) {
   evt.target.classList.toggle('photo__like_active');
}

function addNewCard(evt) {
   evt.preventDefault();
   const popapPlaceName = popapPlace.querySelector('.popup-place__text_type_name');
   const popapPlacelink = popapPlace.querySelector('.popup-place__text_type_link');
   newCard = [{
      name: `${popapPlaceName.value}`,
      link: `${popapPlacelink.value}`
   }];
   evt.target.parentElement.parentElement.classList.remove('popap-active');
   addCards(newCard);
   popapPlaceName.value = '';
   popapPlacelink.value = '';
}

function addCards(mas) {
   mas.forEach(function (item) {
      const photoElement = photoTemplate.querySelector('.photo__element').cloneNode(true);
      const cardPhoto = photoElement.querySelector('.photo__img');
      cardPhoto.src = item.link;
      cardPhoto.alt = item.name;
      photoElement.querySelector('.photo__title').textContent = item.name;
      photoElements.prepend(photoElement);
      cardPhoto.addEventListener('click', openPopapPhoto);
      const photoDelete = photoElement.querySelector('.photo__delete');
      photoDelete.addEventListener('click', deleteCard);
      const photoLike = photoElement.querySelector('.photo__like');
      photoLike.addEventListener('click', cardLike);
   });
}
addCards(initialCards);

