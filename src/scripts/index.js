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

//массив данных пользователя(позже его заполним при получении данных с сервера)
const userDataServer = {}

//api данных карточек
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-62/',
  headers: {
    authorization: 'b1a969d4-2380-4487-99eb-f12d66954c40'
  }
});

//экземпляр класса UserInfo,необходим для получения данных из полей инпутов
const userInfo = new UserInfo(profileName, profileSubName, profileAvatar, userDataServer);
const userDataHtml = userInfo.getUserInfo();


//экземпляр класса PopupWithConfirm
const popupRemoveCard = new PopupWithConfirm(
  popupConfirmation);

//вешаем слушатели на попап popupClassProfile
popupRemoveCard.setEventListeners();

//экземпляр секции с рендером карточек
const cardsSection = new Section({
  renderer: (cardData) => {
    renderCards(cardData)
  }
}, photoContainer);

Promise.all([api.getDataProfile(), api.getDataCards()]).then((result) => {
  userInfo.setUserInfo(result[0]);
  cardsSection.renderItems(result[1]);
})
  .catch((err) => {
    console.log(err);
  });

//функция рендера карточки
function renderCards(cardData) {
  cardsSection.addItem(createClassCard(cardData).createCard());
}

//функция создания экземпляра класса Card
function createClassCard(cardData) {
  const card = new Card(
    cardData,
    photoTemplate,
    userDataServer.data._id,
    () => {
      popupImage.open(cardData);
    },
    () => {
      api.addLikes(cardData._id)
        .then((result) => {
          card.editClassLike();
          card.handleLikeCounter(result.likes.length);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    ,
    () => {
      api.deleteLikes(cardData._id)
        .then((result) => {
          card.editClassLike();
          card.handleLikeCounter(result.likes.length);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    ,
    {
      render:
        () => {
          popupRemoveCard.open();
          popupRemoveCard.setCallback(
            () => {
              api.deleteCard(cardData._id)
                .then(() => {
                  card.deleteCard();
                  popupRemoveCard.close();
                })
                .catch((err) => {
                  console.log(err);
                })

            })

        }
    }
  );
  return card

}

//валидация
const formValidationPlace = new FormValidator(formValidationConfig, popupFormPlace);
formValidationPlace.enableValidation();
const formValidationProfile = new FormValidator(formValidationConfig, popupFormProfile);
formValidationProfile.enableValidation();
const formValidationAvatar = new FormValidator(formValidationConfig, popupFormAvatar);
formValidationAvatar.enableValidation();

//экземпляр класса попапа создания карточек
const popupImage = new PopupWithImage(popupPhoto);

//вешаем слушатели крестика, оверлея и сабмита
popupImage.setEventListeners();

//экземпляр класса PopupWithForm
const popupClassProfile = new PopupWithForm(
  popupProfile,
  {
    submitForm: (cardData) => {
      popupClassProfile.setSubmitButtonText('Сохранение...')
      api.patchDataProfile(cardData)
        .then((result) => {
          userInfo.setUserInfo(result);
          popupClassProfile.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => { popupClassProfile.setSubmitButtonText('Сохранить') })
    }
  }
);

//вешаем слушатели на попап popupClassProfile
popupClassProfile.setEventListeners();

//экземпляр класса PopupWithForm
const popupEditAvatar = new PopupWithForm(
  popupAvatar,
  {
    submitForm: (cardData) => {
      popupEditAvatar.setSubmitButtonText('Сохранение...');
      api.patchAvatarProfile(cardData)
        .then((result) => {
          userInfo.setUserInfo(result);
          popupEditAvatar.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => { popupEditAvatar.setSubmitButtonText('Сохранить'); })
    }
  }
);

//вешаем слушатели на попап popupClassProfile
popupEditAvatar.setEventListeners();

// экземпляр класса popupFormPhoto
const popupFormPhoto = new PopupWithForm(
  popupPlace,
  {
    submitForm: (cardData) => {
      popupFormPhoto.setSubmitButtonText('Сохранение...');
      api.postNewCard(cardData)
        .then((result) => {
          renderCards(result);
          popupFormPhoto.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => { popupFormPhoto.setSubmitButtonText('Сохранить'); });
    }
  }
);

//вешаем слушатели на попап popupFormPhoto
popupFormPhoto.setEventListeners();

//слушатель событий кнопки редактирования аватара
btnEditAvatar.addEventListener('click', () => {
  popupEditAvatar.open();
  formValidationAvatar.toggleButton();
  formValidationAvatar.checkValidation();
})

//слушатель событий кнопки редактирования профиля
btnEditProfile.addEventListener('click', () => {
  popupProfileName.value = userDataHtml.name;
  popupProfileProfession.value = userDataHtml.about;
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






