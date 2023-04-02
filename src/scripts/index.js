//импорты
import '../pages/index.css';
import { FormValidator } from './components/FormValidator.js';
import { Card } from './components/Card.js';
import { buttonSubmitPlace, buttonSubmitProfile, buttonSubmitAvatar, btnEditAvatar, popupConfirmation, popupAvatar, formValidationConfig, popupFormAvatar, profileAvatar, popupPlace, popupPhoto, profileSubName, popupProfileProfession, profileName, popupProfileName, popupProfile, btnEditProfile, btnAddCard, popupFormProfile, popupFormPlace, photoContainer, photoTemplate } from './utils/constants.js';
import { Section } from './components/Section.js';
import PopupWithConfirm from './components/PopupWithConfirm.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import Api from './api/api.js';
import ReloudButton from './components/ReloudButton.js';


//экземпляры классов изменения кнопки submit
const reloudButtonProfile = new ReloudButton(buttonSubmitProfile);
const reloudButtonPlace = new ReloudButton(buttonSubmitPlace);
const reloudButtonAvatar = new ReloudButton(buttonSubmitAvatar);

//массив данных пользователя(позже его заполним при получении данных с сервера)
const userData = {}

//api данных карточек
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-62/',
  headers: {
    authorization: 'b1a969d4-2380-4487-99eb-f12d66954c40'
  }
});

//функция очищает контейнер карточек и занового его рендерит
function clearAndRenderCards() {
  api.getDataCards().then((result) => {
    photoContainer.innerHTML = ""
    section.renderItems(result);
  });
}
//первый рендер карточек при запуске страницы
clearAndRenderCards();

//экземпляр секции с рендером карточек
const section = new Section({
  renderer: (item) => {
    createCard(item);
  }
}, photoContainer);

//экземпляр класса PopupWithConfirm
const popupRemoveCard = new PopupWithConfirm(
  popupConfirmation, api, clearAndRenderCards);

//вешаем слушатели на попап popupClassProfile
popupRemoveCard.setEventLesteners();

//функция создания карточки
function createCard(item) {
  const card = new Card(item, photoTemplate,
    () => {
      popupImage.open(item);
    }, api, popupRemoveCard
  );
  section.addItem(card.createCard(userData));
}

//api получения данных профиля
api.getDataProfile().then((result) => {
  userInfo.setUserInfo(result);
})

//валидация
const formValidationPlace = new FormValidator(formValidationConfig, popupFormPlace);
formValidationPlace.enabledValidationForm();
const formValidationProfile = new FormValidator(formValidationConfig, popupFormProfile);
formValidationProfile.enabledValidationForm();
const formValidationAvatar = new FormValidator(formValidationConfig, popupFormAvatar);
formValidationAvatar.enabledValidationForm();

//экземпляр класса попапа создания карточек
const popupImage = new PopupWithImage(popupPhoto);

//вешаем слушатели крестика, оверлея и сабмита
popupImage.setEventLesteners();

//экземпляр класса UserInfo,необходим для получения данных из полей инпутов
const userInfo = new UserInfo(profileName, profileSubName, profileAvatar, userData);

//экземпляр класса PopupWithForm
const popupClassProfile = new PopupWithForm(
  popupProfile,
  {
    submitForm: (data) => {
      api.patchDataProfile(data, reloudButtonProfile).then((result) => {
        userInfo.setUserInfo(result)
      })
    }
  }
);

//вешаем слушатели на попап popupClassProfile
popupClassProfile.setEventLesteners();

//экземпляр класса PopupWithForm
const popupEditAvatar = new PopupWithForm(
  popupAvatar,
  {
    submitForm: (data) => {
      api.patchAvatarProfile(data, reloudButtonAvatar).then((result) => { userInfo.setUserInfo(result) })
    }
  }
);

//вешаем слушатели на попап popupClassProfile
popupEditAvatar.setEventLesteners();

// экземпляр класса popupFormPhoto
const popupFormPhoto = new PopupWithForm(
  popupPlace,
  {
    submitForm: (item) => {
      api.postNewCard(item, reloudButtonPlace).then(() => {
        clearAndRenderCards();
      });
    }
  }
);

//вешаем слушатели на попап popupFormPhoto
popupFormPhoto.setEventLesteners();

//слушатель событий кнопки редактирования аватара
btnEditAvatar.addEventListener('click', () => {
  popupEditAvatar.open();
  formValidationAvatar.toggleButton();
  formValidationAvatar.checkValidation();
})

//слушатель событий кнопки редактирования профиля
btnEditProfile.addEventListener('click', () => {
  popupProfileName.value = userInfo.getUserInfo().name;
  popupProfileProfession.value = userInfo.getUserInfo().about;
  popupClassProfile.open();
  formValidationProfile.toggleButton();
  formValidationProfile.checkValidation();
});

// слушатель событий кнопки добавления карточки
btnAddCard.addEventListener('click', () => {
  popupFormPhoto.open();
  formValidationPlace.toggleButton();
  formValidationPlace.checkValidation();
});






