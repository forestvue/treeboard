// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyC_bQgvZYtcQjwmmXR2I1YfyZLM7P1t9tQ",
  authDomain: "forestvue-8424e.firebaseapp.com",
  databaseURL: "https://forestvue-8424e.firebaseio.com",
  projectId: "forestvue-8424e",
  storageBucket: "forestvue-8424e.appspot.com",
  messagingSenderId: "183393322822",
  appId: "1:183393322822:web:fe44e34d23c90b42"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.prototype.$db = firebase.firestore();
Vue.prototype.$auth = firebase.auth();

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
