import '../pages/index.css';
import { FormValidator } from './components/FormValidator.js';
import { Card } from './components/Card.js';
import { initialCards, formValidationConfig, popupPlace, popupPhoto, profileSubName, popupProfileProfession, profileName, popupProfileName, popupProfile, btnEditProfile, btnAddCard, popupPhotoImg, popupFormProfile, popupFormPlace, photoContainer, popupPhotoName, photoTemplate } from './utils/constants.js';
import { Section } from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';

const formValidationPlace = new FormValidator(formValidationConfig, popupFormPlace);
formValidationPlace.enabledValidationForm();
const formValidationProfile = new FormValidator(formValidationConfig, popupFormProfile);
formValidationProfile.enabledValidationForm();


function createNewCard(item) {
   const popupImage = new PopupWithImage(popupPhoto);
   popupImage.openPopup(item);
}

const section = new Section({
   items: initialCards, renderer: (item) => {
      const card = new Card(item, photoTemplate,
         () => {
            createNewCard(item);
         }
      );
      section.addItem(card.createCard());
   }
}, photoContainer);
section.renderItems();

const userInfo = new UserInfo(profileName, profileSubName);
const popupClassProfile = new PopupWithForm(
   popupProfile,
   {
      submitForm: (data) => {
         userInfo.setUserInfo(data);
      }
   }
);

btnEditProfile.addEventListener('click', () => {
   popupProfileName.value = userInfo.getUserInfo().name;
   popupProfileProfession.value = userInfo.getUserInfo().profession;
   popupClassProfile.openPopup();
   formValidationProfile.toggleButton();
   formValidationProfile.checkValidation();
});

const popupFormPhoto = new PopupWithForm(
   popupPlace,
   {
      submitForm: (item) => {
         const card = new Card(item, photoTemplate, {
            submitForm: (item) => {
               createNewCard(item);
            }
         }
         );
         section.addItem(card.createCard());
      }
   }
);

btnAddCard.addEventListener('click', () => {
   popupFormPhoto.openPopup();
   formValidationPlace.toggleButton();
   formValidationPlace.checkValidation();
});






