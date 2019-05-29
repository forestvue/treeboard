<template>
    <div class="admin" v-if="this.$router.user.isAdmin===true">
        <div>

        </div>
        <ul class="userList">
            <li v-for="user in users" v-bind:key="user.uid" v-if="user.isAdmin===false">
                <p>{{user.displayName}}</p>
                <button @click="usertoAdmin(user)">ToAdmin</button>
            </li>
        </ul>
    </div>
</template>

<script>
import {usersCollection} from "../firebase.js"

export default {
    name: "admin",
    data() {
        return{
            users: []
        }
    },
    firestore() {
        return{
            users: usersCollection
        }
    },
    
    created() {
        usersCollection.onSnapshot((querySnapshot) => {
            this.users=[];
            querySnapshot.forEach((doc) => {
                this.users.push({
                    displayName: doc.data().displayName,
                    email: doc.data().email,
                    isAdmin: doc.data().isAdmin
                })
            })
        })
    },
    methods: {
        usertoAdmin(user){
            
            console.log(user);
            if(user.isAdmin===false){
                user.isAdmin=true;
            }

            const email=user.email;

            //update firestore
            usersCollection.where('email','==',email).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.update({
                        isAdmin:user.isAdmin
                    })
                })
            })
            .then(() => {
                console.log("Successfully update the record");
            })
            .catch((error) => {
                console.log(error);
            })
            
        }
    }


}
</script>

<style>
    
</style>
