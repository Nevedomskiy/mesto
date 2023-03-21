//импорты
import '../pages/index.css';
import { FormValidator } from './components/FormValidator.js';
import { Card } from './components/Card.js';
import { initialCards, formValidationConfig, popupPlace, popupPhoto, profileSubName, popupProfileProfession, profileName, popupProfileName, popupProfile, btnEditProfile, btnAddCard, popupPhotoImg, popupFormProfile, popupFormPlace, photoContainer, popupPhotoName, photoTemplate } from './utils/constants.js';
import { Section } from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';

//валидация
const formValidationPlace = new FormValidator(formValidationConfig, popupFormPlace);
formValidationPlace.enabledValidationForm();
const formValidationProfile = new FormValidator(formValidationConfig, popupFormProfile);
formValidationProfile.enabledValidationForm();

//экземпляр класса попапа создания карточек
const popupImage = new PopupWithImage(popupPhoto);

//вешаем слушатели крестика, оверлея и сабмита
popupImage.setEventLesteners();

//функция создания нового экземпляра класса Card и добавления его в конетйнер
function createCard(item) {
   const card = new Card(item, photoTemplate,
      () => {
         popupImage.open(item);;
      }
   );
   section.addItem(card.createCard());
}

//экземпляр класса Section который использует функцию создания карточки createCard для создания новоых карточек
const section = new Section({
   items: initialCards, renderer: (item) => {
      createCard(item);
   }
}, photoContainer);
section.renderItems();

//экземпляр класса UserInfo,необходим для получения данных из полей инпутов
const userInfo = new UserInfo(profileName, profileSubName);

//экземпляр класса PopupWithForm
const popupClassProfile = new PopupWithForm(
   popupProfile,
   {
      submitForm: (data) => {
         userInfo.setUserInfo(data);
      }
   }
);

//вешаем слушатели на попап popupClassProfile
popupClassProfile.setEventLesteners();

//экземпляр класса popupFormPhoto
const popupFormPhoto = new PopupWithForm(
   popupPlace,
   {
      submitForm: (item) => {
         createCard(item);
      }
   }
);

//вешаем слушатели на попап popupFormPhoto
popupFormPhoto.setEventLesteners();

//слушатель событий кнопки редактирования профиля
btnEditProfile.addEventListener('click', () => {
   popupProfileName.value = userInfo.getUserInfo().name;
   popupProfileProfession.value = userInfo.getUserInfo().profession;
   popupClassProfile.open();
   formValidationProfile.toggleButton();
   formValidationProfile.checkValidation();
});

//слушатель событий кнопки добавления карточки
btnAddCard.addEventListener('click', () => {
   popupFormPhoto.open();
   formValidationPlace.toggleButton();
   formValidationPlace.checkValidation();
});






