<template>
    <div class="container">
        <div class="details">
            <router-link to="/courses" class="back">&lt; Back to Courses</router-link>
            
            <h2>{{ course.name }}</h2>

            <a class="live" v-bind:href="course.live_link" v-if="course.live_link">
                <font-awesome-icon icon="video"></font-awesome-icon>
                Live Class
            </a>

            <ul>
                <li v-for="clss in classes" :key="clss.id" v-on:click="updateActiveClass(clss)">
                    <span>{{ clss.name }}</span>
                </li>
            </ul>

            <div class="pagination-controls">
                <a href="#" v-on:click.prevent="prevPage()" v-if="hasPrev" class="prev">&lt; Previous</a>
                <a href="#" v-on:click.prevent="nextPage()" v-if="hasNext" class="next">Next &gt;</a>
                <div class="clearfix"></div>
            </div>
        </div>

        <div class="video">
            <iframe v-if="!!activeClass" v-bind:src="'https://youtube.com/embed/' + activeClass.youtube_id" frameBorder="0"></iframe>    
        </div>
    </div>
</template>

<style scoped lang="scss">
$linkColor: #2D74F7;
    .container {
        width: calc(100% - 30px);
        background: #DDD;
        margin: 15px;
        padding: 15px;
        display: flex;
        align-items: stretch;
        flex-wrap: wrap;

        .live {
            text-decoration: none;
            background-color: #CCC;   
            display: block;
            padding: 15px;
            margin: 15px 0;
            color: black;
            transition: background-color .2s, color .2s;

            &:hover {
                background-color: #2D74F7;
                color: white;
            }
        }

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
                        color: $linkColor;
                    }

                    &:hover {
                        cursor: pointer;
                        
                        span {
                            text-decoration: underline;
                        }
                    }
                }
            }

            .pagination-controls {

                a {
                    color: $linkColor;
                    text-decoration: none;
                    display: inline-block;
                    width: 50%;
                    text-align: center;

                    &:hover {
                        text-decoration: underline;
                    }

                    &.prev {
                        float: left;
                    }

                    &.next {
                        float: right;
                    }
                }

                .clearfix {
                    clear: both;
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
    public static readonly INTERVAL: number = 10;

    public activeClass: any = null;

    public page: number = 0;

    public hasPrev: boolean = false;

    public hasNext: boolean = true;

    public mounted() {
        this.activeClass = this.course.classes[0];
        this.page = 0;
        this.recalculatePagination();
    }

    public recalculatePagination() {
        this.hasPrev = this.page > 0;
        this.hasNext = this.course.classes.length > Classes.INTERVAL * (this.page + 1);
    }

    public prevPage() {
        this.page--;
        this.recalculatePagination();
    }

    public nextPage() {
        this.page++;
        this.recalculatePagination();
    }

    public updateActiveClass(clss) {
        this.activeClass = clss;
    }

    public get course() {
        const courseId = this.$route.params.courseId;
        return this.$store.state.courses[courseId];
    }

    public get classes() {
        return this.course?.classes.slice(this.page * Classes.INTERVAL, this.page * Classes.INTERVAL + Classes.INTERVAL) ?? [];
    }
}
</script>