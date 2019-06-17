<template>
  <div v-show="modalInfo.modalStatus" id="myModal" class="modal">
    <LoginModal v-bind:auth-info="authInfo" v-show="modalInfo.currentModal===0"></LoginModal>
    <RegisterModal v-show="modalInfo.currentModal===1"></RegisterModal>
  </div>
</template>

<script>
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
export default {
  name: 'Modal',
  components: { RegisterModal, LoginModal },
  props: ['modalInfo', 'authInfo'],
  methods: {
    closeModal: function () {
      this.$eventHub.$emit('closeModal')
    },
    goRegister: function () {
    }
  }
}
</script>

<style scoped>

</style>
