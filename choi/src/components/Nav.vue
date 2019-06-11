<template>
  <div id="navBar" v-bind:class="{floated: floatNav}" class="nav">
    <ul>
      <li><router-link to="/">home</router-link></li>
      <li v-if="authInfo.email !== ''" class="logon">{{authInfo.email}} <button v-on:click="doLogout">logout</button></li>
      <li v-else class="login"><a v-on:click="doLogin">login</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  props: ['authInfo', 'floatNav'],
  methods: {
    doLogin: function () {
      this.$eventHub.$emit('openModal', 0)
    },
    doLogout: function () {
      this.$eventHub.$emit('logout')
    }
  }
}
</script>

<style scoped>
.nav{
  background-color: #a52a2a;
  color: white;
}
.floated{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 3;
}
.nav ul{
  list-style: none;
  overflow: hidden;
  margin: 0;
}
.nav ul li{
  padding: 15px 30px 15px 30px;
  display: inline-block;
}

.nav ul li a{
  display: block;
  color: white;
  text-decoration: none;
}

.nav ul li.login{
  float: right;
  cursor: pointer;
}
.nav ul li.logon{
  float: right;
  cursor: pointer;
}
.nav ul li a{
  display: block;
}
.nav ul li a:link{
  color: white;
}
.nav ul li a:visited{
  color: white;
}

.nav ul li a:hover{
  color: white;
}
.nav ul li a:active{
  color: white;
}
</style>
