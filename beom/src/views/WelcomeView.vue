<template>
  <div class="welcom-container">
    <h1>Welcome!</h1>
    <pie-chart v-if="loaded" :data="chartData"></pie-chart>
  </div>
</template>

<script>
import PieChart from "../components/PieChart.vue";

export default {
  components: {
    PieChart
  },
  data() {
    return {
      loaded: false,
      admin: 0,
      guest: 0,
      chartData: null
    };
  },
  created() {
    this.loaded = false;
    this.$db
      .collection(this.$rootCol)
      .get()
      .then(querySnapshots => {
        querySnapshots.forEach(doc => {
          if (doc.data().isAdmin) {
            this.admin++;
          } else {
            this.guest++;
          }
        });
        this.chartData = {
          labels: ["admin", "guest"],
          datasets: [
            {
              label: "Member",
              backgroundColor: ["#41B883", "#E46651"],
              data: [this.admin, this.guest]
            }
          ]
        };
        this.loaded = true;
      });
  }
};
</script>

<style scoped>
.welcom-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
