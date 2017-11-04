<style scoped lang="less">
    header {
        h3 {
            padding-left: 20px;
            font-size: 16px;
        }
        border: 1px solid #eee;
        padding:10px;
        margin: 10px;
        ul {
            overflow: hidden;
            list-style: none;
            padding-bottom: 10px;
            border-bottom: 1px solid #eee;
            li {
                padding: 5px;
                float: left;
                margin-right: 10px;
                a {
                    text-decoration: none;
                    display: block;
                }
                &.cur {
                    background-color: #f34d41;
                    border-radius: 20px;
                    a {
                        color: #fff;
                    }
                }
            }
        }
    }

    .content {
        padding: 10px;
        overflow: hidden;
        .show {
            float: left;
            text-align: center;
            padding: 10px;
            p {
                img {
                    width: 160px;
                    height: 220px;
                }
                &.name {
                    font-weight: bold;
                    font-size: 16px;
                }
                &.score {
                    i {
                        color: goldenrod;
                    }
                }
            }
        }
    }
</style>
<template>
    <div>
        <header>
            <h3>类型:</h3>
            <ul class="type">
                <li v-for="item in header.type" :key="item" :class="{'cur': filters.type == item}" @click="changType('type',item)">
                    <a href="javascript:void(0);">{{item}}</a>
                </li>
            </ul>
            <h3>区域:</h3>
            <ul class="type">
                <li v-for="item in header.section" :key="item" :class="{'cur':filters.section == item}" @click="changType('section',item)">
                    <a href="javascript:void(0);">{{item}}</a>
                </li>
            </ul>
        </header>
        <section class="content">
            <div class="show" v-for="item in movieList" :key="item.id">
                <p>
                    <a href="javascript:void(0);" @click="clickHandler(item.id)">
                        <img :src="item.pic" alt="">
                    </a>
                </p>
                <p class="name">
                    <a href="javascript:void(0);" @click="clickHandler(item.id)">{{item.name}}</a>
                </p>
                <p class="score">
                    <i>{{item.score}}</i>
                </p>
            </div>
        </section>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                header: {
                    type: ["全部", "爱情", "喜剧", "动画", "剧情", "恐怖", "惊悚", "科幻", "动作", "悬疑", "犯罪", "冒险", "战争", "奇幻", "运动",
                        "家庭", "古装"
                    ],
                    section: ["全部", "大陆", "美国", "韩国", "日本", "中国香港", "中国台湾", "泰国", "印度", "法国", "英国", "俄罗斯"]
                },
            };
        },
        mounted() {
            this.$store.dispatch("selectMovie/FETCHDATA");
        },
        computed: {
            filters() {
                return this.$store.state.selectMovie.filters;
            },
            movieList() {
                return this.$store.state.selectMovie.movies.list;
            }
        },
        methods: {
            changType(key, value) {
                this.$store.dispatch("selectMovie/CHANGEFILTERS", {
                    key,
                    value
                });
            },
            clickHandler(id) {
                this.$store.commit("selectMovie/CHANGENOWMOVIEID",{id,value:2});
                // this.$store.commit("selectMovie/CHANGESTEP1",{value:2})
            }
        }
    };
</script>