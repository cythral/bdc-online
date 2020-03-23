import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

Vue.use(Vuex);

export default new Vuex.Store<any>({
    state: {
        password: null,
        isLoggedIn: false,
        courses: {}
    },
    mutations: {
        reset(state) {
            Vue.set(state, "password", null);
            Vue.set(state, "isLoggedIn", false);
            Vue.set(state, 'courses', {});
        },

        addCourse(state, course) {
            console.log('adding course', course);
            Vue.set(state.courses, course.id, course);
            console.log('add course done');
        }
    },
    actions: {
        async getCourses({ commit }) {
            const token = btoa(`bdc:${this.state.password}`);
            const response = await fetch(`${process.env.CLASSES_ADDRESS}/courses`, {
                headers: {
                    Authorization: `Basic ${token}`
                }
            });

            const courses = await response.json();
            for(let course of courses) {
                commit('addCourse', course);
            }
        }
    },
    plugins: [(new VuexPersist({ key: 'bdc-classes', storage: window.sessionStorage })).plugin]
})