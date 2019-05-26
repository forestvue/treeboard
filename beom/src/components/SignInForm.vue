<template>
  <div>
    <form>
      <input v-model="email" type="email" name id>
      <input v-model="password" type="password" name id>
      <button @click="emailSignIn(email, password)"></button>
    </form>
    <button @click="googleSignIn">google Sign In</button>
    <router-link to="/sign-up">sign up</router-link>
  </div>
</template>

<script>
export default {
  methods: {
    googleSignIn() {
      this.$auth
        .signInWithPopup(this.$googleProvider)
        .then(result => {
          console.log(result);
          this.$db
            .collection("Users")
            .doc(result.user.uid)
            .set({
              displayName: result.user.displayName,
              email: result.user.email,
              isAdmin: true
            })
            .then(() => {
              this.$router.replace("/dashboard");
            })
            .catch(err => {
              console.log(err.message);
            });
        })
        .catch(err => {
          console.log(err.message);
        });
    },
    emailSignIn(email, password) {
      this.$auth
        .signInWithEmailAndPassword(email, password)
        .then(result => {
          console.log(result);
          this.$router.replace("/dashboard");
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  }
};
</script>

<style>
</style>
