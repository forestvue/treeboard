<template>
  <div class="nav-container">
    <div class="nav-title">
      <router-link to="/">
        <h1>Hello</h1>
      </router-link>
    </div>
    <div class="nav-user" v-if="currentUser === null">
      <router-link to="/sign-in">Sign In</router-link>
    </div>
    <div class="nav-user" @click="signOut" v-else>로그아웃</div>
  </div>
</template>

<script>
export default {
  created() {
    this.getCurrentUser();
  },
  methods: {
    
    signOut() {
      this.$auth.signOut().then(() => {
        this.$router.replace("/");
      });
    },
    getCurrentUser() {
      this.$auth.onAuthStateChanged(user => {
        if (user) {
          this.currentUser = user;
          console.log(this.currentUser);
        } else {
          this.currentUser = null;
        }
      });
    }
  },
  data() {
    return {
      currentUser: null
    };
  }
};
</script>

<style scoped>
.nav-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: aqua;
}

.nav-title {
  padding-left: 32px;
}

.nav-user {
  padding-right: 32px;
  align-items: center;
  display: flex;
  cursor: pointer;
}

.nav-user * {
  display: inline-block;
}
</style>
