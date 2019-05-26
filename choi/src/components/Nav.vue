<template>
  <div class="nav">
    <ul>
      <li><router-link to="/">home</router-link></li>
      <li class="login"><a v-on:click="doLogin">login</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  methods: {
    doLogin: function () {
      this.$eventHub.$emit('openModal', 0)
    }
  }
}
</script>

<style scoped>
.nav{
  background-color: #a52a2a;
  color: white;
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
