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
  getCurrentUser (func) {
    auth.onAuthStateChanged((user) => {
      func(user)
    })
  },
  getUserList () {
    return db.collection('choi_user').get()
  },
  getGuests () {
    return db.collection('choi_user').where('role', '==', 'guest').get()
  },
  watchGuests (func) {
    return db.collection('choi_user').where('role', '==', 'guest')
      .onSnapshot(func)
  },
  watchAdmins (func) {
    return db.collection('choi_user').where('role', '==', 'admin')
      .onSnapshot(func)
  },
  getAdmins () {
    return db.collection('choi_user').where('role', '==', 'admin').get()
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
  },
  updateUser (uid, role) {
    return db.collection('choi_user').doc(uid).update({
      role: role
    })
  }
}
