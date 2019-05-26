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
        <button class="sky login-button">Login</button>
      </div>
    </div>
    <button>구글로 로그인하기</button>
    <p>또는</p>
    <button v-on:click="doRegister">회원가입 하기</button>
  </div>
</template>

<script>
export default {
  name: 'LoginModal',
  data () {
    return {
      id: '',
      pw: ''
    }
  },
  methods: {
    doRegister: function () {
      this.$eventHub.$emit('openModal', 1)
    },
    closeModal: function () {
      this.$eventHub.$emit('closeModal')
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
</style>
