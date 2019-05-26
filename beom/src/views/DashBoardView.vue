<template>
  <div>
      <user-data :user-data="this.$auth.currentUser"/>
      </div>
</template>

<script>
import UserData from "../components/UserData";
import UserList from "../components/UserList";
export default {
  components: {
    "user-data": UserData,
    "user-list": UserList
  }
};
</script>

<style>
</style>
