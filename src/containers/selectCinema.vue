<style scoped lang="less">
    .selectCinema {
        padding: 10px;
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
        >h3 {
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
        .cinema_list {
            overflow: hidden;
            padding-top: 20px;
            border-bottom: 1px dashed #eee;
            .left {
                float: left;
                p {
                    font-size: 16px;
                }
                address {
                    color: #aaa;
                }
            }
            .right {
                float: right;
                .red {
                    font-size: 20px;
                    color: #f03d37;
                }
                i {
                    color: #aaa;
                }
                .xuanZuo {
                    margin-left: 50px;
                }
            }
        }
    }
</style>
<template>
    <div class="selectCinema">
        <p>
            <el-button type="primary" @click="goBack">后退</el-button>
        </p>
        <header class="header">
            <h3>行政区:</h3>
            <ul class="type">
                <li v-for="item in header.xingZheng" :key="item" :class="{'cur': filters.xingZheng == item}" @click="changType('xingZheng',item)">
                    <a href="javascript:void(0);">{{item}}</a>
                </li>
            </ul>
            <h3>特殊厅:</h3>
            <ul class="type">
                <li v-for="item in header.ting" :key="item" :class="{'cur':filters.ting == item}" @click="changType('ting',item)">
                    <a href="javascript:void(0);">{{item}}</a>
                </li>
            </ul>
        </header>
        {{this.$store.state.selectCinema.nowCinema}}
        <h3>影院列表</h3>
        <div class="cinema_list" v-for="item in cinemas" :key="item.id">
            <div class="left">
                <p>{{item.name}}</p>
                <address>地址：{{item.address}}</address>
            </div>
            <div class="right">
                <span class="red">￥{{item.price}}</span>
                <i>起</i>
                <el-button type="danger" round class="xuanZuo" @click="xuanZuoGouPiao(item.id)">选座购票</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                filters: {
                    xingZheng: "全部",
                    ting: "全部"
                },
                header: {
                    "xingZheng": ["全部", "地铁附近", "朝阳区", "海淀区", "丰台区",
                        "大兴区", "东城区", "西城区", "通州区", "房山区", "昌平区", "顺义区", "怀柔区", "门头沟", "石景山区", "平谷区", "密云区", "延庆区"
                    ],
                    "ting": ["全部", "IMAX厅", "中国巨幕厅", "杜比全景声厅", "杜比影院", "RealD厅", "RealD 6FL厅", "LUXE巨幕厅", "巨幕厅", "4D厅",
                        "4K厅", "4DX厅"
                    ]
                }
            };
        },
        computed: {
            cinemas() {
                return this.$store.state.selectCinema.cinemas.list;
            }
        },
        created() {
            this.$store.dispatch("selectCinema/FETCHCINEMAS", {
                ting: "全部",
                xingZheng: "全部",
                nowMovieId: this.$store.state.selectMovie.nowMovieId
            })
        },
        methods: {
            goBack() {
                this.$store.commit("selectMovie/CHANGESTEP1", {
                    value: 2
                });
            },
            changType(key, value) {
                this.filters[key] = value;
                this.$store.dispatch("selectCinema/FETCHCINEMAS", {
                    ting: this.filters.ting,
                    xingZheng: this.filters.xingZheng,
                    nowMovieId: this.$store.state.selectMovie.nowMovieId
                });
            },
            xuanZuoGouPiao(id) {
                this.$store.dispatch("selectCinema/FETCHNOWCINEMA", {
                    id
                });
                this.$store.commit("selectMovie/CHANGESTEP1", {
                    value: 4
                })
            }
        }
    };
</script>