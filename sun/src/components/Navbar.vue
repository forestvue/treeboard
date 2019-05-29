<template>
    <nav class="navbar">
        <div class="navbar-logo">
            <router-link to="/">
                <img src="../assets/sun.png" alt="Sun logo" width="40px" height="40px">
            </router-link>
        </div>
        
        <div class="navbar-nav">
            <ul>
                <li><router-link to="/login">Log In</router-link></li>
                <li><router-link to="/signup">Sign Up</router-link></li>
                <li class="dropdown">
                    <router-link to="/dashboard">Dashboard</router-link>
                    <div id="dropdown-content">
                        <router-link to="/dashboard/admin">Admin</router-link>
                        <router-link to="/dashboard/user">User</router-link>
                    </div>
                </li>
                

            </ul>
            
        </div>
        
        
    </nav>
</template>

<script>
export default {

}
</script>

<style>
    .navbar{
        padding: 20px;
        height: 35px;
        line-height: 35px;
        font-size: 17px;
        background-color:#24c9c0;
        margin-bottom: 50px;
        
    }
    .navbar-logo{
        float: left;
        height: 70%;
    }
    .navbar-nav {
        float: right;
        
    }

    .navbar-nav ul{
        margin: 0;
        padding: 0;
    }

    .navbar-nav li{
        float: left;
        position: relative;
        padding: 0 20px;
        
    }

    .navbar-nav li a{
        color: white;
    }

    
    #dropdown-content{
        display: none;
        position: absolute;
        background-color: #eeeeee;
        min-width: 130px;
        z-index: 1;
        right: 0;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        
    }

    #dropdown-content a{
        float: none;
        display: block;
        color: black;
        
    }

    .dropdown:hover #dropdown-content{
        display: block;
    }
    
</style>
