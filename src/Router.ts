import VueRouter from 'vue-router';
import Login from './routes/Login.vue';
import Courses from './routes/Courses.vue';
import Classes from './routes/Classes.vue';

export default new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Login },
        { name: 'courses', path: "/courses", component: Courses },
        { name: 'classes', path: '/courses/:courseId', component: Classes }
    ]
});
