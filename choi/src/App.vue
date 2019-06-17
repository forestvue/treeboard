<template>
  <div id="app">
    <Nav v-bind:auth-info="authInfo"
         v-bind:float-nav="floatNav"
    ></Nav>
    <div class="main">
      <router-view v-bind:auth-info="authInfo"></router-view>
    </div>
    <div v-show="isLoading" class="loading-screen">
      <div  class="lds-dual-ring"></div>
    </div>
    <Modal v-bind:modal-info="modalInfo"
           v-bind:auth-info="authInfo"
    ></Modal>
  </div>
</template>

<script>

import Nav from '@/components/Nav'
import { ApiService } from './common/api.service'
import Modal from './components/modal/Modal'
import { globalLock } from './store'
export default {
  name: 'App',
  components: { Modal, Nav },
  data () {
    return {
      localLock: globalLock.lock,
      authInfo: {
        email: '',
        uid: '',
        role: ''
      },
      modalInfo: {
        modalStatus: false,
        currentModal: 0
      },
      isLoading: true,
      floatNav: false
    }
  },
  created () {
    window.setTimeout(() => {
      this.finishLoad()
    }, 2000)
    this.login()
  },
  mounted () {
    this.$eventHub.$on('logged', this.login)
    this.$eventHub.$on('openModal', this.openModal)
    this.$eventHub.$on('closeModal', this.closeModal)
    this.$eventHub.$on('logout', this.logout)
    this.$eventHub.$on('loadingStart', this.loadingStart)
    this.$eventHub.$on('loadingFinished', this.loadingFinished)
    window.addEventListener('scroll', this.checkScroll)
  },
  methods: {
    finishLoad: function () {
      this.isLoading = false
    },
    login: function () {
      ApiService.getCurrentUser(this.getUserInfo)
    },
    getUserInfo: function (user) {
      console.log(user)
      if (!user) return
      this.findUser(user)
        .then(this.closeModal)
        .catch(err => console.log(err))
    },
    findUser: function (user) {
      if (user.uid === '' || user.uid === undefined) return
      return new Promise(resolve => {
        ApiService.findUser(user.uid)
          .then((res) => {
            this.authInfo.email = user.email ? user.email : ''
            this.authInfo.uid = user.uid ? user.uid : ''
            if (res.exists) {
              this.authInfo.role = res.data().role
            } else {
              ApiService.createUser(this.authInfo).then(() => { this.authInfo.role = 'guest' }).catch((err) => console.log(err))
            }
            resolve('success')
          })
      })
    },
    checkScroll: function () {
      if (window.pageYOffset >= 60) {
        this.floatNav = true
      } else {
        this.floatNav = false
      }
    },
    logout: function () {
      ApiService.logout().then(res => {
        this.authInfo.email = ''
        this.authInfo.uid = ''
        this.authInfo.role = ''
      })
    },
    loadingStart: function () {
      this.isLoading = true
    },
    loadingFinished: function () {
      this.isLoading = false
    },
    closeModal: function () {
      this.modalInfo.modalStatus = false
      globalLock.lock = false
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
  .loading-screen{
    display: block; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 3; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: #83ff72
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .lds-dual-ring {
    position: fixed;
    top : 45%;
    left : 50%;
    display: inline-block;
    width: 64px;
    height: 64px;
  }
  .lds-dual-ring:after {
    content: " ";
    display: block;
    width: 46px;
    height: 46px;
    margin: auto;
    border-radius: 50%;
    border: 5px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-dual-ring 1.2s linear infinite;
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
  .login-button:disabled{
    background-color: #aaaaaa;
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
