<style scoped lang="less">
    .quPiao {
        padding: 10px;
        b.red {
            font-size: 30px;
            color: red;
        }
    }
</style>
<template>
    <div class="quPiao">
        <p>
            <el-button type="primary" @click="goBack">后退</el-button>
        </p>

        <h4 class="text-center">详细信息已经发送到手机：
            <b class="red">{{telephone}}</b>上，请凭借该信息到电影院取票入场！</h4>

        <p class="text-center">
            <el-button type="primary" @click="reload">去主页</el-button>
        </p>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            };
        },
        methods: {
            goBack() {
                this.$store.commit("selectMovie/CHANGENOWSTEP", {
                    value: 2
                });
                this.$store.commit("selectMovie/CHANGESTEP1", {
                    value: 6
                })
            },
            reload() {
                window.location.reload();
            }
        },
        computed: {
            telephone() {

                return this.$store.state.selectMovie.zhiFuObj.telephone;
            }
        }
    };
</script>