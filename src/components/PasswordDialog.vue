<template>
    <div>
        <div class="backdrop"></div>
        <form class="content" v-on:submit.prevent="login">
            <h2>Password:</h2>
            <div><input type="password" placeholder="Enter Password Here" v-model="password"  /></div>
            <div><input type="submit" /></div>
            <div v-if="error" class="error">{{ error }}</div>
        </form>
    </div>
</template>

<style scoped lang="scss">
$primaryColor: #4B0082;
div {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    padding: 50px 15px 15px 15px;

    .backdrop {
        background: black;
        opacity: 0.7;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }
    
    form {
        position: relative;
        display: inline-block;
        background: white;
        z-index: 2;
        width: 50%;
        min-width: 200px;
        height: auto;
        padding: 15px;
        color: $primaryColor;

        h2 {
            font-size: 2em;
        }

        div {
            margin: 0;
            padding: 15px 0;
        }

        input[type="password"] {
            background: none;
            border: none;
            border-bottom: 2px solid $primaryColor;
            width: 80%;
            margin: 15px 0;
            outline: none;
            text-align: center;
            padding: 15px;
            font-size: 18pt;
        }

        input[type="submit"] {
            background: $primaryColor;
            width: 80%;
            color: white;
            font-size: 12pt;
            padding: 15px 0;
            border: none;
        }
    }
}
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class PasswordDialog extends Vue {
    public password?: string = null;
    public error?: string = null;

    async login() {
        const response = await fetch(`${process.env.CLASSES_ADDRESS}/courses`, {
            headers: {
                Authorization: `Basic ${btoa("bdc:" + this.password)}`
            }
        });

        if(response.status === 200) {
            Vue.set(this.$store.state, "password", this.password);
            Vue.set(this.$store.state, "isLoggedIn", true);
            this.$router.push('/courses');
        } else {
            this.error = "Invalid password";
        }
    }
}
</script>