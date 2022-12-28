let content = document.querySelector('.content');
let profile = content.querySelector('.profile');
let buttonEdit = profile.querySelector('.profile__button-edit');
let buttonAdd = profile.querySelector('.profile__button-add');
let popup = document.querySelector('.popup');
let popupContainer = popup.querySelector('.popup__container');
let popupSubmitBtn = popup.querySelector('.popup__submit-btn');
let popupClose = popup.querySelector('.popup__close');
let name = popupContainer.querySelector('.popup__text_type_name');
let profession = popupContainer.querySelector('.popup__text_type_profession');
let form = document.forms.profileForm;

function openPopap() {
   popup.classList.add('popup_opened');
   name.value = document.querySelector('.profile__name').textContent;
   profession.value = document.querySelector('.profile__subname').textContent;
}

function closePopap() {
   popup.classList.remove('popup_opened');
}

function changeProfile(evt) {
   evt.preventDefault();
   document.querySelector('.profile__name').textContent = name.value;
   document.querySelector('.profile__subname').textContent = profession.value;
   closePopap();
}

form.addEventListener('submit', changeProfile);
buttonEdit.addEventListener('click', openPopap);
popupClose.addEventListener('click', closePopap);
