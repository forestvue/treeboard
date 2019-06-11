<template>
  <div>
    <div v-if="authInfo.role==='admin'">
      <h1>Admins</h1>
      <table  class="customers">
        <tr>
          <th>Email</th>
          <th>Role</th>
          <th>Promote / Relegate</th>
        </tr>
        <tr v-bind:key="user.id" v-for="user in adminList">
          <td>{{user.email}}</td>
          <td>{{user.role}}</td>
          <td><div class="dropdown">
            <button class="dropbtn">Action</button>
            <div class="dropdown-content">
              <a v-on:click="update(user.id, 'guest')">Guest</a>
            </div>
          </div></td>
        </tr>
      </table>
      <h1>Guests</h1>
      <table  class="customers">
        <tr>
          <th>Email</th>
          <th>Role</th>
          <th>Promote / Relegate</th>
        </tr>
        <tr v-bind:key="user.id" v-for="user in guestList">
          <td>{{user.email}}</td>
          <td>{{user.role}}</td>
          <td><div class="dropdown">
            <button class="dropbtn">Action</button>
            <div class="dropdown-content">
              <a v-on:click="update(user.id, 'admin')">Admin</a>
            </div>
          </div></td>
        </tr>
      </table>
    </div>
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
import { globalLock } from '../store'

export default {
  name: 'User',
  props: ['authInfo'],
  created () {
    this.getAllUsers()
  },
  data () {
    return {
      localLock: globalLock.lock,
      adminList: [],
      guestList: []
    }
  },
  methods: {
    getAllUsers: function () {
      if (this.authInfo.role === 'admin') {
        ApiService.getAdmins().then(this.renderAdmin)
        ApiService.getGuests().then(this.renderGuest)
        ApiService.watchAdmins(this.renderAdmin)
        ApiService.watchGuests(this.renderGuest)
      }
      this.$eventHub.$emit('loadingFinished')
    },
    update: function (id, role) {
      if (globalLock.lock) {
        this.$toast('업데이트 중이니 잠시만 기다려주십시오.', {
          timeout: 3000,
          icon: 'info'
        })
        return
      }
      globalLock.lock = true
      window.setTimeout(() => {
        ApiService.updateUser(id, role).then(res => { globalLock.lock = false })
      }, 3000)
    },
    renderAdmin: function (res) {
      this.adminList = []
      res.forEach((userdoc) => {
        let info = userdoc.data()
        this.adminList.push({
          id: userdoc.id,
          email: info.email,
          role: info.role
        })
      })
    },
    renderGuest: function (res) {
      this.guestList = []
      res.forEach((userdoc) => {
        let info = userdoc.data()
        this.guestList.push({
          id: userdoc.id,
          email: info.email,
          role: info.role
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
