<style>

</style>
<template>
    <div>
        <el-steps :active="now_step" finish-status="success" simple style="margin-top: 20px">
            <el-step title="查看资讯"></el-step>
            <el-step title="在线选座"></el-step>
            <el-step title="支付订单"></el-step>
            <el-step title="影院取票"></el-step>
        </el-steps>
        <select-movie v-if="$store.state.selectMovie.step1 == 1"></select-movie>
        <movieDetail v-if="$store.state.selectMovie.step1 == 2"></movieDetail>
        <selectCinema v-if="$store.state.selectMovie.step1 == 3"></selectCinema>
        <selectChangCi v-if="$store.state.selectMovie.step1 == 4"></selectChangCi>
        <selectSeat v-if="$store.state.selectMovie.step1 == 5"></selectSeat>
        <zhiFu v-if="$store.state.selectMovie.step1 == 6"></zhiFu>
        <quPiao v-if="$store.state.selectMovie.step1 == 7"></quPiao>
    </div>
</template>
<script>
import selectMovie from "../../containers/selectMovie.vue";
import movieDetail from "../../containers/movieDetail.vue";
import selectCinema from "../../containers/selectCinema.vue";
import selectChangCi from "../../containers/selectChangCi.vue";
import selectSeat from "../../containers/selectSeat.vue";
import zhiFu from "../../containers/zhiFu.vue";
import quPiao from "../../containers/quPiao.vue";
    export default {
        data() {
            return {
                
            }
        },
        computed:{
            now_step(){
                return this.$store.state.selectMovie.now_step;
            }
        },
        components: {
            selectMovie,movieDetail,
            selectCinema,selectChangCi,
            selectSeat,zhiFu,
            quPiao
        }
    }
</script>