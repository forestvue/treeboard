<template>
    <div class="user" v-if="this.$router.user.isAdmin===false">
        
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
