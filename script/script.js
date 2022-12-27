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

function changeProfile(evt) {
   evt.preventDefault();

   let name = popupContainer.querySelector('.popup__text_type_name').value;
   document.querySelector('.profile__name').textContent = name;

   let profession = popupContainer.querySelector('.popup__text_type_profession').value;
   document.querySelector('.profile__subname').textContent = profession;
   closePopap();
}

popupSubmitBtn.addEventListener('click', changeProfile);
buttonEdit.addEventListener('click', openPopap);
popupClose.addEventListener('click', closePopap);


