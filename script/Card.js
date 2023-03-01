//класс создания карточек
export class Card {
   static _photoContainer = document.querySelector('.photo__container');


   constructor(data, template, handleOpenPopupPhoto, formValidationPlace) {
      this._cardData = data;
      this._photoTemplate = template;
      this._handleOpenPopupPhoto = handleOpenPopupPhoto;
      this._formValidationPlace = formValidationPlace;
   }
   //публичный метод генерации карточки
   createCard() {
      this._photoElement = this._photoTemplate.querySelector('.photo__element');
      this._photoElementClone = this._photoElement.cloneNode(true);
      this._cardPhoto = this._photoElementClone.querySelector('.photo__img');
      this._cardPhoto.src = this._cardData.link;
      this._cardPhoto.alt = this._cardData.name;
      this._cardTitle = this._photoElementClone.querySelector('.photo__title');
      this._cardTitle.textContent = this._cardData.name;
      this._photoDelete = this._photoElementClone.querySelector('.photo__delete');
      this._photoLike = this._photoElementClone.querySelector('.photo__like');
      this._addInputListners();
      this._validation();
      this._addNewCard();
   };
   //метод валидации карточки
   _validation() {
      this._formValidationPlace.toggleButton();
   }
   //метод слушателей нажатий
   _addInputListners() {

      this._cardPhoto.addEventListener('click', this._handleOpenPopupPhoto);

      this._photoDelete.addEventListener('click', () => {
         this._removeCard();
      });

      this._photoLike.addEventListener('click', () => {
         this._cardLike();
      });
   }
   //метод удаление карточки
   _removeCard() {
      this._photoElementClone.remove();
   }
   //метод лайка карточки
   _cardLike() {
      this._photoLike.classList.toggle('photo__like_active');
   }
   //метод добавления карточки в контейнер
   _addNewCard() {
      Card._photoContainer.prepend(this._photoElementClone);
   };

}









