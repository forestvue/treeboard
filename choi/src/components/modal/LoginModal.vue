<template>
  <div class="modal-content">
    <span class="close" v-on:click="closeModal">&times;</span>
    <h2> 로그인 하기 </h2>
    <div class="member-login">
      <form>
        <input type="text" placeholder="ID" autocomplete="email" v-model="id">
        <input type="password" placeholder="Password" autocomplete="off" v-model="pw">
      </form>
      <div>
        <button v-bind:disabled="gLock" v-on:click="login" class="sky login-button">Login</button>
      </div>
    </div>
    <div class="error-msg">
      {{message}}
    </div>
    <button v-bind:disabled="gLock" class="google" v-on:click="googleLogin">구글로 로그인하기</button>
    <p>또는</p>
    <button v-bind:disabled="gLock" class="register" v-on:click="doRegister">회원가입 하기</button>
  </div>
</template>

<script>
import { ApiService } from '../../common/api.service'
import { globalLock } from '../../store'

export default {
  name: 'LoginModal',
  props: ['authInfo'],
  data () {
    return {
      localLock: globalLock.lock,
      id: '',
      pw: '',
      message: ''
    }
  },
  computed: {
    gLock: function () {
      return globalLock.lock
    }
  },
  methods: {
    googleLogin: function () {
      if (globalLock.lock) return
      globalLock.lock = true
      ApiService.googleLogin().then((res) => {
        this.notifyLogged()
        this.closeModal()
      }).catch(this.errorHandler)
    },
    login: function () {
      if (globalLock.lock) return
      globalLock.lock = true
      this.check(this.id, this.pw)
        .then(ApiService.login)
        .then((res) => {
          this.notifyLogged()
          this.closeModal()
          globalLock.lock = false
        })
        .catch(this.errorHandler)
    },
    check: function (id, pw) {
      let email = /[^@]+@[^.]+\..+/
      let password = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      return new Promise((resolve, reject) => {
        if (!email.test(id)) {
          reject(new Error('input/email'))
        }
        if (!password.test(pw)) {
          reject(new Error('input/password'))
        }
        resolve({id, pw})
      })
    },
    errorHandler: function (error) {
      globalLock.lock = false
      switch (error.message) {
        case 'input/email':
          this.message = '이메일이 형식에 맞지 않습니다.'
          return
        case 'input/password':
          this.message = '비밀번호가 형식에 맞지 않습니다.'
          return
      }
      switch (error.code) {
        case 'auth/invalid-email':
          this.message = '해당 이메일이 존재하지 않습니다.'
          return
        case 'auth/user-disabled':
          this.message = '사용자가 비활성화 되었습니다.'
          return
        case 'auth/user-not-found':
          this.message = '이메일로 가입된 계정이 존재하지 않습니다'
          return
        case 'auth/wrong-password':
          this.message = '비밀번호가 유효하지 않습니다.'
          return
        default :
          this.message = '' + error.code
      }
    },
    doRegister: function () {
      this.$eventHub.$emit('openModal', 1)
    },
    closeModal: function () {
      if (globalLock.lock) return
      this.message = ''
      this.$eventHub.$emit('closeModal')
    },
    notifyLogged: function () {
      this.$eventHub.$emit('logged')
    }
  }
}
</script>

<style scoped>
  .member-login {

  }
  .member-login form, .member-login div{
    display: inline-block;
    vertical-align: middle;
  }
  .error-msg{
    background-color: #fff1ff;
    color: #ff0000;
  }
  .google{
    background-color: #4CAF50;
  }
  .google:disabled{
    background-color: #aaaaaa;
  }
  .register{
    background-color: #a52a2a;
  }
  .register:disabled{
    background-color: #aaaaaa;
  }
</style>
