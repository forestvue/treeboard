<template>
    <div class="login">
        <div class="vld-parent">
            <loading :active.sync="isLoading"
            :can-cancel="false"
            :is-full-page="fullPage"></loading>
        </div>

        <h2>Log in</h2>
        <input v-model="email" type="text" placeholder="Email"><br>
        <input v-model="password" type="password" placeholder="Password"><br>
        <button @click="login" @click.prevent="doAjax">Log in</button>
        <p>or Sign in with Google<br>
            <button @click="googleLogin" class="googleLogin-button" @click.prevent="doAjax">
                <img src="../assets/google_logo.png" alt="Google logo" width="30px" height="30px">
            </button>

        </p>
        <p>You don't have an account? <router-link to="/Signup">create new one</router-link></p>
    </div>
</template>

<script>
import firebase from "firebase"
import { usersCollection } from '../firebase';
//Spinner로 모듈화했을 때 methods를 따로 가져오는 방법은 없을까..? 
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    name: "login",
    data() {
        return {
            email: "",
            password: "",
            isLoading: false,
            fullPage: true
        }
    },
    components: {
        Loading
    },
    methods: {

        doAjax() {
            this.isLoading = true;
            // simulate AJAX
            setTimeout(() => {
                this.isLoading = false
            },5000)
        },
        
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
