export default {
    selectMovie: {
        namespaced: true,
        state: {
            filters: {
                type: "全部",
                section: "全部"
            },
            movies: {
                list: []
            },
            now_step: 0,
            step1: 1,
            nowMovieId: "",
            nowMovie: {},
            zhiFuObj: {}
        },
        getters: {

        },
        mutations: {
            CHANGEFILTERS(state, payload) {
                state.filters[payload.key] = payload.value;
            },
            FETCHDATA(state, payload) {
                state.movies.list = payload;
            },
            CHANGENOWMOVIEID(state, payload) {
                state.nowMovieId = payload.id;
                state.step1 = payload.value;
            },
            FETCHNOWMOVIE(state, payload) {
                state.nowMovie = payload;
            },
            CHANGESTEP1(state, payload) {
                state.step1 = payload.value;
            },
            CHANGENOWSTEP(state, payload) {
                state.now_step = payload.value;
            },
            ZHIFUOBJ(state, payload) {
                state.zhiFuObj = payload;
            }
        },
        actions: {
            async CHANGEFILTERS(context, payload) {
                context.commit("CHANGEFILTERS", payload);
                context.dispatch("FETCHDATA");
            },
            async FETCHDATA(context, payload) {
                let { type, section } = context.state.filters;
                let data = await fetch(`/movieList?type=${type}&section=${section}`).then(data => data.json());
                context.commit("FETCHDATA", data);
            },
            async FETCHNOWMOVIE(context, payload) {
                let id = context.state.nowMovieId;
                let data = await fetch(`/movies/${id}`).then(data => data.json());
                context.commit("FETCHNOWMOVIE", data);
            },
            async ZHIFUOBJ(context, payload) {
                context.commit("ZHIFUOBJ", payload)
            }
        }
    }
}