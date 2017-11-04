<style scoped lang="less">
    .my-aside {
        position: fixed;
        left: 0;
        top: 0;
        width: 250px;
        height: 100%;
        background-color: #272822;
        color: #fff;
        .touxiang {
            width: 100px;
            height: 100px;
            margin: 0 auto;
            overflow: hidden;
            border-radius: 50%;
            position: relative;
            img {
                position: absolute;
                width: 100%;
                height: 100%;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 100%;
            }
        }
        h3 {
            font-size: 14px;
        }
        .el-menu-vertical-demo {
            width: 100%;
            border-right: 0;
        }
    }
</style>
<template>
    <div class="my-aside">
        <div class="touxiang ">
            <img src="/image/morentouxiang.jpg" alt="">
        </div>
        <h3 class="text-center">用户名</h3>
        <el-menu :default-active="$route.name" class="el-menu-vertical-demo" background-color="#272822" text-color="#fff" active-text-color="#ffd04b"
            @open="handleOpen" @close="handleClose" router>
            <el-menu-item index="index">
                <i class="el-icon-menu"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="movie">
                <i class="el-icon-menu"></i>
                <span slot="title">电影</span>
            </el-menu-item>
            <el-menu-item index="bar">
                <i class="el-icon-setting"></i>
                <span slot="title">导航三</span>
            </el-menu-item>
        </el-menu>
        </el-col>
        </el-row>

    </div>
</template>
<script>
    export default {
        data() {
            return {

            };
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    };
</script>