export default class UserInfo {
  constructor(nameProfile, subNameProfile, profileAvatar, userData) {
    this._nameProfile = nameProfile;
    this._subNameProfile = subNameProfile;
    this._profileAvatar = profileAvatar;
    this._userData = userData;
  }

  getUserInfo() {
    this._dataList = {};
    this._dataList['name'] = this._nameProfile.textContent;
    this._dataList['about'] = this._subNameProfile.textContent;
    return this._dataList;
  }

  setUserInfo(data) {
    this._userData.data = data;
    this._nameProfile.textContent = data.name;
    this._subNameProfile.textContent = data.about;
    this._profileAvatar.src = data.avatar;
  }

};


