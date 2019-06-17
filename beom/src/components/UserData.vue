<template>
  <div class="user-data-container">
    <md-card>
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">Hi!, {{ userData.displayName }}</div>
          <div class="md-subhead">Your email address is {{ userData.email }}</div>
        </md-card-header-text>
      </md-card-header>
    </md-card>
  </div>
</template>

<script>
export default {
  props: ["userData"]
};
</script>

<style scoped>
.user-data-container {
  margin-top: 10%;
  width: 33%;
  margin-left: auto;
  margin-right: auto;
}
</style>
