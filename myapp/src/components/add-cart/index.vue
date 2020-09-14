<template>
  <div class="add-cart">
    <span class="iconfont icon-less" v-if="product.count" @click="reduceCart"></span>
    <span class="num" v-if="product.count">{{product.count}}</span>
    <span class="iconfont icon-add" @click="addCart($event)"></span>
  </div>
</template>

<script>
export default {
  props: ['type', 'index'],
  computed:{
      product(){
          return this.$store.state.product.productList[this.type].content[this.index]
      }
  },
  methods: {
    addCart(e) {
        this.$store.commit('product/addCart',{type:this.type,index:this.index})
        this.$store.commit('ball/show',e.target)
    },
    reduceCart(){
        this.$store.commit('product/reduceCart',{type:this.type,index:this.index})
    }
  },
};
</script>

<style lang="sass" scoped>
.add-cart
    .iconfont
        font-size: 0.48rem
        padding: 0.18rem
        border-radius: 50%
        vertical-align: middle
    .num 
        vertical-align: middle
    .icon-add
        background: #ffc134
        margin-right: -0.18rem
    .icon-less
        background: #e2e3e5
</style>