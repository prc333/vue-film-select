import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from './App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import routes from "./routes.js";
import modules from "./store/modules.js";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);
const store = new Vuex.Store({
    modules
});
const router = new VueRouter(routes);
new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
});