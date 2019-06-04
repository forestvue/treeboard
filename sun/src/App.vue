<template>
  <div id="app">
    <header class="app-header">
      <navbar></navbar>
    </header>
    
    <body class="app-body">
      <router-view/>
    </body>
    <footer class="app-footer">

    </footer>
    

  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue"
import "./firebase.js"

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 101%;
}

html, body{
  margin: 0;
  padding: 0;
}


a {
  text-decoration: none;
}
ul, li {
  list-style: none;
}

input{
  margin: 10px 0;
  width: 20%;
  padding: 15px;
  font-size: 14px;
}

button{
  margin-top: 30px;
  width: 200px;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  border: solid 1px transparent;
  border-radius: 4px;
  background-color: #e8ecf1;
}

.app-header{
  position: fixed;
  width: 100%;
  top: 0;
}

.app-body{
  margin-top: 125px;
}

</style>
