<template>
  <div id="app">
    <Nav v-bind:auth-info="authInfo"></Nav>
    <div class="main">
      <router-view></router-view>
    </div>
    <Modal v-bind:modal-info="modalInfo"></Modal>
  </div>
</template>

<script>

import Nav from '@/components/Nav'
import { ApiService } from './common/api.service'
import Modal from './components/modal/Modal'
export default {
  name: 'App',
  components: { Modal, Nav },
  data () {
    return {
      authInfo: {
        email: ''
      },
      modalInfo: {
        modalStatus: false,
        currentModal: 0
      }
    }
  },
  created () {
    this.login()
  },
  mounted () {
    this.$eventHub.$on('logged', this.login)
    this.$eventHub.$on('openModal', this.openModal)
    this.$eventHub.$on('closeModal', this.closeModal)
    this.$eventHub.$on('logout', this.logout)
  },
  methods: {
    login: function () {
      ApiService.getUser()
        .then(user => {
          this.authInfo.email = user.email ? user.email : ''
        })
    },
    logout: function () {
      ApiService.logout()
      this.authInfo.email = ''
    },
    closeModal: function () {
      this.modalInfo.modalStatus = false
    },
    openModal: function (id) {
      this.modalInfo.currentModal = id
      this.modalInfo.modalStatus = true
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
    display: block; /* Hidden by default */
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
