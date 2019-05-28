<template>
  <table id="customers">
    <tr>
      <th>Email</th>
      <th>Role</th>
    </tr>
    <tr v-bind:key="user.id" v-for="user in userList">
      <td>{{user.email}}</td>
      <td>{{user.role}}</td>
    </tr>
  </table>
</template>

<script>
import { ApiService } from '../common/api.service'

export default {
  name: 'User',
  props: ['authInfo'],
  created () {
    if (this.authInfo.role === 'admin') this.getAllUsers()
  },
  data () {
    return {
      userList: []
    }
  },
  methods: {
    getAllUsers: function () {
      ApiService.getUserList().then(res => {
        res.forEach((userdoc) => {
          let info = userdoc.data()
          this.userList.push({
            id: userdoc.id,
            email: info.email,
            role: info.role
          })
        })
      })
    }
  },
  watch: {
    authInfo: {
      handler: function () {
        if (this.authInfo.role === 'admin') this.getAllUsers()
        else this.userList = []
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
