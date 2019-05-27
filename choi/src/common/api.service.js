import { auth } from './firebase.js'
export const ApiService = {
  login (id, pw) {

  },
  logout () {

  },
  register (data) {
    return auth.createUserWithEmailAndPassword(data.id, data.pw)
  },
  getUserAll () {

  },
  getUser () {

  }
}
