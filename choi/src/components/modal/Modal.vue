<template>
  <div v-show="modalInfo.modalStatus" id="myModal" class="modal">
    <LoginModal v-show="modalInfo.currentModal===0"></LoginModal>
    <RegisterModal v-show="modalInfo.currentModal===1"></RegisterModal>
  </div>
</template>

<script>
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
export default {
  name: 'Modal',
  components: { RegisterModal, LoginModal },
  props: ['modalInfo'],
  data () {
    return {
      id: '',
      pw: ''
    }
  },
  methods: {
    closeModal: function () {
      this.$eventHub.$emit('closeModal')
    },
    goRegister: function () {
      console.log('register')
    }
  }
}
</script>

<style scoped>

</style>
