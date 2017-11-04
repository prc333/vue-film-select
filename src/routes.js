import Movie from "./views/movie/index.vue";
import Bar from "./views/bar/index.vue";
import Index from "./views/index/index.vue";
export default {
    routes: [
        { path: '/index', component: Index, name: "index" },
        { path: '/movie', component: Movie, name: "movie" },
        { path: '/bar', component: Bar, name: "bar" },
        { path: '*', redirect: "index" }
    ]
};