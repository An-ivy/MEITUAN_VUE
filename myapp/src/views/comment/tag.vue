<template>
    <div class="tag-box">
        <span v-for="obj in tag" :key="obj.id" @click="changeTab(obj.id)" class="tag-item" :class="{active:currentType==obj.id}">{{obj.name}}({{obj.count}})</span>
    </div>
</template>

<script>
    export default {
        props:["tag","currentType"],
        methods:{
            changeTab(id){
                this.$emit('change',id)
            }
        }
    }
</script>

<style lang="sass" scoped>
@import '@/assets/css/mixin.sass'
.tag-box
    padding: 0.3rem 0.28rem 0.1rem
    .tag-item
        padding: 0 0.24rem
        display: inline-block
        height: 0.52rem
        line-height: 0.52rem
        text-align: center
        font-size: 0.26rem
        color: #666
        margin: 0 0.2rem 0.2rem 0
        @include border-fix(#bbb,0.52rem)
        &.active
            @include border-fix(#ffb000,0.52rem)
            background: #fffbf1
</style>