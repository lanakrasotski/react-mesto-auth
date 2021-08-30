class Api {
  constructor(config){
    this._url = config.url;
    this._headers = config.headers;
    this.deleteCard = this.deleteCard.bind(this);
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }  
    return Promise.reject(`Error: ${res.status}`)
  }
  
  getUserInfo(){
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
    .then(this._getResponse);
  }

  editUserInfo(data){
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH', 
      headers: this._headers,
      body: JSON.stringify({
       name: data.name,
       about: data.about
      })
    })
    .then(this._getResponse);
  }

  editAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH', 
      headers: this._headers,
      body: JSON.stringify({
       avatar: link
      })
    })
    .then(this._getResponse);
  }

  getAllCards(){
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
    .then(this._getResponse);
  } 

  addNewCard(data){
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
       })
    })
    .then(this._getResponse);
  }

  deleteCard(id){
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE', 
      headers: this._headers
    })
    .then(this._getResponse)
  }

  addLike(id){
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'PUT', 
      headers: this._headers
    })
    .then(this._getResponse)
  }

  deleteLike(id){
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'DELETE', 
      headers: this._headers
    })
    .then(this._getResponse)
  }
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-25', 
  headers: {
    authorization: 'da3dbb19-182a-4f56-b817-08636548168f',
    'Content-type': 'application/json'
  }
})

export default api;