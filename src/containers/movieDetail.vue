<style scoped lang="less">
    .movieDetail {
        padding: 10px;
        .banner {
            position: relative;
            height: 350px;
            background: url(http://ms0.meituan.net/mywww/banner_bg.f7fd103e3b8c16b6f449cce43fc57f45.png) center center no-repeat;
            background-size: cover;
            p.img {
                position: absolute;
                left: 67px;
                top: 55px;
                padding: 5px;
                background-color: #fff;
                img {
                    width: 240px;
                }
            }
            .jianjie {
                position: absolute;
                left: 367px;
                top: 55px;
                color: #fff;
                .btns {
                    p {
                        overflow: hidden;
                        .btn_top {
                            float: left;
                            width: 100px;
                            background-color: rgba(255, 255, 255, 0.5);
                            color: #fff;
                        }
                        .btn_bottom {
                            width: 210px;
                        }
                    }
                }
                .qita {
                    position: absolute;
                    width: 200px;
                    left: 231px;
                    top: 165px;
                    .txt_big {
                        font-size: 20px;
                    }
                }
            }
        }
        .movieDetail_main {
            margin-top: 50px;
            .movieDetail_content {
                h3 {
                    position: relative;
                    padding-left: 10px;
                    &::after {
                        content: "";
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 4px;
                        height: 100%;
                        background-color: #f03d37;
                    }
                }
                h5 {
                    text-align: center;
                }
                .daoyan,
                .yanyuan {
                    overflow: hidden;
                    .img {
                        float: left;
                        margin-right: 10px;
                    }
                }
                .tuji {
                    img {
                        float: left;
                        margin-right: 10px;
                        margin-bottom: 10px;
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="movieDetail">
        <p>
            <el-button type="primary" @click="goBack">后退</el-button>
        </p>
        <div class="banner">
            <p class="img">
                <img :src="nowMovie.bigPic" alt="">
            </p>
            <div class="jianjie">
                <h3>{{nowMovie.name}}</h3>
                <h3>{{nowMovie.ename}}</h3>
                <p>{{nowMovie.type && nowMovie.type.toString()}}</p>
                <p>{{nowMovie.section}} / {{nowMovie.duringTime}}</p>
                <p>{{nowMovie.startTime}}上映</p>
                <div class="btns">
                    <p>
                        <el-button class="btn_top">
                            <i class="glyphicon glyphicon-heart"></i>
                            想看
                        </el-button>
                        <el-button class="btn_top">
                            <i class="glyphicon glyphicon-star"></i>
                            评分
                        </el-button>
                    </p>
                    <p>
                        <el-button type="danger" class="btn_bottom" @click="buy">立即购买</el-button>
                    </p>
                </div>
                <div class="qita">
                    <div class="score">
                        <span>用户评分：</span>
                        <el-rate :value="_score" disabled show-score text-color="#ff9900" score-template="{value}">
                        </el-rate>
                    </div>
                    <div class="piaofang">
                        <span>累计票房：</span>
                        <br/>
                        <span>
                            <b class="txt_big">{{nowMovie.piaoFang}}</b>{{nowMovie.piaoFangDanWei}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="movieDetail_main">
            <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">介绍</el-menu-item>
                <el-menu-item index="2">演职人员</el-menu-item>
                <el-menu-item index="3">图集</el-menu-item>
            </el-menu>
            <div class="line"></div>
            <div class="movieDetail_content" v-if="tabs == 1">
                <h3>剧情简介</h3>
                <p>
                    {{nowMovie.jieShao}}
                </p>
            </div>
            <div class="movieDetail_content" v-if="tabs == 2">
                <h3>演职人员</h3>
                <div>
                    <div class="daoyan">
                        <p>导演</p>
                        <div class="img">
                            <img :src="nowMovie.daoYan.pic" alt="">
                            <h5>{{nowMovie.daoYan.name}}</h5>
                        </div>
                    </div>
                    <p>演员</p>
                    <div class="yanyuan">
                        <div class="img" v-for="item in nowMovie.yanYuan" :key="item.name">
                            <img :src="item.pic" alt="">
                            <h5>{{item.name}}</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div class="movieDetail_content" v-if="tabs == 3">
                <h3>图集</h3>
                <p class="tuji">
                    <img v-for="item in nowMovie.tuJi" :key="item.picurl" :src="item.picurl" alt="">

                </p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tabs: 1
            };
        },
        computed: {
            nowMovie() {
                return this.$store.state.selectMovie.nowMovie;
            },
            _score() {
                return Number((this.$store.state.selectMovie.nowMovie.score / 2).toFixed(1));
            }

        },
        mounted() {
            this.$store.dispatch("selectMovie/FETCHNOWMOVIE");
        },
        methods: {
            goBack() {
                this.$store.commit("selectMovie/CHANGENOWMOVIEID", {
                    id: "",
                    value: 1
                });
            },
            handleSelect(key, keyPath) {
                this.tabs = key;
            },
            buy() {
                this.$store.commit("selectMovie/CHANGESTEP1", {
                    value: 3
                });
            }
        }
    };
</script>