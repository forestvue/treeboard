<template>
  <md-card class="sign-in-container">
    <form>
      <md-field>
        <label>Email</label>
        <md-input v-model="email" type="email" name="email" id="email"></md-input>
      </md-field>
      <md-field>
        <label>Password</label>
      <md-input v-model="password" type="password" name="password" id="password"></md-input>
      </md-field>
      <md-button class="md-raised" @click="emailSignIn">Email Sign In</md-button>
    </form>
    <md-button class="md-raised" @click="googleSignIn">google Sign In</md-button>
    <router-link to="/sign-up">sign up</router-link>
  </md-card>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    googleSignIn() {
      this.$auth
        .signInWithPopup(this.$googleProvider)
        .then(result => {
          console.log(result);
          this.$db
            .collection(this.$rootCol)
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

<style scoped>
.sign-in-container,
.sign-in-container > form {
  display: flex;
  flex-direction: column;
}

.sign-in-container {
  margin-top: 10%;
  width: 33%;
  margin-left: auto;
  margin-right: auto;
  padding: 16px;
}

.sign-in-container a {
    text-align: center;
}
</style>
