<template>
    <ul>
        <li :key="course.name" v-for="course in courses">
            <router-link :to="{ name: 'classes', params: { courseId: course.id } }">
                <h2>{{ course.name }}</h2>
            </router-link>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
    ul {
        list-style-type: none;
        display: flex;
        width: 100%;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        text-align: center;
        flex-wrap: wrap;

        li {
            flex-basis: 20%;
            display: flexbox;
            background: #DDD;
            flex-grow: 1;
            text-align: center;
            margin: 15px;
            min-width: 300px;
            
            a {
                height: 100%;
                width: 100%;
                padding: 50px 15px;
                color: black;
                text-decoration: none;
                font-size: 1.2em;
            }
        }
    }
</style>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import PasswordDialog from "../components/PasswordDialog.vue";

    @Component
    export default class Courses extends Vue {
        public async created() {
            if (!this
                    .$store
                    .state
                    .isLoggedIn) {
                this.$router.push("/");
                return;
            }
        }

        public asyncData({store}) {
            return store.dispatch("getCourses");
        }

        public get courses() {
            return this
                .$store
                .state
                .courses;
        }
    }
</script>
