<template>
    <div class="signup">
        <h2>Sign Up</h2>
        <input v-validate="'required:true'" 
        v-model="email" type="email" name="email" placeholder="Email"><br>

        <input v-validate= "'required:true|min:8|password-verify'" 
        v-model="password" type="password" name="password" placeholder="Password"><br>

        <p v-show="errors.has('email')" class="help is-danger">
            {{ errors.first('email') }}</p>
        <p v-show="errors.has('password')" class="help is-danger">
            {{ errors.first('password') }}</p>

        <button @click="SignUp">Sign Up</button>
    </div>
</template>

<script>
import firebase from "firebase"
import {usersCollection} from "../firebase.js"

export default {
    name: 'signup',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        SignUp() {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then((user) => {
                console.log(user);
                
                usersCollection.add({
                    displayName: this.email,
                    email: this.email,
                    isAdmin: false
                })
                
                this.$router.replace("login");
            }).catch((error) => {
                console.log(error);
                alert(error.message);
            })
        }
    }
}
</script>

<style>

</style>
