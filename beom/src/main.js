// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 파이어베이스
import firebase from 'firebase'

// 구글 매터리얼 디자인
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)

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

// 전역변수 설정
Vue.prototype.$db = firebase.firestore();
Vue.prototype.$auth = firebase.auth();
Vue.prototype.$googleProvider = new firebase.auth.GoogleAuthProvider();
Vue.prototype.$rootCol = "Users";

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
