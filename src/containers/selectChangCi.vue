<style scoped lang="less">
    .selectChangCi {
        padding: 10px;
        .liebiao {
            table {
                width: 100%;
                text-align: center;
                tr,
                th,
                td {
                    height: 50px;
                    font-size: 14px;
                    text-align: center;
                    &.grey {
                        background-color: #eee;
                    }
                }
            }
        }
        .xuanTian {
            list-style: none;
            overflow: hidden;
            padding: 10px;
            li {
                float: left;
                padding: 5px 10px;
                cursor: pointer;
                &.cur {
                    background-color: red;
                    border-radius: 10px;
                    color: #fff;
                }
            }
        }
    }
</style>
<template>
    <div class="selectChangCi">
        <p>
            <el-button type="primary" @click="goBack">后退</el-button>
        </p>
        <h4>观影时间：</h4>
        <ul class="xuanTian">
            <li :class="{cur:day == 0}" @click="changeDay(0)">今天{{nowDay}}</li>
            <li :class="{cur:day == 1}" @click="changeDay(1)">明天{{nextDay}}</li>
        </ul>
        <div class="liebiao">
            <table>
                <tbody>
                    <tr class="grey">
                        <th>放映时间</th>
                        <th>语言版本</th>
                        <th>放映厅</th>
                        <th>售价（元）</th>
                        <th>选座购票</th>
                    </tr>
                    <tr v-for="item in list" :key="item.id">
                        <td>{{item.time}}</td>
                        <td>{{item.language}}</td>
                        <td>{{item.ting}}</td>
                        <td>{{item.price}}</td>
                        <td>
                            <el-button type="danger" round class="xuanZuo" @click="xuanZuoGouPiao(item.id)">选座购票</el-button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                day: 0
            };
        },
        methods: {
            goBack() {
                this.$store.commit("selectMovie/CHANGESTEP1", {
                    value: 3
                });
            },
            changeDay(n) {
                this.day = n;
            },
            xuanZuoGouPiao(changCiId) {
                this.$store.commit("selectCinema/CHANGECHANGCI", {
                    changCiId,
                    day: this.day
                });
                this.$store.commit("selectMovie/CHANGESTEP1", {
                    value: 5
                });
                this.$store.commit("selectMovie/CHANGENOWSTEP", {
                    value: 1
                });
            }
        },
        computed: {
            nowDay() {
                var now = new Date();
                return (Number(now.getMonth()) + 1) + "月" + now.getDate();
            },
            nextDay() {
                var now = new Date();
                var next = new Date(now.getFullYear(), now.getMonth(), Number(now.getDate()) + 1)
                return (Number(next.getMonth()) + 1) + "月" + next.getDate();
            },
            list() {
                var arr = this.$store.state.selectCinema.nowCinema.movies;
                if (!arr) return;
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].id == this.$store.state.selectMovie.nowMovieId) {
                        return arr[i].ChangCi[this.day].ChangCi;
                    }
                }

                return;
            }
        }
    };
</script>