<template>
    <div class="container">
        <div class="details">
            <router-link to="/courses" class="back">&lt; Back to Courses</router-link>
            
            <h2>{{ course.name }}</h2>
            <ul>
                <li v-for="clss in course.classes" :key="clss.id" v-on:click="updateActiveClass(clss)">
                    <span>{{ clss.name }}</span>
                </li>
            </ul>
        </div>

        <div class="video">
            <iframe v-if="!!activeClass" v-bind:src="'https://youtube.com/embed/' + activeClass.youtube_id"></iframe>    
        </div>
    </div>
</template>

<style scoped lang="scss">
    .container {
        width: calc(100% - 30px);
        background: #DDD;
        margin: 15px;
        padding: 15px;
        display: flex;
        align-items: stretch;
        flex-wrap: wrap;

        .details {
            flex-basis: 30%;
            flex-grow: 1;
            padding: 15px;
            min-width: 350px;

            .back {
                color: #2D74F7;
                margin: 15px 0;
                display: inline-block;
                text-decoration: none;

                &:hover {
                    text-decoration: underline;
                    cursor: pointer;
                }
            }

            ul {
                padding: 15px;

                li {

                    span {
                        color: #2D74F7;
                    }

                    &:hover {
                        cursor: pointer;
                        
                        span {
                            text-decoration: underline;
                        }
                    }
                }
            }
        }

        .video {
            flex-basis: 70%;
            flex-grow: 1;
            position: relative;
            min-width: 300px;
            
            iframe {
                width: 100%;
                height: 500px;
                border: none;
            }
        }
    }
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Classes extends Vue {

    public activeClass: any = null;

    public mounted() {
        this.activeClass = this.course.classes[0];
    }

    public updateActiveClass(clss) {
        this.activeClass = clss;
    }

    public get course() {
        const courseId = this.$route.params.courseId;
        return this.$store.state.courses[courseId];
    }
}
</script>