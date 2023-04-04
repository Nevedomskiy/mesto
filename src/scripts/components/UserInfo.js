export default class UserInfo {
  constructor(nameProfile, subNameProfile, profileAvatar) {
    this._nameProfile = nameProfile;
    this._subNameProfile = subNameProfile;
    this._profileAvatar = profileAvatar;
  }

  setUserInfo(data) {
    this._nameProfile.textContent = data.name;
    this._subNameProfile.textContent = data.about;
    this._profileAvatar.src = data.avatar;
    this._idUser = data._id
  }

  getUserInfo() {
    this._dataList = {};
    this._dataList['name'] = this._nameProfile.textContent;
    this._dataList['about'] = this._subNameProfile.textContent;
    this._dataList['avatar'] = this._profileAvatar.src;
    this._dataList['id'] = this._idUser;
    return this._dataList;
  }
};


