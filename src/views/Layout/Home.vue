<template>
  <div class="Home">
    <van-nav-bar title="智慧商城" fixed />
    <van-search placeholder="请输入搜索关键词" readonly @click="$router.push('/search')" />
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in swiperList" :key="item.imgUrl"><img :src="item.imgUrl" alt=""></van-swipe-item>
    </van-swipe>
    <van-grid column-num="5">
      <van-grid-item v-for="item in navList" :key="item.imgUrl" :icon="item.imgUrl" :text="item.text" />
    </van-grid>
    <div class="main">
      <img src="@/assets/leina.avif" alt="">
    </div>
    <div class="guess">
      <p class="guess-P">-- 猜你喜欢 --</p>
      <div class="goods-list">
        <GoodsItem v-for="item in proList" :item="item" :key="item.goods_id"></GoodsItem>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { GetHomeListAPI } from '@/api/home'
export default {
  name: 'homeIndex',
  created () {
    this.getHomeListData()
  },
  data () {
    return {
      swiperList: [],
      navList: [],
      proList: []
    }
  },
  methods: {
    async getHomeListData () {
      const res = await GetHomeListAPI()
      console.log(res.data.pageData.items)
      this.swiperList = res.data.pageData.items[1].data
      this.navList = res.data.pageData.items[3].data
      this.proList = res.data.pageData.items[6].data
    }
  },
  components: {
    GoodsItem
  }
}
</script>

<style lang="less" scoped>
.Home {
  padding-top: 46px;

  .van-nav-bar {
    z-index: 999;
    background-color: #c21401;

    ::v-deep .van-nav-bar__title {
      color: #fff;
    }
  }

  .my-swipe .van-swipe-item img {
    width: 100%;
    height: 185px;
  }

  .main {
    img {
      display: block;
      width: 100%;
    }
  }

  .guess-P {
    height: 40px;
  line-height: 40px;
  text-align: center;
  }
}
</style>
