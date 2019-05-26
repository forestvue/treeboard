<template>
    <div>
        <form>
            <input type="email" name="" id="">
            <input type="password" name="" id="">
            <button></button>
        </form>
        <button @click="googleSignIn">google Sign In</button>
        <router-link to="/sign-up"></router-link>
    </div>
</template>

<script>
export default {
    methods: {
        googleSignIn() {
            this.$auth.signInWithPopup(this.$googleProvider).then((result) => {
                console.log(this.$currentUser);console.log(this.$auth.currentUser);
                
                this.$router.replace('/dashboard')
            }).catch((err) => {
                console.log(err.message);
            })
        }
    },
}
</script>

<style>

</style>
