<template>
  <div id="app">
    <Nav></Nav>
    <div class="main">
      <router-view></router-view>
    </div>
    <!-- The Modal -->
    <div v-bind:style="{display: modalStatus}" id="myModal" class="modal">
      <!-- Modal content -->
      <div class="modal-content">
        <span class="close" v-on:click="closeModal">&times;</span>
        <h2> 로그인 하기 </h2>
        <div class="member-login">
          <form>
            <input type="text" placeholder="ID" autocomplete="email">
            <input type="password" placeholder="Password" autocomplete="off">
          </form>
          <div>
            <button class="sky login-button">Login</button>
          </div>
        </div>
        <button>구글로 로그인하기</button>
        <p>또는</p>

        <p>회원가입 하기</p>
      </div>

    </div>
  </div>
</template>

<script>

import Nav from '@/components/Nav'
import { ApiService } from './common/api.service'
export default {
  name: 'App',
  components: { Nav },
  data () {
    return {
      id: '',
      pw: '',
      modalStatus: 'none',
      currentModal: 'login'
    }
  },
  mounted () {
    this.$eventHub.$on('openModal', this.openModal)
  },
  methods: {
    signin: function () {
      ApiService.login()
    },
    closeModal: function () {
      this.modalStatus = 'none'
    },
    openModal: function () {
      this.modalStatus = 'block'
    }
  }
}
</script>

<style>
  body {
    margin: 0
  }
  ul{
    margin: 0;
    padding: 0;
  }
  .main {
    height: 1500px;
    margin: 10%;
  }
  .col-2{
    display: inline-block;
    width: 50%;
    float: left;
  }
  .member-login {

  }
  .member-login form, .member-login div{
    display: inline-block;
    vertical-align: middle;
  }
  .sky{
    background-color: #6ffff7;
  }
  button{
    border: none;
  }
  .login-button{
    color: white;
    width: 75px;
    height: 75px;
    margin-bottom: 10px;
  }
  /* The Modal (background) */
  .modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }

  .modal-content {
    background-color: #fefefe;
    text-align: center;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 50%; /* Could be more or less, depending on screen size */
  }
  .modal-content input{
    display: block;
    margin-bottom: 10px;
  }
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

</style>
