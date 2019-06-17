// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App';
import router from './router';
import VeeValidate from "vee-validate";

Vue.config.productionTip = false;
//첫번째가 validation을 적용시킬 필드에 대한 정보
//2번째가 필드에 어떤 룰을 적용할 것인지 하는 validation rule
//마지막으로 모든 fields의 error 를 기록한 error-bag.
Vue.use(VeeValidate);

VeeValidate.Validator.extend('password-verify', {
  getMessage : field => `${field} should include lower case, numeric digit, 
  special character(!@#$%^?&*).`,
  validate: value => {
    const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^?&*])(?=.{8,})");
    return passwordRegex.test(value);
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

const EventBus = new Vue();

export default EventBus;
