import { auth, googleProvider } from './firebase.js'
export const ApiService = {
  login (data) {
    return auth.signInWithEmailAndPassword(data.id, data.pw)
  },
  googleLogin (data) {
    return auth.signInWithPopup(googleProvider)
  },
  logout () {
    return auth.signOut()
  },
  register (data) {
    return auth.createUserWithEmailAndPassword(data.id, data.pw)
  },
  getUserAll () {

  },
  getUser () {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged((user) => {
        if (user) resolve(auth.currentUser)
        else resolve('')
      })
    })
  }
}
