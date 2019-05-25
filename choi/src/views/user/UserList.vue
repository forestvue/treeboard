<template>

  <div class="animal-list">
    <h3>List of animals</h3>

    <table>
      <tr>
        <th>kind</th>
        <th>name</th>
        <th>age</th>
        <th>image</th>
      </tr>
      <tr v-bind:key="animal.id" v-for="animal in animalList">
        <td>
          <router-link v-bind:to='"/dashboard/"+animal.kind'>{{animal.kind}}</router-link>
        </td>
        <td>{{animal.name}}</td>
        <td>{{animal.age}}</td>
        <td><img v-bind:src="animal.src" alt="not found"></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Animallist',
  created: function () {
    this.animal
      .get()
      .then(this.getAnimalTypeList)
      .then(this.getAnimalList)
      .then(this.animalRender)
  },
  data () {
    return {
      animal: this.$db.collection('animals'),
      animalList: []
    }
  },
  methods: {
    getAnimalTypeList: function (doclist) {
      let animal = this.animal
      return new Promise(function (resolve, reject) {
        let collections = []
        doclist.forEach((dcu) => {
          collections.push(animal.doc(dcu.id).collection('list').get())
        })
        Promise.all(collections).then(res => {
          resolve(res)
        })
      })
    },
    getAnimalList: function (documentSnapshots) {
      let res = []
      return new Promise(function (resolve, reject) {
        documentSnapshots.forEach((documentSnapshot) => {
          documentSnapshot.forEach((doc) => {
            res.push(doc)
          })
        })
        resolve(res)
      })
    },
    animalRender: function (docs) {
      docs.forEach((doc) => {
        let info = doc.data()
        this.animalList.push({
          id: info.id,
          kind: doc.ref.parent.parent.id,
          name: info.name,
          age: info.age,
          src: info.imgPath
        })
      })
    }
  }
}
</script>

<style scoped>
  animal-list{
    text-align: center;
  }
  table{
    margin: auto;
    width: 50%;
  }

</style>
