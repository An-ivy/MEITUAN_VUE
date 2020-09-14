<template>
    <div>
        <div class="cart-container">
            <!-- shopping cart -->
            <div class="cart-box" @click="isShow=!isShow">
                <div class="cart-icon" :class="{'active':total}">
                    <span class="iconfont icon-cart"></span>
                    <span class="num">10</span>
                </div>
                <div class="cart-price" :class="{'active':total}">
                    <div class="price">￥{{totalPrice}}</div>
                    <div class="deliver">另需配送费￥{{seller.fee}}</div>
                </div>
                <div class="cart-buy" :class="{'active':totalPrice>=seller.price}">{{buyDesc}}</div>
            </div>
            <!-- shopping ball -->
            <div class="ball-box">
                <div v-for="(ball,index) in ballList" :key="index">
                    <transition
                        @before-enter="beforeEnter"
                        @enter="enter"
                        @after-enter="afterEnter"
                    >
                        <div class="ball" v-show="ball.show">
                            <div class="inner"></div>
                        </div>
                    </transition>
                </div>
            </div>
            <!-- shopping list -->
            <transition name="fade">
                <div class="cart-list-box" v-show="isShow && total">
                    <div class="title">
                        <span @click="clearCart()">清空购物车</span>
                    </div>
                    <ul class="list-box">
                        <li class="list" v-for="prod in selectList" :key="prod.id">
                            <span class="name">{{prod.name}}</span>
                            <span class="price">￥{{prod.price}}</span>
                            <add-cart :type="prod.type" :index="prod.index"></add-cart>
                        </li>
                    </ul>
                </div>
            </transition>
        </div>
        <div class="mask" v-show="isShow && total" @click="isShow=!isShow"></div>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import addCart from "@/components/add-cart";
export default {
    data() {
        return {
            isShow: false,
        };
    },
    props: ["seller"],
    components: { addCart },
    computed: {
        ...mapGetters("product", ["totalPrice", "total", "selectList"]),
        ...mapState("ball", ["ballList"]),
        buyDesc() {
            if (this.totalPrice == 0) {
                return `￥${this.seller.price}元起送`;
            } else if (this.totalPrice < this.seller.price) {
                return `还差￥${this.seller.price - this.totalPrice}元起送`;
            } else {
                return "去结算";
            }
        },
    },
    methods: {
        beforeEnter(el) {
            for (let i = 0; i < this.ballList.length; i++) {
                let ball = this.ballList[i];
                if (ball.show) {
                    console.log(
                        "getBoundingClientRect",
                        ball.el.getBoundingClientRect()
                    );
                    let pos = ball.el.getBoundingClientRect();
                    let y = window.innerHeight - pos.top - 23;
                    let x = pos.left - 30;
                    el.display = "";
                    el.style.transform = `translate3d(0,${-y}px,0)`;
                    let inner = el.getElementsByClassName("inner")[0];
                    inner.style.transform = `translate3d(${x}px,0,0)`;
                }
            }
        },
        enter(el, done) {
            el.offsetWidth;
            this.$nextTick(() => {
                el.style.transform = `translate3d(0,0,0)`;
                let inner = el.getElementsByClassName("inner")[0];
                inner.style.transform = `translate3d(0,0,0)`;
                el.addEventListener("transitionend", done);
            });
        },
        afterEnter(el) {
            el.style.display = "none";
            //释放小球
            this.$store.commit("ball/removeBall");
        },
        clearCart() {
            this.$store.commit("product/clearList");
        },
    },
};
</script>

<style lang="sass" scoped>
.cart-container
    position: fixed
    z-index: 80
    left: 0
    bottom: 0
    height: 50px
    background: #3b3b3c
    width: 100%
    .cart-box
        display: flex
        background: #3b3b3c
        .cart-icon
            width: 50px
            height: 50px
            position: absolute
            left: 10px
            top: -10px
            background: #656565
            border-radius: 50%
            text-align: center
            line-height: 50px
        .num
            position: absolute
            right: 0
            top: 0
            width: 30px
            height: 30px
            line-height: 30px
            text-align: center
            background: #fb4e44
            color: #ffffff
            border-radius: 50% 
            transform: scale(0.5) translate(50%,-50%)
        .icon-cart
            font-size: 28px
            color: #c4c4c4
        &.active
            background: #f8c74e
            .icon-cart
                color: #333
        .cart-price
            background: #3b3b3c
            padding-left: 70px
            flex: 1
            color: #999
            .price
                display: none
            .deliver
                line-height: 50px
                font-size: 14px
            &.active
                .price 
                    display: block
                    font-size: 24px
                    color: #ffffff
                    line-height: 33px
                .deliver 
                    font-size: 11px
                    line-height: 16px
        .cart-buy
            width: 108px
            color: #999
            font-size: 14px
            font-weight: bold
            text-align: center
            line-height: 50px
            &.active
                background: #f8c74e
                font-size: 18px
                color: #333
                font-weight: normal
    .ball
        position: fixed
        left: 30px
        bottom: 23px
        transition: all 0.4s cubic-bezier(0.48, -0.28, 0.73, 0.42)
        .inner
            width: 16px
            height: 16px
            background: #00a0dc
            border-radius: 50%
            transition: all 0.4s linear
    .cart-list-box
        position: absolute
        left: 0
        bottom: 50px
        z-index: -1
        background: #ffffff
        width: 100%
        border: 1px solid #e4e4e4
        .title
            height: 20px
            line-height: 30px
            padding: 0 10px
            text-align: right
            font-size: 12px
            color: #2c3e50
            background: #f4f4f4
        .list-box
            padding: 0 10px
            .list 
                padding: 14px 0
                border-bottom: 1px solid #e4e4e4
                display: flex
                .name
                    flex: 1
                    min-width: 0
                    overflow: hidden
                    text-overflow: ellipsis
                    white-space: nowrap
                .price 
                    color: #fb4e44
                    padding: 0 25px
    .fade-enter
        transform: translateY(100%)
    .fade-enter-active
        transition: transform ease 2s
    .fade-enter-to
        transform: translateY(0)
.mask
    position: fixed
    left: 0
    top: 0
    right: 0
    bottom: 0
    background: rgba(7,17,27,0.6)
    backdrop-filter: blur(10px)
    z-index: 50
</style>