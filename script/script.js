let content = document.querySelector('.content');
let profile = content.querySelector('.profile');
let buttonEdit = profile.querySelector('.button_edit');
let buttonAdd = profile.querySelector('.button_add');
let popup = document.querySelector('.popup');
let popupContainer = popup.querySelector('.popup__container');
let popupSubmitBtn = popup.querySelector('.popup__submit-btn');
let popupClose = popup.querySelector('.popup__close');

function openPopap() {
   popup.classList.add('popup_opened');
}

function closePopap() {
   popup.classList.remove('popup_opened');
}

function likePhoto() {
   like.classList.add('photo__like_active');
}

function changeProfile() {
   let name = popupContainer.querySelector('.popup__text_type_name');
   let profession = popupContainer.querySelector('.popup__text_type_profession');
   let profileName = document.querySelector('.profile__name');
   let profileSubName = document.querySelector('.profile__subname');
   profileName.textContent = name.value;
   profileSubName.textContent = profession.value;
   name.value = "";
   profession.value = "";
}

popupSubmitBtn.addEventListener('click', changeProfile);
buttonEdit.addEventListener('click', openPopap);
popupClose.addEventListener('click', closePopap);


