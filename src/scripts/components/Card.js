//класс создания карточек
export class Card {
  constructor(data, template, handleOpenPopupPhoto, api, popupRemoveCard) {
    this._cardData = data;
    this._photoTemplate = template;
    this._handleOpenPopupPhoto = handleOpenPopupPhoto;
    this._popupRemoveCard = popupRemoveCard;
    this._api = api;
  }

  //публичный метод генерации карточки
  createCard(userData) {
    this._userData = userData;
    this._photoElement = this._photoTemplate.querySelector('.photo__element');
    this._photoElementClone = this._photoElement.cloneNode(true);
    this._cardPhoto = this._photoElementClone.querySelector('.photo__img');
    this._cardPhoto.src = this._cardData.link;
    this._cardPhoto.alt = this._cardData.name;
    this._cardTitle = this._photoElementClone.querySelector('.photo__title');
    this._cardTitle.textContent = this._cardData.name;
    this._photoDelete = this._photoElementClone.querySelector('.photo__delete');
    if (this._userData.data._id === this._cardData.owner._id) {
      this._photoDelete.classList.remove('photo__delete_hidden');
    }
    else { this._photoDelete.classList.add('photo__delete_hidden'); };
    this._photoLike = this._photoElementClone.querySelector('.photo__like');
    if (this._cardData.likes.find(element => element._id == userData.data._id)) {
      this._photoLike.classList.add('photo__like_active');
    }
    else { this._photoLike.classList.remove('photo__like_active'); }
    this._photoLikeCounter = this._photoElementClone.querySelector('.photo__like-counter');
    this._photoLikeCounter.textContent = this._cardData.likes.length;
    this._addInputListners();
    return this._photoElementClone;
  };

  //метод слушателей нажатий
  _addInputListners() {

    this._cardPhoto.addEventListener('click', this._handleOpenPopupPhoto);

    this._photoDelete.addEventListener('click', () => {
      this._popupRemoveCard.open();
      this._popupRemoveCard.setEventLesteners(this._cardData, this._photoElementClone)
    });
    this._photoLike.addEventListener('click', () => {
      this._cardLike(this._userData);
    });
  }

  //метод лайка карточки
  _cardLike(userData) {
    this._photoLike.classList.toggle('photo__like_active');

    if (this._photoLike.classList.contains("photo__like_active")) {
      this._api.addLikes(this._cardData, userData).then((result) => {
        this._photoLikeCounter.textContent = result.likes.length
      })
    }
    else {
      this._api.deleteLikes(this._cardData, userData).then((result) => {
        this._photoLikeCounter.textContent = result.likes.length
      })
    }
  }
}
