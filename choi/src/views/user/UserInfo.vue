<template>
  <div>
    <h3>Animal information</h3>
    <p>id : {{ $route.params.animal_type }}</p>
    <table>
      <tr>
        <td>name</td>
        <td>age</td>
        <td>img</td>
      </tr>
      <tr v-bind:key="animal.id" v-for="animal in animalList">
        <td>{{animal.name}}</td>
        <td>{{animal.age}}</td>
        <td><img v-bind:src="animal.src" alt="not found"></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'AnimalInfo',
  data () {
    return {
      animalList: []
    }
  },
  methods: {
    getData: function () {
      this.$db.collection('animals').doc(this.$route.params.animal_type).collection('list')
        .get()
        .then((docs) => {
          docs.forEach(
            (doc) => {
              let animal = doc.data()
              this.animalList.push({
                id: doc.id,
                name: animal.name,
                age: animal.age,
                src: animal.imgPath
              })
            }
          )
        })
    }
  },
  created () {
    this.getData()
  },
  watch: {
    '$route.params.animal_type': function (id) {
      this.animalList.length = 0
      this.getData()
    }
  }

}
</script>
<style scoped>
  table{
    margin: auto;
    width: 50%;
  }
</style>
