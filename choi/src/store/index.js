import Vue from 'vue'

const globalLock = new Vue({
  data: {
    lock: false
  }
})
export { globalLock }
