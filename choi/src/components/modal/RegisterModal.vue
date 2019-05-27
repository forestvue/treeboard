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
    <button v-on:click="check">register</button>
  </div>
</template>

<script>
// import { ApiService } from '../../common/api.service'

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
        .then(console.log('success'))
        .catch(this.errorHandler)
    },
    check: function (id, pw) {
      let email = /[^@]+@[^.]+\..+/
      let password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
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
    errorHandler: function (msg) {
      switch (msg) {
        case 'email':
          this.message = '이메일이 형식에 맞지 않습니다.'
          break
        case 'password':
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
