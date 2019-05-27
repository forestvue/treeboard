<template>
  <div>
    <form>
      <input v-model="email" type="email" name="email" id="email">
      <input v-model="password" type="password" name="password" id="password">
      <button @click="emailSignIn">Email Sign In</button>
    </form>
    <button @click="googleSignIn">google Sign In</button>
    <router-link to="/sign-up">sign up</router-link>
  </div>
</template>

<script>
export default {
    data() {
        return {
            email: "",
            password: "",
        }
    },
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
    emailSignIn() {
      this.$auth
        .signInWithEmailAndPassword(this.email, this.password)
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
