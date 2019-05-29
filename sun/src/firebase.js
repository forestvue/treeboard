import firebase from "firebase";
import "firebase/firestore";

const config = {
    apiKey: "AIzaSyC_bQgvZYtcQjwmmXR2I1YfyZLM7P1t9tQ",
    authDomain: "forestvue-8424e.firebaseapp.com",
    databaseURL: "https://forestvue-8424e.firebaseio.com",
    projectId: "forestvue-8424e",
    storageBucket: "forestvue-8424e.appspot.com",
    messagingSenderId: "183393322822",
    appId: "1:183393322822:web:2c81a29118a3ba97"
};

firebase.initializeApp(config);

const db=firebase.firestore();
const auth=firebase.auth();
const currentUser =auth.currentUser;
const usersCollection=db.collection("sun_users");

export {
    db, auth, currentUser, usersCollection
}
