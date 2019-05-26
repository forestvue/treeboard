import { auth } from './firebase.js'
export const ApiService = {
  login (id, pw) {

  },
  logout () {

  },
  register (email, password) {
    auth.createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  getUserAll () {

  },
  getUser () {

  }
}
