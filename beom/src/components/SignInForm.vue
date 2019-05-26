<template>
  <div>
    <form>
      <input type="email" name id>
      <input type="password" name id>
      <button></button>
    </form>
    <button @click="googleSignIn">google Sign In</button>
    <router-link to="/sign-up"></router-link>
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
            .collection("Users").doc(result.user.uid)
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
    }
  }
};
</script>

<style>
</style>
