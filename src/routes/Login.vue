<template>
    <password-dialog class="dialog" />
</template>

<style scoped lang="scss">
.dialog {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Login extends Vue {
    mounted() {
        if(this.$store.state.isLoggedIn) {
            this.$router.push('/courses');
            return;
        }
    }
}
</script>