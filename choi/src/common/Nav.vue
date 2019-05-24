<template>
  <div class="nav">
    <ul>
      <li><router-link to="/">home</router-link></li>
      <li><router-link to="/dashboard">Dashboard</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Nav'
}
</script>

<style scoped>
.nav{
  background-color: #7a0000;
  color: white;
}
.nav ul{
  list-style: none;
}
.nav ul li{
  margin: 5px;
  display: inline-block;
}

.nav ul li a{
  color: white;
  text-decoration: none;
}
.nav ul li a.active{
  color: red;
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
