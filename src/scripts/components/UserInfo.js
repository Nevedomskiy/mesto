export default class UserInfo {
   constructor(nameProfile, subNameProfile) {
      this._nameProfile = nameProfile;
      this._subNameProfile = subNameProfile;
   }

   getUserInfo() {
      this._dataList = {};
      this._dataList['name'] = this._nameProfile.textContent;
      this._dataList['profession'] = this._subNameProfile.textContent;
      return this._dataList;
   }

   setUserInfo(data) {
      this._nameProfile.textContent = data.name;
      this._subNameProfile.textContent = data.profession;
   };

}
