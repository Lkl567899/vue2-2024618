<template>
  <div class="myorder">
    <van-nav-bar title="我的订单" fixed left-arrow @click-left="$router.push('/home')" />
    <van-tabs v-model="active" sticky>
      <van-tab name="all" title="全部"></van-tab>
      <van-tab name="payment" title="待支付"></van-tab>
      <van-tab name="delivery" title="待发货"></van-tab>
      <van-tab name="received" title="待收货"></van-tab>
      <van-tab name="comment" title="待评价"></van-tab>
    </van-tabs>
    <div class="show" v-if="list.length">
      <OrderListItem v-for="item in list" :key="item.order_id" :item="item"></OrderListItem>
    </div>
    <div v-else>
      <van-empty description="亲 暂无订单记录~" />
    </div>

  </div>
</template>

<script>
import OrderListItem from '@/components/OrderListItem.vue'
import { GetOrderListAPI } from '@/api/order'
export default {
  name: 'MyorderIndex',
  data () {
    return {
      active: this.$route.query.dataType || 'all',
      list: []
    }
  },
  created () {
    this.GetOrderListData()
  },
  methods: {
    async GetOrderListData () {
      const res = await GetOrderListAPI(this.active)
      // 手动计算总数
      res.data.list.data.forEach(item => {
        item.total_num = 0
        item.goods.forEach(goods => {
          item.total_num += goods.total_num
        })
      })
      this.list = res.data.list.data
    }
  },
  watch: {
    active: {
      immediate: true,
      handler () {
        this.GetOrderListData()
      }
    }
  },
  components: {
    OrderListItem
  }
}
</script>

<style lang="less" scoped>
.myorder {
  padding-top: 46px;
  min-height: 100vh;
  background-color: #f7f7f7;
}
</style>
