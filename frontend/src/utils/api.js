import {apiData} from './utils';

// класс АПИ
export class Api {
  constructor(config){
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if(res.ok){
      return res.json();
   }
   return Promise.reject(new Error ('Произошла ошибка со статус-кодом ' + res.status))
  }

 // получение информации пользователя с сервера
  getDatas(){
    return fetch(this._url + 'users/me', {
      headers: this._headers,
    })
    .then ( this._checkResponse);
  }

  // получение карточек с сервера
  getCards(){
    return fetch(this._url + 'cards', {
      headers: this._headers,
    })
    .then ( this._checkResponse);
  }

  // обновление данных пользователя на сервере
  setUserInfo(data){
    return fetch(this._url + 'users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
    .then ( this._checkResponse);
  }

  // добавление новой карточки на сервер
  postCards(data){
    return fetch(this._url + 'cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
    .then ( this._checkResponse);
  }

  // удаление
  deleteDatas(id){
    return fetch(this._url + 'cards/' + id, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then ( this._checkResponse);
  }

  // постановка и снятие лайка
  changeLikeCardStatus(id, isLiked){
  if(!isLiked){
    return fetch(this._url + 'cards/likes/' + id, {
      method: 'PUT',
      headers: this._headers,
    })
    .then ( this._checkResponse);
  }

  else{
    return fetch(this._url + 'cards/likes/' + id, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then ( this._checkResponse);
  }

  }

   // обновление аватара
   patchAvatar(data){
    return fetch(this._url + 'users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
    .then (this._checkResponse);
  }
}

const api = new Api(apiData);
export default api;
