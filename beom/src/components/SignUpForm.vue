<template>
  <div>
    <form>
      <input v-model="email" type="email">
      <button>중복확인</button>
      <input v-model="password" type="password" name id>
      <button @click="signUp">회원가입</button>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    signUp() {
      this.$auth
        .createUserWithEmailAndPassword(this.email, this.password)
        // .createUserWithEmailAndPassword("test@test.com", "123456")
        .then(user => {
          console.log(user);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
</style>
