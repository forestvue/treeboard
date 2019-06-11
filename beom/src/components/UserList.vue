<template>
  <div>
    <div>
      <md-progress-bar :class="{loading: isDataLoading}" md-mode="indeterminate"></md-progress-bar>
    </div>
    <md-table
      v-model="userList"
      md-card
      @md-selected="onSelect"
      md-fixed-header
      md-sort-order="asc"
      md-sort="name"
    >
      <md-table-toolbar>
        <h1 class="md-title">Users</h1>
      </md-table-toolbar>

      <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
        <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>

        <div class="md-toolbar-section-end">
          <md-button @click="updatePermission(0)" class="md-icon-button">
            <md-progress-spinner
              class="spinner"
              :md-diameter="30"
              :md-stroke="3"
              :class="{loading: !isLoading}"
              md-mode="indeterminate"
            ></md-progress-spinner>
            <md-icon :class="{loading: isLoading}">arrow_downward</md-icon>
          </md-button>
          <md-button @click="updatePermission(1)" class="md-icon-button">
            <md-progress-spinner
              class="spinner"
              :md-diameter="30"
              :md-stroke="3"
              :class="{loading: !isLoading}"
              md-mode="indeterminate"
            ></md-progress-spinner>
            <md-icon :class="{loading: isLoading}">arrow_upward</md-icon>
          </md-button>
        </div>
      </md-table-toolbar>

      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
        md-selectable="multiple"
        md-auto-select
        :md-disabled="item.email.includes($auth.currentUser.email)"
      >
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.displayName }}</md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="admin" md-sort-by="admin">{{ item.isAdmin }}</md-table-cell>
      </md-table-row>
    </md-table>

    <!-- <p>Selected:</p>
    {{ selected }}-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      userList: [],
      selected: [],
      isLoading: false,
      isDataLoading: false
    };
  },
  created() {
    // 변화가 있으면 다시 호출됨
    this.$db.collection("Users").onSnapshot(querySnapshot => {
      this.userList = [];
      querySnapshot.forEach(doc => {
        this.isDataLoading = false;

        console.log(`${doc.id} => ${doc.data()}`);
        console.log(doc.data());
        const userData = {
          uid: doc.id,
          displayName: doc.data().displayName,
          email: doc.data().email,
          isAdmin: doc.data().isAdmin
        };
        this.userList.push(userData);
      });
      this.isDataLoading = true;
    });

    // 최초 한번만 호출됨
    // this.$db
    //   .collection("Users")
    //   .get()
    //   .then(querySnapshot => {
    //     this.userList = [];
    //     querySnapshot.forEach(doc => {
    //       this.isDataLoading = true;

    //       console.log(`${doc.id} => ${doc.data()}`);
    //       console.log(doc.data());
    //       const userData = {
    //         uid: doc.id,
    //         displayName: doc.data().displayName,
    //         email: doc.data().email,
    //         isAdmin: doc.data().isAdmin
    //       };
    //       this.userList.push(userData);
    //     });
    //     this.isDataLoading = false;
    //   });
  },
  methods: {
    getAlternateLabel(count) {
      let plural = "";

      if (count > 1) {
        plural = "s";
      }

      return `${count} user${plural} selected`;
    },
    onSelect(items) {
      this.selected = items;
    },
    updatePermission(flag) {
      this.isLoading = true;
      var isAdmin = false;
      if (flag == 0) {
        isAdmin = false;
      } else {
        isAdmin = true;
      }
      this.selected.forEach(doc => {
        console.log(doc.uid);
        this.$db
          .collection(this.$rootCol)
          .doc(doc.uid)
          .update({
            isAdmin: isAdmin
          })
          .then(() => {
            this.isLoading = false;
          })
          .catch(function(error) {
            console.error(error);
          });
      });
    }
  }
};
</script>

<style>
</style>
