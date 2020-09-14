<template>
    <div class="list-box">
        <ul class="content">
            <li class="list" v-for="obj in list" :key="obj.id">
                <div class="img-box">
                    <img :src="obj.portrait" alt="">
                </div>
                <div class="info-box">
                    <div class="basic">
                        <span class="name">{{obj.name}}</span>
                        <span class="date">{{obj.time}}</span>
                    </div>
                    <div class="time">{{obj.duration}}</div>
                    <div class="desc">{{obj.content}}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props:["list"]
};
</script>

<style lang="sass" scoped>
@import '@/assets/css/mixin.sass'
.list-box
    @include border-top-1px(#e4e4e4)
    .content
        padding: 0 0.3rem
        .list
            display: flex
            padding: 0.3rem 0 0.2rem 0
            .img-box
                width: 0.8rem
                flex: 0 0 0.8rem
                margin-right: 0.2rem
                img
                    width: 100%
                    border-radius: 50%
            .info-box
                flex: 1
                min-width: 0
                .basic
                    color: #2f2f2f
                    font-size: 0.32rem
                    .date
                        font-size: 0.24rem
                        color: #898989
                        float: right
                .time
                    color: #666
                    font-size: 0.24rem
                    margin-top: 0.14rem
                .desc
                    line-height: 0.4rem
                    color: #2f2f2f
                    padding: 0.28rem 0 0.16rem 0
</style>