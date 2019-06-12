<template>
  <md-card class="sign-up-container">
    <form>
      <md-field>
        <label>Name</label>
        <md-input v-model="displayName" type="text"></md-input>
        <span class="md-helper-text" v-if="isValidName">사용가능한 이름입니다.</span>
      </md-field>
      <div class="sign-up-input-container">
        <md-field>
          <label>Email</label>
          <md-input v-model="email" type="email"></md-input>
          <span
            class="md-helper-text"
            v-if="isValidEmail && !isDuplicate && isConfirmDuplicate"
          >사용가능한 이메일입니다.</span>
          <span
            class="md-helper-text error"
            v-else-if="!isConfirmDuplicate && isDuplicate"
          >사용 중인 이메일입니다.</span>
          <span
            class="md-helper-text error"
            v-else-if="isValidEmail && !isConfirmDuplicate"
          >이메일 중복확인을 해주세요.</span>
          <span class="md-helper-text error" v-else-if="!isValidEmail">이메일형식이 아닙니다.</span>
        </md-field>
        <md-progress-spinner
          class="spinner"
          :md-diameter="30"
          :md-stroke="3"
          :class="{loading: !isLoading}"
          md-mode="indeterminate"
        ></md-progress-spinner>
        <md-button class="md-raised" @click="duplicateCheck" :class="{loading: isLoading}">중복확인</md-button>
      </div>

      <md-field>
        <label>Password</label>
        <md-input v-model="password" type="password"></md-input>
        <span class="md-helper-text" v-if="isValidPassword">사용가능한 비밀번호입니다.</span>
        <span class="md-helper-text error" v-else>비밀번호는 8자 이상, 특수문자, 영문, 숫자를 포함해야합니다.</span>
      </md-field>
      <div>
        <md-progress-spinner
          class="spinner"
          :md-diameter="30"
          :md-stroke="3"
          :class="{loading: !isSignUpLoading}"
          md-mode="indeterminate"
        ></md-progress-spinner>
        <md-button
          :class="{loading: isSignUpLoading}"
          class="md-raised sign-up-btn"
          @click="signUp"
        >회원가입</md-button>
      </div>
    </form>
  </md-card>
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
      isLoading: false,
      isSignUpLoading: false
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
        this.isSignUpLoading = true;
        console.log(this.email + this.password + this.displayName);

        this.$auth
          .createUserWithEmailAndPassword(this.email, this.password)
          // .createUserWithEmailAndPassword("test@test.com", "123456")
          .then(result => {
            this.$db
              .collection(this.$rootCol)
              .doc(result.user.uid)
              .set({
                displayName: this.displayName,
                email: this.email,
                isAdmin: false
              })
              .then(() => {
                result.user
                  .updateProfile({
                    displayName: this.displayName
                  })
                  .then(() => {
                    this.isSignUpLoading = false;
                    this.$router.replace("/dashboard");
                  });
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
            // alert("사용 가능한 이메일입니다.");
          } else {
            this.isConfirmDuplicate = false;
            // alert("이미 가입된 이메일입니다.");
          }
          this.isLoading = false;
        });
    }
  },
  watch: {
    email: function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      console.log(re.test(email));
      this.isValidEmail = re.test(email);
      this.isConfirmDuplicate = false;
      this.isDuplicate = false;
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

.spinner {
  /* stroke: blue; */
  margin-left: 16px;
}

.sign-up-container {
  width: 33%;
  margin-top: 10%;
  margin-left: auto;
  margin-right: auto;
  padding: 16px;
}

.sign-up-container form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.sign-up-container form div {
  flex: 1;
}

.sign-up-input-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.sign-up-btn {
  width: 100%;
}
</style>
