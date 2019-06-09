<template>
  <div id="app">
    <nav-bar :class="{fixed: isScrolled}"/>
      
    <router-view id="router"/>
    

  </div>
</template>

<script>
import NavBar from "./components/NavBar";
export default {
  name: "App",
  components: {
    "nav-bar": NavBar
  },
  data() {
    return {
      isScrolled: false
    };
  },
  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },methods: {
    handleScroll() {
        console.log('scroll');
        
      this.isScrolled = window.scrollY > 0;
    },
  },
};
</script>

<style>
html,
body,
#app,

#router {
  color: rgba(53, 52, 52, 0.699);
  padding: 0%;
  margin: 0%;
  height: 100%;
  text-align: center;
  margin-top: 0.1px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
a,
ul,
li {
  color: black;
  padding: 0%;
  margin: 0%;
  
}

a {
  text-decoration: none !important;
  
}

ul {
  list-style: none;
}

*:focus {
  outline: none;
}

.error {
  color: red !important;
}

.loading {
  display: none;
}
.fixed {
  top: 0%;
  position: fixed;
  width: 100%;
  z-index: 99;
  
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
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
