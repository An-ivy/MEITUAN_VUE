<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getDate">
      <ul class="list-container">
        <li class="shop-list" v-for="item in list" :key="item.id" @click="goDetail(item.id)">
          <div class="img-box">
            <img :src="item.img" alt />
          </div>
          <div class="info-box">
            <div class="title">{{item.name}}</div>
            <div class="rate-box">
              <div>
                <star :score="item.score"></star>
                <span class="rate">{{item.delivery_score}}分</span>
                <span>月销{{item.num}}</span>
              </div>
              <div>
                <span>{{item.minute}}分钟</span>
                <span class="left-line">{{item.distance}}</span>
              </div>
            </div>
            <div class="distribution-box">
              <span>起送{{item.per_capita}}</span>
              <span class="left-line">配送{{item.fee}}</span>
              <span class="left-line">人均{{item.price}}</span>
            </div>
          </div>
        </li>
      </ul>
    </van-list>
  </div>
</template>

<script>
import star from "./../../components/star/index";
import { getStar } from "@/api/home";
export default {
  data() {
    return {
      current: 0,
      size: 10,
      list: [],
      error: false,
      loading: false,
      finished: false,
      total: 0,
    };
  },
  components: {
    star,
  },
  /* created() {
    this.getDate();
  }, */
  methods: {
    //获取上家列表
    getDate() {
      getStar({
        current: this.current,
        size: this.size,
      }).then((res) => {
        console.log("list", res);
        this.list = this.list.concat(res.list);
        this.loading = false;
        this.current++;
        this.total = res.total;
        if (this.list.length >= this.total) {
          this.finished = true;
        }
      });
    },
    //跳转详情页
    goDetail(id){
        this.$router.push({path:'/detail',query:{id}})
    }
  },
};
</script>

<style lang="sass" scoped>
.list-container
    padding: 0 0.2rem
    .shop-list
        display: flex
        margin: 0.3rem 0 0.5rem 0
        .img-box
            width: 1.52rem
            height: 1.14rem
            img
                width: 100%
                height: 100%
        .info-box
            flex: 1
            margin-left: 5px
            .title
                font-size: 0.32rem
                color: #333
                line-height: 1.4
                font-weight: 600
            .rate-box,.distribution-box
                display: flex
                color: #333
                line-height: 1.4
                font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
                font-size: 11px
                .rate
                    margin-right: .2rem
                .left-line::before
                    content: ""
                    display: inline-block
                    width: 1px
                    height: 6px
                    background: #CCC
                    margin: 0 3px

            .rate-box
                justify-content: space-between

</style>