<template>
    <div class="zuiwai">
        <myAside></myAside>
        <router-view class="router_view"></router-view>
    </div>
</template>

<script>
    import myAside from "./containers/myAside.vue";
    export default {

        data() {
            return {

            };
        },
        components: {
            myAside
        }
    };
</script>

<style scoped lang="less">

    .zuiwai {
        margin-left:250px;
        height: 100%;
        .router_view {
            
        }
    }
</style>