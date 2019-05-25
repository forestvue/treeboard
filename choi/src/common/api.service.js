import { auth } from 'firebase'

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
        // Handle Errors here.
        console.log(error)
      })
  },
  getUserAll () {

  },
  getUser () {

  }
}
