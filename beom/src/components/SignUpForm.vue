<template>
  <div>
    <form>
      <input v-model="displayName" type="text">
      <input v-model="email" type="email">
      <pulse-loader :loading="isLoading"></pulse-loader>
      <button @click="duplicateCheck" :class="{loading: isLoading}">중복확인</button>
      <input v-model="password" type="password">
      <button @click="signUp">회원가입</button>
    </form>
  </div>
</template>

<script>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default {
  components: {
    "pulse-loader": PulseLoader
  },
  data() {
    return {
      email: "",
      displayName: "",
      password: "",
      isDuplicate: false,
      isConfirmDuplicate: false,
      isValidEmail: false,
      isValidPassword: false,
      isValidName: false,
      isLoading: false
    };
  },
  methods: {
    signUp() {
      if (
        this.isConfirmDuplicate &&
        this.isValidEmail &&
        this.isValidPassword &&
        this.isValidName
      ) {
        this.$auth
          .createUserWithEmailAndPassword(this.email, this.password)
          // .createUserWithEmailAndPassword("test@test.com", "123456")
          .then(user => {
            this.$db
              .collection(this.$rootCol)
              .doc(user.uid)
              .set({
                displayName: this.displayName,
                email: this.email,
                isAdmin: false
              })
              .then(() => {
                this.$auth.signOut();
                this.$router.replace("/sign-in");
              })
              .catch(err => {
                console.log(err.message);
              });
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        alert("모든 항목을 확인해주세요.");
      }
    },
    duplicateCheck() {
      this.$db
        .collection(this.$rootCol)
        .get()
        .then(querySnapshot => {
          this.isLoading = true;
          console.log(this.isLoading);
          querySnapshot.forEach(doc => {
            if (this.email === doc.data().email) {
              this.isDuplicate = true;
            } else {
              this.isDuplicate = false;
            }
          });
          console.log("this.isDuplicate : " + this.isDuplicate);
          if (!this.isDuplicate) {
            this.isConfirmDuplicate = true;
            alert("사용 가능한 이메일입니다.");
          } else {
            this.isConfirmDuplicate = false;
            alert("이미 가입된 이메일입니다.");
          }
          this.isLoading = false;
                    console.log(this.isLoading);

        });
    }
  },
  watch: {
    email: function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      console.log(re.test(email));
      this.isValidEmail = re.test(email);
    },
    password: function(password) {
      var re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      console.log(re.test(password));
      this.isValidPassword = re.test(password);
    },
    displayName: function(displayName) {
      this.isValidName = displayName.length != 0 ? true : false;
      console.log(this.isValidName);
    }
  }
};
</script>

<style scoped>
.loading {
    display: none
}

</style>
