<template>
  <div class="modal-content">
    <span class="close" v-on:click="closeModal">&times;</span>
    <h2> 회원가입하기</h2>
    <form class="register-form">
      <input type="email" autocomplete="on" v-model="id">
      <input type="password" autocomplete="off" v-model="pw">
      <div class="error-msg">
        {{message}}
      </div>
    </form>
    <button v-on:click="register">register</button>
  </div>
</template>

<script>
// import { ApiService } from '../../common/api.service'

import { ApiService } from '../../common/api.service'

export default {
  name: 'RegisterModal',
  data () {
    return {
      id: '',
      pw: '',
      message: ''
    }
  },
  methods: {
    closeModal: function () {
      this.$eventHub.$emit('closeModal')
    },
    register: function () {
      this.check(this.id, this.pw)
        .then(ApiService.register)
        .then(this.closeModal)
        .catch(this.errorHandler)
    },
    check: function (id, pw) {
      let email = /[^@]+@[^.]+\..+/
      let password = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      return new Promise((resolve, reject) => {
        if (!email.test(id)) {
          reject(new Error('email'))
        }
        if (!password.test(pw)) {
          reject(new Error('password'))
        }
        resolve({id, pw})
      })
    },
    errorHandler: function (error) {
      switch (error.message) {
        case 'email':
          this.message = '이메일이 형식에 맞지 않습니다.'
          break
        case 'password':
          this.message = '비밀번호가 형식에 맞지 않습니다.'
          break
      }
      switch (error.code) {
        case 'auth/email-already-in-use':
          this.message = '이미 등록된 계정입니다.'
          break
        case 'auth/invalid-email':
          this.message = '이메일이 형식에 맞지 않습니다.'
          break
        case 'auth/weak-password':
          this.message = '비밀번호가 형식에 맞지 않습니다.'
          break
      }
    }
  }
}
</script>

<style scoped>
  .register-form{
  }
  .register-form input{
    display: block;
    margin: auto;
  }
  .error-msg{
    background-color: #fff1ff;
    color: #ff0000;
  }
</style>
