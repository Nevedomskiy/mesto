//класс создания карточек
export class Card {
  constructor(data, template, userId, handleImageClick, like, dislike, { render: getCallbackData }) {
    this._cardData = data;
    this._photoTemplate = template;
    this._handleImageClick = handleImageClick;
    this._like = like;
    this._dislike = dislike;
    this._userId = userId;
    this._handleButtonDelete = getCallbackData;
  }

  //метод генерации карточки
  createCard() {
    this._photoElement = this._photoTemplate.querySelector('.photo__element');
    this._photoElementClone = this._photoElement.cloneNode(true);
    this._cardPhoto = this._photoElementClone.querySelector('.photo__img');
    this._cardPhoto.src = this._cardData.link;
    this._cardPhoto.alt = this._cardData.name;
    this._cardTitle = this._photoElementClone.querySelector('.photo__title');
    this._cardTitle.textContent = this._cardData.name;
    this._photoDelete = this._photoElementClone.querySelector('.photo__delete');
    if (this._userId !== this._cardData.owner._id) {
      this._photoDelete.classList.add('photo__delete_hidden');
    };
    this._photoLike = this._photoElementClone.querySelector('.photo__like');
    if (this._cardData.likes.find(element => element._id == this._userId)) {
      this.editClassLike();
    };
    this._photoLikeCounter = this._photoElementClone.querySelector('.photo__like-counter');
    this.handleLikeCounter(this._cardData.likes.length);
    this._setEventListeners();
    return this._photoElementClone;
  };

  //метод слушателей нажатий
  _setEventListeners() {
    this._cardPhoto.addEventListener('click', this._handleImageClick);

    this._photoDelete.addEventListener('click', () => {
      this._handleButtonDelete();
    });

    this._photoLike.addEventListener('click', () => {
      this._handleLikeClick();
    });
  }

  //метод удаления карточки
  deleteCard() {
    this._photoElementClone.remove();
  }

  //медод изменения стиля лайка
  editClassLike() {
    this._photoLike.classList.toggle('photo__like_active');
  }

  //медод присвоения количества лайков
  handleLikeCounter(number) {
    this._photoLikeCounter.textContent = number;
  }

  //метод лайка карточки
  _handleLikeClick() {
    if (!this._photoLike.classList.contains("photo__like_active")) {
      this._like();
    }
    else {
      this._dislike();
    }
  }
}
