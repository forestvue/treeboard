<template>
    <div class="home">
        <h3>Home</h3>
        <p>TreeBoard</p>

        <div v-if="loggedUser">
            <p>
                Logged User: {{loggedUser}}
            </p>
            <button @click="logout">LogOut</button>
        </div>

        <div v-else>
            <p>Login, please</p>
        </div>


        
        
    </div>
</template>

<script>
import firebase from "firebase";

export default {
    name: 'home',
    data(){
        return{
            loggedUser: this.showUser()
            
        }
        
    },
    methods: {
        logout(){
            firebase.auth().signOut().then(() => {
                this.$router.user=null;
                alert("로그아웃 되었습니다.");
                this.$router.replace("login");
            })
        },
        showUser(){
            if(!this.$router.user.displayName){
                return this.$router.user.email
            }else{
                return this.$router.user.displayName
            }
        }
    }
}
</script>

<style>
    
</style>
