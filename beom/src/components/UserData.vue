<template>
    <div>
        <ul>
            <li>Name : {{ userData.displayName }}</li>
            <li>Email : {{ userData.email }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['userData']
}
</script>

<style>

</style>
