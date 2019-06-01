<template>
    <div class="admin" v-if="this.$router.user.isAdmin===true">
        
        <div class="List">
            <div class="userList">
            <ul>
                <h4>User List</h4>
                <p>Total: {{this.userNum}} users</p>
                <li v-for="user in users" v-bind:key="user.uid" v-if="user.isAdmin===false">
                    {{user.displayName}}
                    <button @click="usertoAdmin(user)">ToAdmin</button>
                </li>
            </ul>
            </div>

            <div class="adminList">
            <ul>
                <h4>Admin List</h4>
                <p>Total: {{this.adminNum}} admins</p>
                <li v-for="user in users" v-bind:key="user.uid" v-if="user.isAdmin===true">
                    {{user.displayName}}
                    <button @click="admintoUser(user)">ToUser</button>
                </li>
            </ul>
            </div>
        </div>
        <div class="Chart">
            <h3>PieChart</h3>
            <pie-chart class="pieChart" :chartData="pieData" :options="{}"></pie-chart>
        </div>
        
    </div>
</template>

<script>
import {usersCollection} from "../firebase.js";
import PieChart from "../components/chart.js";

export default {
    name: "admin",
    data() {
        return{
            users: [],
            adminNum: this.adminCount(),
            userNum: this.userCount()
        }
    },
    firestore() {
        return{
            users: usersCollection
        }
    },
    components: {
        PieChart
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
        adminCount(){
            
            usersCollection.where("isAdmin","==",true).get()
            .then(querySnapshot => {
                this.adminNum=querySnapshot.size;
            })
            return this.adminNum;
            
        },
        userCount(){
            
            usersCollection.where("isAdmin","==",false).get()
            .then(querySnapshot => {
                this.userNum=querySnapshot.size;
            })
            return this.userNum;
        },
        async usertoAdmin(user){
            
            console.log(user);
            if(user.isAdmin===false){
                user.isAdmin=true;
            }

            const email=user.email;

            //update firestore
            await usersCollection.where('email','==',email).get()
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

            usersCollection.where("isAdmin","==",true).get()
            .then(querySnapshot => {
                this.adminNum=querySnapshot.size;
                
            })

            usersCollection.where("isAdmin","==",false).get()
            .then(querySnapshot => {
                this.userNum=querySnapshot.size;
                
            })
            

            
        },
        async admintoUser(user){
            console.log(user);
            if(user.isAdmin===true){
                user.isAdmin=false;
            }

            const email=user.email;

            //update firestore
            await usersCollection.where('email','==',email).get()
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
            
            usersCollection.where("isAdmin","==",true).get()
            .then(querySnapshot => {
                this.adminNum=querySnapshot.size;
                
            })
            
            usersCollection.where("isAdmin","==",false).get()
            .then(querySnapshot => {
                this.userNum=querySnapshot.size;
                
            })
            
            console.log(this.userNum);
        
        }
    },
    computed: {
        pieData(){
            return{
                labels: ["Admins", "Users"],
                datasets: [
                {
                    label: "Data",
                    backgroundColor: ["#41B883", "#00D8FF"],
                    data: [
                            //이거 어떻게 하지..?
                        this.adminNum,this.userNum
                            
                    ]
                }
                ]
            }
            
        }
    }


}
</script>

<style>
    .admin{
        margin-top: 50px;
    }
    
    

    .List{
        width: 60%;
        float: left;
    }

    .userList{
        width: 50%;
        height: 500px;
        float: left;
    }
    .adminList{
        width: 50%;
        height: 500px;
        float: right;
    }
    .Chart{
        width: 40%;
        float: right;
    }

    .pieChart{
        max-width: 300px;
        margin:  0 auto;
    }
</style>
