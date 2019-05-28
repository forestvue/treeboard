<template>
  <div>
    <table v-if="authInfo.role==='admin'" class="customers">
      <tr>
        <th>Email</th>
        <th>Role</th>
        <th>Promote / Relegate</th>
      </tr>
      <tr v-bind:key="user.id" v-for="user in userList">
        <td>{{user.email}}</td>
        <td>{{user.role}}</td>
        <td><div class="dropdown">
          <button class="dropbtn">Action</button>
          <div class="dropdown-content">
            <a v-on:click="update(user.id, 'admin')">Admin</a>
            <a v-on:click="update(user.id, 'guest')">Guest</a>
          </div>
        </div></td>
      </tr>
    </table>
    <div v-else-if="authInfo.role==='guest'">
      <h1>Welcome guest!</h1>
    </div>
    <div v-else>
      <h1>login required</h1>
    </div>
  </div>
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
    },
    update: function (id, role) {
      console.log(id)
      ApiService.updateUser(id, role).then(res => console.log('success'))
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
  /* Style The Dropdown Button */
  .dropbtn {
    background-color: #4CAF50;
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
    cursor: pointer;
  }

  /* The container <div> - needed to position the dropdown content */
  .dropdown {
    position: relative;
    display: inline-block;
  }

  /* Dropdown Content (Hidden by Default) */
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
  }

  /* Links inside the dropdown */
  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  /* Change color of dropdown links on hover */
  .dropdown-content a:hover {background-color: #f1f1f1}

  /* Show the dropdown menu on hover */
  .dropdown:hover .dropdown-content {
    display: block;
  }

  /* Change the background color of the dropdown button when the dropdown content is shown */
  .dropdown:hover .dropbtn {
    background-color: #3e8e41;
  }
  .customers {
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  .customers td, .customers th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  .customers tr:nth-child(even){background-color: #f2f2f2;}

  .customers tr:hover {background-color: #ddd;}

  .customers th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #4CAF50;
    color: white;
  }
</style>
