<template>
    <div class="commentBox" ref="commentBox">
        <div>
            <score
                :delivery="comment.delivery"
                :score="comment.score"
                :packing="comment.packing"
                :flavor="comment.flavor"
            ></score>
            <div class="tag-container">
                <tag :tag="comment.label" :currentType="type" @change="change"></tag>
            </div>
            <list :list="comment.rate"></list>
        </div>
    </div>
</template>

<script>
import score from "./score";
import tag from "./tag";
import list from "./list";
import { getComment } from "@/api/comment";
import BScroll from "better-scroll";
export default {
    data() {
        return {
            type: 1, //全部
            comment: {},
            commentScroll: null,
        };
    },
    components: {
        score,
        tag,
        list,
    },
    methods: {
        getData() {
            return new Promise((resove) => {
                getComment({
                    id: this.$route.query.id,
                    type: this.type,
                }).then((res) => {
                    console.log("123", res);
                    this.comment = res;
                    resove();
                });
            });
        },
        change(id) {
            console.log(id);
            this.type = id;
            this.getData();
        },
    },
    created() {
        this.getData().then(() => {
            this.$nextTick(() => {
                this.commentScroll = new BScroll(this.$refs.commentBox, {
                    click: true,
                    bounce: false,
                });
            });
        });
    },
};
</script>

<style lang="sass" scoped>
.commentBox
    height: calc( 100vh - 44px )
.tag-container
    border-top: 0.2rem solid #f4f4f4
</style>