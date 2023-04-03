export default class UserInfo {
  constructor(nameProfile, subNameProfile, profileAvatar, userDataServer) {
    this._nameProfile = nameProfile;
    this._subNameProfile = subNameProfile;
    this._profileAvatar = profileAvatar;
    this._userDataServer = userDataServer;
  }

  getUserInfo() {
    this._dataList = {};
    this._dataList['name'] = this._nameProfile.textContent;
    this._dataList['about'] = this._subNameProfile.textContent;
    this._dataList['avatar'] = this._profileAvatar.src;
    return this._dataList;
  }

  setUserInfo(data) {
    this._userDataServer.data = data;
    this._nameProfile.textContent = data.name;
    this._subNameProfile.textContent = data.about;
    this._profileAvatar.src = data.avatar;
  }

};


