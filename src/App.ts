import "@babel/polyfill";

import Vue from 'vue';
import Component from 'vue-class-component';
import PasswordDialog from './components/PasswordDialog.vue';
import VueRouter from "vue-router";
import Vuex from 'vuex';
import Router from "./Router";
import Store from './Store';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.component('password-dialog', PasswordDialog);

function notifyParentOfResize() {
    if(!('parent' in window)) {
        return;
    }

    const height = document.body.scrollHeight;
    parent.postMessage({ height }, '*');
}

notifyParentOfResize();
window.addEventListener('resize', notifyParentOfResize);

Router.beforeResolve((to, from, next) => {
    const matched = Router.getMatchedComponents(to) as any[];

    Promise.all(matched.map(c => {
        const methods = c.options.methods;
        
        if(typeof methods !== "undefined" && typeof methods.asyncData !== "undefined") {
            return methods.asyncData({ store: Store, route: to });
        }
    }))
        
    .then(() => next())
    .catch(() => new Error("404 Not Found"));
}); 

new Vue({
    el: '#container',
    router: Router,
    store: Store
});