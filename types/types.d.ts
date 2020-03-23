import { Store } from 'vuex';
import VueRouter from 'vue-router';

declare module "vue/types/vue" {
    export interface Vue {
        $store: Store<any>;
        $router: VueRouter;
        $route: any;
    }

    interface VueConstructor {
        store: Store<any>;
        router: VueRouter;
    }
}