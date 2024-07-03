<template>
  <div class="orderlist">
    <div class="time">
      <span>{{ item.create_time }}</span>
      <span class="red">{{ item.state_text }}</span>
    </div>
    <div class="item" v-for="(goods, index) in item.goods" :key="index">
      <div class="left">
        <img :src="goods.goods_image" alt="">
      </div>
      <div class="right">
        <div class="text-ellipsis-2">{{ goods.goods_name }}</div>
      </div>
      <div class="button">
        <span>￥{{ goods.total_pay_price }}</span>
        <span>x{{ goods.total_num }}</span>
      </div>
    </div>
    <div class="title">
      <span>共{{ item.total_num }}件商品,总金额</span>
      <span>￥{{ item.total_price }}</span>
    </div>
    <div class="actions">
      <div v-if="item.order_status === 10">
        <span v-if="item.pay_status === 10">立刻付款</span>
        <span v-else-if="item.delivery_status === 10">申请取消</span>
        <span v-else-if="item.delivery_status === 20 || item.delivery_status === 30">确认收货</span>
      </div>
      <div v-if="item.order_status === 30">
        <span>评价</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderListIndex',
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
.orderlist {
  margin: 10px;
  padding: 10px 12px;
  background-color: #fff;

  .time {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .item {
    display: flex;

    .left {
      width: 90px;
      height: 90px;
      margin: 0px 10px 10px 0;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .right {
      flex: 1;
    }

    .button {
      display: flex;
      padding-left: 20px;
      flex-direction: column;
      text-align: right;
      line-height: 25px;
      font-size: 13px;
      color: #999;
    }
  }

  .title {
    padding: 10px 0px;
    text-align: right;
    font-size: 13px;
  }
  .actions {
    text-align: right;
    margin-top: 10px;
    span {
    border: 1px solid #999;
     padding: 6px 7px;
     border-radius: 5px;
    }
  }
}
</style>
