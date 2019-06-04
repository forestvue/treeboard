<template>
    <div class="user" v-if="this.$router.user.isAdmin===false">
        <p>Page for users</p><br><br>
        <p>{{this.$router.user.email}}</p>
        
    </div>
</template>

<script>

export default {
    name: 'user'
    
}
</script>

<style>

</style>
