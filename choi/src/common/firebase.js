import Firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
const firebase = Firebase.initializeApp({
  authDomain: 'forestvue-8424e.firebaseapp.com',
  apiKey: 'AIzaSyC_bQgvZYtcQjwmmXR2I1YfyZLM7P1t9tQ',
  projectId: 'forestvue-8424e'
})
export const db = firebase.firestore()
export const auth = firebase.auth()
export const googleProvider = new Firebase.auth.GoogleAuthProvider()
