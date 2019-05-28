import { auth, googleProvider, db } from './firebase.js'
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
  getCurrentUser () {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged((user) => {
        if (user) resolve(auth.currentUser)
        else resolve('')
      })
    })
  },
  getUserList () {
    return db.collection('choi_user').get()
  },
  findUser (uid) {
    return db.collection('choi_user').doc(uid)
      .get()
  },
  createUser (data) {
    return db.collection('choi_user').doc(data.uid).set({
      email: data.email,
      role: 'guest'
    })
  }
}
