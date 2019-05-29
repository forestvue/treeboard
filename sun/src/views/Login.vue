<template>
    <div class="login">
        <h3>Log in</h3>
        <input v-model="email" type="text" placeholder="Email"><br>
        <input v-model="password" type="password" placeholder="Password"><br>
        <button @click="login">Log in</button>
        <p>or Sign in with Google<br>
            <button @click="googleLogin" class="googleLogin-button">
                <img src="../assets/google_logo.png" alt="Google logo" width="30px" height="30px">
            </button>

        </p>
        <p>You don't have an account? <router-link to="/Signup">create new one</router-link></p>
    </div>
</template>

<script>
import firebase from "firebase"
import { usersCollection } from '../firebase';

export default {
    name: "login",
    data() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        login(){
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user)=> {
                this.$router.user=user.user;

                usersCollection.where('email','==',this.email).get()
                .then((querySnapshot) => {
                    querySnapshot.forEach(doc => {
                        this.$router.user.isAdmin=doc.data().isAdmin;
                    })
                })
                .then(() => {
                    console.log("Successfully login");
                    console.log(this.$router.user.isAdmin);
                })
                .catch((error) => {
                    console.log(error);
                })
                
                this.$router.replace("/");
            }).catch((error) => {
                console.log(error);
                alert(error.message);
            })
        },
        googleLogin(){
            this.provider=new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(this.provider).then(result => {

                this.$router.user=result.user;

                usersCollection.where('email','==',result.user.email).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        this.$router.user.isAdmin=doc.data().isAdmin;
                    })
                })
                .then(() => {
                    console.log("Successfully login");
                })
                .catch((error) => {
                    console.log(error);
                })
                
                console.log(result);
                console.log(this.$router.user.isAdmin)
                this.$router.replace("/");
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
