<template>
  <div>
    <div v-if="!isAdmin">
      <user-data :user-data="this.$auth.currentUser"/>
    </div>
    <div v-else>
      <user-list/>
    </div>
    <div class="Chart">
            <h3>PieChart</h3>
            <pie-chart class="pieChart" :chartData="pieData" :options="{}"></pie-chart>
        </div>
  </div>
</template>

<script>
import UserData from "../components/UserData";
import UserList from "../components/UserList";
import PieChart from "../components/chart.js";
export default {
  data() {
    return {
      userdatas: [],
      isAdmin: false,
      adminNum : this.getadminNum(),
      userNum : this.getuserNum()
      
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
      .collection("yeorok_user")
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
    "user-list": UserList,
    PieChart
  },
  methods: {
    getuserNum() {
      this.$db.collection("yeorok_user")
      .where("isAdmin","==",false).get()
      .then(querySnapshot => {
        this.userNum=querySnapshot.size;
      })
      return this.userNum
    },
    getadminNum() {
      this.$db.collection("yeorok_user")
      .where("isAdmin","==",true).get()
      .then(querySnapshot => {
        this.adminNum=querySnapshot.size;
      })
      return this.adminNum
    }

  },
  computed : {
    pieData() {
      return {
        labels : ["Admins", "Users"],
        datasets: [
                {
                    label: "Data",
                    backgroundColor: ["#41B883", "#00D8FF"],
                    data: [
                        this.adminNum, this.userNum
                            
                    ]
                }
                ]
      }
    }
  }
};
</script>

<style>

  .pieChart{
        width: 400px;
        height: 400px;
        margin:  0 auto;
    }
</style>
