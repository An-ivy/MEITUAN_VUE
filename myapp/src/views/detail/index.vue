<template>
    <div class="scrollBox">
        <div>
            <sellerHeader :seller="seller"></sellerHeader>
            <van-tabs v-model="active" sticky animated swipeable color="#ffda41">
                <van-tab title="菜单">
                    <order></order>
                </van-tab>
                <van-tab title=" 评价">
                    <comment></comment>
                </van-tab>
                <van-tab title="商家">
                    <seller :seller="seller"></seller>
                </van-tab>
            </van-tabs>
        </div>
        <cart v-if="active==0" :seller="seller"></cart>
    </div>
</template>

<script>
import { getStoreByID } from "@/api/home";
import sellerHeader from "./seller-header";
import cart from "./cart";
import order from "./order";
import comment from '../comment/index'
import seller from '../seller/index'
import BScroll from "better-scroll";
export default {
    data() {
        return {
            seller: [],
            active: 0,
            scrollBox: null,
        };
    },
    components: {
        sellerHeader,
        order,
        cart,
        comment,
        seller
    },
    created() {
        this.getStoreMsg();
    },
    mounted() {
        this.scrollBox = new BScroll(".scrollBox", {
            bounce: false,
            click: true,
        });
    },
    methods: {
        getStoreMsg() {
            getStoreByID({ id: this.$route.query.id }).then((res) => {
                console.log("detail", res);
                this.seller = res;
            });
        },
    },
};
</script>

<style lang="sass" scoped>
.scrollBox
    height: 100vh
</style>