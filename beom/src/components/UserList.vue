<template>
  <div>
      <div v-for="item in userList" :key="item.id">
          {{ item }}
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            userList: []
        }
    },
  created() {
    this.$db
      .collection("Users")
      .where("isAdmin", "==", false)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(`${doc.id} => ${doc.data()}`);
          console.log(doc.data());
          this.userList.push(doc.data())
        });
      });
  }
};
</script>

<style>
</style>
