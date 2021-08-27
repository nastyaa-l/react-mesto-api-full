export const BASE_URL = "https://auth.nomoreparties.co";

export class Auth {

  _checkResponse(res) {
    if(res.ok){
      return res.json();
   }
   return Promise.reject(new Error ('Произошла ошибка со статус-кодом ' + res.status))
}


  register (email, password){
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })

  .then(this._checkResponse)
}


login (email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(this._checkResponse)

};

checkToken (token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => res.json())

}
}

export const auth = new Auth();
