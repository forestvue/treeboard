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
  color: black;
  padding: 0%;
  margin: 0%;
  height: 100%;
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
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
