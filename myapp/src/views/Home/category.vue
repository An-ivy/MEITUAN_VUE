<template>
  <div>
    <ul class="cate-box">
      <li class="cate-list" v-for="obj in cateList" :key="obj.id">
        <img class="cate-img" :src="obj.img" alt="分类" />
        <p cate-title>{{obj.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { getCategroy } from "@/api/home.js";
export default {
  data() {
    return {
      cateList: [],
    };
  },
  created() {
    getCategroy().then((res) => {
      console.log("cantgroy", res);
      this.cateList = res;
    });
  },
};
</script>

<style lang="sass" scoped>
.cate-box
    display: flex
    flex-wrap: wrap
    .cate-list
        width: 20%
        text-align: center
        padding-top: 0.3rem
        font-size: 11px
        .cate-img
            width: 0.88rem
            height: 0.88rem
            margin-bottom: 0.1rem

</style>