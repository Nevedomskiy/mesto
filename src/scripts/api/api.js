export default class Api {
  constructor(config) {
    this._url = config.url;
    this._authorization = config.headers.authorization
  }

  //получение данных карточек
  getDataCards() {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: this._authorization
      }
    })
      .then((res) => {
        if (res.ok) { return res.json() }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //получение данных пользователя
  getDataProfile() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: this._authorization
      }
    })
      .then((res) => {
        if (res.ok) { return res.json() }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //редактирование данных пользователя
  patchDataProfile(data, reloudButtonProfile) {
    this._reloudButtonProfile = reloudButtonProfile;
    this._reloudButtonProfile.hiddenButton();
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: this._authorization
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then((res) => {
        if (res.ok) { return res.json() }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => { this._reloudButtonProfile.unhiddenButton() })
  }

  //редактирование аватара
  patchAvatarProfile(data, reloudButtonAvatar) {
    this._reloudButtonAvatar = reloudButtonAvatar;
    this._reloudButtonAvatar.hiddenButton();
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: this._authorization
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then((res) => {
        if (res.ok) { return res.json() }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => { this._reloudButtonAvatar.unhiddenButton() })
  }

  //создание новой карточки
  postNewCard(data, reloudButtonPlace) {
    this._reloudButtonPlace = reloudButtonPlace;
    this._reloudButtonPlace.hiddenButton();
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: this._authorization
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then((res) => {
        if (res.ok) { return res.json() }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => { this._reloudButtonPlace.unhiddenButton() })
  }

  //удаление карточки
  deleteCard(data) {
    return fetch(`${this._url}cards/${data._id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: this._authorization
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //добавление лайка
  addLikes(data, userData) {
    return fetch(`${this._url}cards/${data._id}/likes`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        authorization: this._authorization
      },
      body: JSON.stringify({
        data: userData.data
      })
    })
      .then((res) => {
        if (res.ok) { return res.json() }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //удаление лайка
  deleteLikes(data, userData) {
    return fetch(`${this._url}cards/${data._id}/likes/`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: this._authorization
      }, body: JSON.stringify({
        data: userData.data
      })
    })
      .then((res) => {
        if (res.ok) { return res.json() }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}


