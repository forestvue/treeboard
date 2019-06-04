<template>
    <div class="vld-parent">
        <loading :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="fullPage"
        :opacity="1"></loading>
    </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    data() {
        return {
            isLoading: false,
            fullPage: true
        }
    },
    components: {
        Loading
    },
    created(){
        this.doAjax();
    },
    methods: {
        doAjax() {
            this.isLoading = true;
            // simulate AJAX
            setTimeout(() => {
                this.isLoading = false
            },4000)
        }
    }
}
</script>

<style>

</style>
