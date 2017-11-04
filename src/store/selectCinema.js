export default {
    selectCinema: {
        namespaced: true,
        state: {
            filters: {
                xingZheng: "全部",
                ting: "全部"
            },
            cinemas: {
                list: []
            },
            nowCinemaId: "",
            nowCinema: {},
            changCiId: "",
            day: ""
        },
        getters: {

        },
        mutations: {
            FETCHCINEMAS(state, payload) {
                state.cinemas.list = payload.data;
                state.filters.xingZheng = payload.xingZheng;
                state.filters.ting = payload.ting;
            },
            FETCHNOWCINEMA(state, payload) {
                state.nowCinema = payload;
                state.nowCinemaId = payload.id;
            },
            CHANGECHANGCI(state, payload) {
                state.changCiId = payload.changCiId;
                state.day = payload.day;
            }
        },
        actions: {
            async FETCHCINEMAS(context, payload) {
                let {
                    xingZheng,
                    ting,
                    nowMovieId
                } = payload;
                let data = await fetch(`/cinemaList?xingZheng=${xingZheng}&ting=${ting}&nowMovieId=${nowMovieId}`).then(data => data.json());
                context.commit("FETCHCINEMAS", {
                    data,
                    xingZheng,
                    ting
                });
            },
            async FETCHNOWCINEMA(context, payload) {
                let data = await fetch(`/cinemas/${payload.id}`).then(data => data.json());
                context.commit("FETCHNOWCINEMA", data);
            }
        }
    }
}