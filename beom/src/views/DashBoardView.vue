<template>
  <div>
    <div v-if="!isAdmin">
      <user-data :user-data="this.$auth.currentUser"/>
    </div>
    <div v-else>{{isAdmin}}</div>
    <user-list/>
  </div>
</template>

<script>
import UserData from "../components/UserData";
import UserList from "../components/UserList";
export default {
  data() {
    return {
      userdatas: [],
      isAdmin: false
    };
  },
  created() {
    // this.$db
    //   .collection("Users")
    //   .doc(this.$auth.currentUser.uid)
    //   .onSnapshot(function(doc) {
    //       this.userdatas = [];
    //     console.log("Current data: ", doc.data());
    //     this.userdatas.push(doc.data());
    //     this.isAdmin = doc.data().isAdmin
    //     console.log(this.userdatas);
    //   });

    this.$db
      .collection("Users")
      .doc(this.$auth.currentUser.uid)
      .get()
      .then(doc => {
        console.log(doc.data());
        this.isAdmin = doc.data().isAdmin;
      });
  },
  watch: {
    isAdmin: function() {}
  },
  components: {
    "user-data": UserData,
    "user-list": UserList
  }
};
</script>

<style>
</style>
