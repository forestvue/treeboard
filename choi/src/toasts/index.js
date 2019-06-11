import Vue from 'vue'
import VuetifyToast from 'vuetify-toast-snackbar'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify)
Vue.use(VuetifyToast, {
  x: 'left', // default
  y: 'bottom', // default
  color: 'info', // default
  icon: 'info',
  timeout: 3000, // default
  dismissable: true, // default
  autoHeight: false, // default
  multiLine: false, // default
  vertical: false, // default
  shorts: {
    custom: {
      color: 'purple'
    }
  },
  property: '$toast' // default
})
