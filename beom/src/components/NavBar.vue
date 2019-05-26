<template>
  <div>
    <div>
      <h1>Hello</h1>
    </div>
    <div>
      <div v-if="currentUser === null">
        <router-link to="/sign-in">Sign In</router-link>
      </div>
      <div @click="signOut" v-else>
        {{currentUser.displayName}} 님, 안녕하세요!
      </div>
    </div>
  </div>
</template>

<script>
export default {
    created() {
        this.getCurrentUser()
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
  },
};
</script>

<style>
</style>
