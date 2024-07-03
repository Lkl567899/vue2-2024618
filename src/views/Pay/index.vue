<template>
  <div class="pay">
    <van-nav-bar title="订单结算台" fixed />
    <div class="address-item">
      <div><van-icon name="location-o" /></div>
      <div class="item">
        <div class="top"><span>{{ address.name }}</span> <span>{{ address.phone }}</span></div>
        <div class="button"><span>{{ region }}</span><span>{{ address.detail }}</span></div>
      </div>
      <div class="right-icon" @click="goList"><van-icon name="arrow" /></div>
    </div>
    <div class="goodsList" v-for="item in goodsList" :key="item.goods_id">
      <div class="left">
        <img :src="item.goods_image" alt="">
      </div>
      <div class="right">
        <div class="text-ellipsis-2">{{ item.goods_name }}</div>
        <div class="price">
          <span class="l">x{{ item.total_num }}</span><span class="r red">￥{{ item.total_pay_price }}</span>
        </div>
      </div>
    </div>
    <div class="flow-num-box">
      <span>共 {{ order.orderTotalNum }} 件商品，合计：</span>
      <span class="money red">￥{{ order.orderTotalPrice }}</span>
    </div>
    <div class="flow-all-money">
      <div class="mpney-item">
        <span>订单总金额</span><span class="red">￥{{ order.orderTotalPrice }}</span>
      </div>
      <div class="mpney-item">
        <span>优惠券</span><span>无优惠券可用</span>
      </div>
      <div class="mpney-item">
        <span>配送费用</span><span class="red">+ ￥0.00</span>
      </div>
    </div>
    <div class="pay-method">
      <div class="pay-title">支付方式</div>
      <div class="pay-box">
        <div class="left">
          <van-icon name="after-sale" />
          <span>余额支付(可用:￥{{ personal }}元)</span>
        </div>
        <div class="ringt">
          <van-icon name="success" class="red" />
        </div>
      </div>
    </div>
    <div class="pay-remark">
      <input type="text" v-model="remark" class="ipt" maxlength="50" placeholder="选填(买家留言 50字以内)">
    </div>
    <div class="pay-footer">
      <div class="price">实付款: <span class="red">￥{{ order.orderTotalPrice }}</span></div>
      <div class="btn" @click="onSubmit">提交订单</div>
    </div>
  </div>
</template>

<script>
import { GetCheckoutOrderAPI, PostCheckoutSubmitAPI } from '@/api/order'
export default {
  name: 'payIndex',
  data () {
    return {
      personal: 0,
      region: '',
      address: {},
      goodsList: [],
      order: {},
      remark: ''

    }
  },
  methods: {
    // 获取订单结算参数
    async GetCheckoutOrderData () {
      if (this.mode === 'cart') {
        const res = await GetCheckoutOrderAPI(this.mode, {
          cartIds: this.cartIds
        })
        this.personal = res.data.personal.balance
        this.address = res.data.order.address
        this.region = Object.values(res.data.order.address.region).join('')
        this.goodsList = res.data.order.goodsList
        this.order = res.data.order
      } else {
        const res = await GetCheckoutOrderAPI(this.mode, {
          goodsId: this.goodsId,
          goodsSkuId: this.goodsSkuId,
          goodsNum: this.goodsNum
        })
        this.personal = res.data.personal.balance
        this.address = res.data.order.address
        this.region = Object.values(res.data.order.address.region).join('')
        this.goodsList = res.data.order.goodsList
        this.order = res.data.order
      }
    },
    // 提交订单
    async onSubmit () {
      if (this.mode === 'cart') {
        await PostCheckoutSubmitAPI(this.mode, {
          cartIds: this.cartIds,
          remark: ''
        })
      } else {
        await PostCheckoutSubmitAPI(this.mode, {
          goodsId: this.goodsId,
          goodsSkuId: this.goodsSkuId,
          goodsNum: this.goodsNum,
          remark: ''
        })
      }
      this.$router.replace('/myorder')
    },
    // 修改地址
    goList () {
      this.$router.push({
        path: '/list',
        query: {
          back: this.$route.fullPath
        }
      })
    }
  },
  created () {
    this.GetCheckoutOrderData()
  },
  computed: {
    mode () {
      return this.$route.query.mode
    },
    // 购物车
    cartIds () {
      return this.$route.query.cartIds
    },
    // 立刻购买
    goodsId () {
      return this.$route.query.goodsId
    },
    goodsSkuId () {
      return this.$route.query.goodsSkuId
    },
    goodsNum () {
      return this.$route.query.goodsNum
    }
  }
}
</script>

<style lang="less" scoped>
.pay {
  margin-top: 46px;
  min-height: 100vh;
  background-color: #f7f7f7;

  .address-item {
    margin-bottom: 20px;
    padding: 17px 15px;
    background: #fff url(../../assets/address.png) 0 100% repeat-x;
    background-size: 62px auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;

    .item {
      padding-left: 20px;

      .top {
        padding-bottom: 5px;
      }
    }

    .right-icon {
      position: absolute;
      right: 20px;
      transform: translateY(-7px);
      top: 50%;
    }
  }

  .goodsList {
    padding: 10px 15px 10px 15px;
    background: #fff;
    border-bottom: 0.5px solid #f8f8f8;
    display: flex;

    .left {
      width: 100px;

      img {
        display: block;
        width: 80px;
      }
    }

    .right {
      flex: 1;

      .price {
        padding-top: 13px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }

  .flow-num-box {
    padding: 8px 12px;
    display: flex;
    justify-content: flex-end;
    background-color: #fff;
  }

  .flow-all-money {
    margin-top: 10px;

    .mpney-item {
      display: flex;
      padding: 10px 12px;
      background-color: #fff;
      justify-content: space-between;
      font-size: 14px;
    }
  }

  .pay-method {
    margin-top: 10px;
    background-color: #fff;
    padding: 0 12px;

    .pay-title {
      font-size: 14px;
      padding: 10px 0;
      border-bottom: 0.5px solid #f8f8f8;
    }

    .pay-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 0 12px 0;

      span {
        margin-left: 10px;
      }
    }
  }

  .pay-remark {
    padding: 20px 12px;
    background-color: #fff;
    margin-top: 10px;

    .ipt {
      width: 100%;
      outline: none;
      border: none;
    }
  }

  .pay-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    border-top: 1px solid #f8f8f8;
    height: 50px;
    width: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;

    .price {
      flex: 4;
      padding-left: 12px;
    }

    .btn {
      flex: 2;
      text-align: center;
      background: linear-gradient(90deg, #f9211c, #ff6335);
      color: white;
      line-height: 50px;
    }
  }
}
</style>
