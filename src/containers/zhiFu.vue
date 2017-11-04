<style scoped lang="less">
    .zhiFu{
        padding:10px;
    }
</style>
<template>
    <div class="zhiFu">
         <p>
            <el-button type="primary" @click="goBack">后退</el-button>
        </p>
        <p class="text-center">
            <img src="/image/1509714734.png" alt="">
        </p>
        <p class="text-center">
             <el-button type="primary" @click="zhiFuDone">支付成功</el-button> 
        </p>
    </div>
</template>
<script>
    export default {
        data(){
            return {

            }
        },
        methods:{
            goBack(){
                this.$store.commit("selectMovie/CHANGENOWSTEP", {
                    value: 1
                });
                this.$store.commit("selectMovie/CHANGESTEP1", {
                    value: 5
                })
            },
            zhiFuDone(){
                this.$store.commit("selectMovie/CHANGENOWSTEP", {
                    value: 3
                });
                this.$store.commit("selectMovie/CHANGESTEP1", {
                    value: 7
                });
            }
        }
    }
</script>