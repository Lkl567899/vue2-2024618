<template>
  <div class="prodetail">
    <van-nav-bar title="商品详情页" fixed left-arrow @click-left="$router.go(-1)" />
    <van-swipe :autoplay="3000" @change="onChange">
      <van-swipe-item v-for="(item, index) in images" :key="index">
        <img :src="item.external_url" />
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }} / {{ images.length }}</div>
      </template>
    </van-swipe>
    <div class="info">
      <div class="title">
        <div class="price">
          <span class="now">￥0.01</span>
          <span class="oldprice">￥6699.00</span>
        </div>
        <div class="sellcount">已售1001件</div>
      </div>
      <div class="msg text-ellipsis-2 P">
        三星手机 SAMSUNG Galaxy S23 8GB+256GB 超视觉夜拍系统 超清夜景 悠雾紫 5G手机 游戏拍照旗舰机s23
      </div>
    </div>
    <div class="service">
        <div class="left-words">
          <span><van-icon name="passed" />七天无理由退货</span>
          <span><van-icon name="passed" />48小时发货</span>
        </div>
        <div class="right-icon">
          <van-icon name="arrow" />
        </div>
    </div>
    <div class="comment">
     <div class="comment-title">
      <div class="left">商品评价 (5条)</div>
      <div class="right">查看更多 <van-icon name="arrow" /> </div>
     </div>
     <div class="comment-list">
      <div class="comment-item">
        <div class="top">
          <img src="../../assets/leina.avif" alt="">
          <div class="name">神雕大侠</div>
          <van-rate :size="20" :value="5" color="#ffd21e" void-icon="star" void-color="#eee"/>
        </div>
        <div class="content">
            质量很不错 挺喜欢的
          </div>
          <div class="time">
            2023-03-21 15:01:35
          </div>
      </div>
     </div>
    </div>
    <div class="tips">商品描述</div>
    <div class="desc" v-html="detail"></div>
    <div class="footer">
      <div class="icon-home">
        <van-icon name="wap-home-o" />
        <span>首页</span>
      </div>
      <div class="icon-cart">
        <van-icon name="shopping-cart-o" />
        <span>购物车</span>
      </div>
      <div class="btn-add">加入购物车</div>
      <div class="btn-buy">立刻购买</div>
    </div>
  </div>
</template>

<script>
import { GetGoodsDetailAPI } from '@/api/prodetail'
export default {
  name: 'prodetailIndex',
  computed: {
    goodsId () {
      return this.$route.params.id
    }
  },
  data () {
    return {
      images: [],
      current: 0,
      detail: []
    }
  },
  created () {
    this.GetGoodsDetailData()
  },
  methods: {
    async GetGoodsDetailData () {
      const res = await GetGoodsDetailAPI(this.goodsId)
      console.log(res.data.detail)
      this.images = res.data.detail.goods_images
      this.detail = res.data.detail.content
    },
    onChange (index) {
      this.current = index
    }
  }
}
</script>

<style lang="less" scoped>
.prodetail {
  padding-top: 46px;
  height: 100vh;
  background-color: #f7f7f7;

  img {
    display: block;
    width: 100%;
  }

  .custom-indicator {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 5px 10px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 15px;
  }

  .info {
    margin-top: 18px;
    background: #fff;
    padding: 18px 22px;
    .P{
        margin-top: 10px;
        font-size: 20px;
      }
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .price {
        .now {
          color: #fa2209;
          margin-right: 11px;
          font-size: 25px;
        }
        .oldprice{
          font-size: 19px;
          text-decoration: line-through;
          color: #959595;
          margin-right: 11px;
          margin-bottom: -4px;
        }
      }
      .sellcount{
        font-size: 17px;
        color: #959595;
      }

    }
  }
  .service{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 22px;
    color: #999;
    font-size: 16px;
    .left-words {
      margin-bottom: 2px;
      span {
        margin-right: 10px;
      }
      .van-icon {
        margin-right: 4px;
        color: #fa2209;
      }
    }
  }
  .comment{
    padding: 18px 22px;
    background-color: #fff;
    .comment-title{
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      text-align: center;
    }
    .comment-item{
      font-size: 16px;
      line-height: 30px;
      .top{
        height: 30px;
        display: flex;
        align-items: center;
        text-align: center;
        margin-top: 20px;
        img{
          width: 20px;
          height: 20px;
        }
        .name {
        margin: 0 10px;
        }
      }
      .time {
      color: #999;
    }
    }
  }
  .tips{
    padding: 18px 22px;
    margin-top: 12px;
    background-color: #fff;
  }
  .footer{
    position: fixed;
    bottom: 0;
    left: 0;
    height: 55px;
    background: white;
    border-top: 1px solid #ccc;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .icon-home, .icon-cart {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      .van-icon {
        font-size: 24px;
      }
    }
    .btn-add, .btn-buy {
      height: 36px;
      line-height: 36px;
      border-radius: 18px;
      text-align: center;
      width: 105px;
      background-color: #ffa900;
      color: #fff;
      font-size: 14px;
    }
    .btn-buy {
      background-color: #fe5630;
    }
  }
}
</style>
