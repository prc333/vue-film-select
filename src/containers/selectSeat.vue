<style scoped lang="less">
    .selectSeat {
        padding: 10px;
        .content {
            width: 1000px;
            overflow: hidden;
            .left {
                float: left;
                width: 700px;
                .seatShow {
                    .myRow {
                        position: relative;
                        height: 40px;
                        .xunHao {
                            float: left;
                        }
                        .zuo_hang {
                            position: absolute;
                            left: 135px;
                            top: 0;
                            height: 40px;
                            .zuo_lie {
                                float: left;
                                box-sizing: content-box;
                                width: 30px;
                                height: 26px;
                                padding: 7px;
                                background: url(/image/whiteSeat.png) no-repeat center center;
                                &.red {
                                    background-image: url(/image/redSeat.png);
                                }
                                &.green {
                                    background-image: url(/image/greenSeat.png);
                                }
                            }
                        }
                    }
                }
            }
            .right {
                float: right;
                width: 300px;
                .jieshao {
                    overflow: hidden;
                    .m_img {
                        float: left;
                        margin-right: 10px;
                    }
                    .m_txt {
                        float: left;
                    }
                }
                .zuowei_show {
                    &::after {
                        content: ".";
                        display: block;
                        clear: both;
                        height: 0;
                        visibility: hidden;
                    }
                    .zuowei_piao {
                        position: relative;
                        float: left;
                        margin-right: 10px;
                        margin-bottom: 10px;
                        width: 70px;
                        height: 30px;
                        border: 1px solid red;
                        color: red;
                        text-align: center;
                        line-height: 30px;
                        cursor: pointer;
                        &::before {
                            content: "";
                            position: absolute;
                            left: -5px;
                            top: 50%;
                            width: 10px;
                            height: 10px;
                            transform: translateY(-50%) rotate(-45deg);
                            border-radius: 50%;
                            border-right: 1px solid red;
                            border-bottom: 1px solid red;
                            border-top: 1px solid transparent;
                            border-left: 1px solid transparent;
                            background-color: #fff;
                        }
                        b {
                            display: none;
                            position: absolute;
                            right: -10px;
                            top: -10px;
                            width: 20px;
                            height: 20px;
                            background-color: rgba(0, 0, 0, 0.5);
                            text-align: center;
                            line-height: 20px;
                            border-radius: 50%;
                            color: #fff;
                        }
                        &:hover {
                            b {
                                display: block;
                            }
                        }
                    }
                }
                .zongjia {
                    span {
                        font-size: 20px;
                        color: red;
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="selectSeat">
        <p>
            <el-button type="primary" @click="goBack">后退</el-button>
        </p>
        <!-- <p>{{nowMoiveId}}</p>
        <p>{{nowCinemaId}}</p>
        <p>{{day}}</p>
        <p>{{changCiId}}</p>
        <p>{{this.$store.state.selectMovie.nowMovie}}</p>
        <p>{{this.$store.state.selectCinema.nowCinema}}</p> -->
        <div class="content">
            <div class="left">
                <div class="pingmu text-center">
                    <img src="/image/tt1.gif" alt="">
                </div>
                <div class="seatShow">
                    <div class="myRow" v-for="(item,index) in nowChangCi.seat" :key="index">
                        <span class="xunHao">{{index+1}}</span>
                        <div class="zuo_hang">
                            <div v-for="(_item,_index) in item" :key="_index" :data-hang="index" :data-lie="_index" :data-item="_item" :class="['zuo_lie',{'red':_item!=null}]"
                                @click="selectSeat(_item,index,_index,$event)"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="jieshao">
                    <p class="m_img">
                        <img :src="nowMovie.pic" alt="">
                    </p>
                    <div class="m_txt">
                        <h4>{{nowMovie.name}}</h4>
                        <p>
                            类型:{{nowMovie.type && nowMovie.type.toString()}}
                        </p>
                        <p>
                            时长:{{nowMovie.duringTime}}
                        </p>
                    </div>
                </div>
                <p>
                    影院：{{nowCinema.name}}
                </p>
                <p>
                    影厅：{{nowChangCi.ting}}
                </p>
                <p>
                    版本：{{nowChangCi.language}}
                </p>
                <p>
                    场次：{{showDay}}{{nowChangCi.time}}
                </p>
                <p>
                    票价：￥{{nowChangCi.price}}/张
                </p>
                <hr/>
                <p>
                    座位：
                </p>
                <p class="zuowei_show">

                    <span class="zuowei_piao" v-for="item in piaos" :key="item.name">
                        {{item.name}}
                        <b @click="removePiao(item.hang,item.lie)">x</b>
                    </span>

                </p>
                <p class="zongjia">
                    总价：
                    <span>￥{{(piaos.length*nowChangCi.price).toFixed(1)}}</span>
                </p>
                <p>
                    输入手机号:
                    <input type="text" class="form-control" v-model="telephone">
                </p>
                <p>
                    <el-button type="danger" round class="xuanZuo" @click="quZhiFu">去支付</el-button>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                piaos: [],
                telephone: ""
            };
        },
        computed: {
            nowMoiveId() {
                return this.$store.state.selectMovie.nowMovieId;
            },
            nowCinemaId() {
                return this.$store.state.selectCinema.nowCinemaId;
            },
            day() {
                return this.$store.state.selectCinema.day;
            },
            showDay() {
                if (this.day == 0) {
                    var now = new Date();
                    return "今天 " + (now.getMonth() + 1) + "月" + now.getDate() + "号";
                } else if (this.day == 1) {
                    var now = new Date();
                    var next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
                    return "明天 " + (next.getMonth() + 1) + "月" + next.getDate() + "号";

                }
            },
            changCiId() {
                return this.$store.state.selectCinema.changCiId;
            },
            nowMovie() {
                return this.$store.state.selectMovie.nowMovie;
            },
            nowCinema() {
                return this.$store.state.selectCinema.nowCinema;
            },
            nowChangCi() {
                var movies = this.nowCinema.movies;
                for (var j = 0; j < movies.length; j++) {
                    if (movies[j].id == this.nowMoiveId) {
                        var arr = movies[j].ChangCi[this.day].ChangCi;
                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i].id == this.changCiId) {
                                return arr[i];
                            }
                        }
                    }
                }
                return;
            }
        },
        methods: {
            goBack() {
                this.$store.commit("selectMovie/CHANGENOWSTEP", {
                    value: 0
                });
                this.$store.commit("selectMovie/CHANGESTEP1", {
                    value: 4
                })
            },
            selectSeat(item, hang, lie, evnet) {
                if (item == null) {
                    if ($(event.target).hasClass("green")) {
                        this.piaos = this.piaos.filter((i) => {
                            return i.hang != hang || i.lie != lie;
                        });
                        $(event.target).removeClass("green");
                    } else {
                        this.piaos.push({
                            hang,
                            lie,
                            name: (hang + 1) + "排" + (lie + 1) + "座"
                        });
                        $(event.target).addClass("green");
                    }

                }
            },
            removePiao(hang, lie) {
                this.piaos = this.piaos.filter((i) => {
                    return i.hang != hang || i.lie != lie;
                });
                $(".seatShow").find(".zuo_hang").eq(hang).find(".zuo_lie").eq(lie).removeClass("green");
            },
            quZhiFu() {
                var zhiFuObj = {
                    piaos: this.piaos,
                    nowMoiveId: this.nowMoiveId,
                    nowCinemaId: this.nowCinemaId,
                    day: this.day,
                    changCiId: this.changCiId,
                    telephone: this.telephone
                }
                console.log(zhiFuObj);
                this.$store.dispatch("selectMovie/ZHIFUOBJ",zhiFuObj)
                this.$store.commit("selectMovie/CHANGENOWSTEP", {
                    value: 2
                });
                this.$store.commit("selectMovie/CHANGESTEP1", {
                    value: 6
                });
               
            }
        }
    };
</script>