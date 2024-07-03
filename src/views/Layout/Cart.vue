<template>
  <div class="cart">
    <van-nav-bar title="购物车" fixed />
<div class="show" v-if="cartTotal>0">
  <div class="cartTiele">
      <span class="all">共<i>{{cartTotal}}</i>件商品</span>
      <span class="edit" @click="isEdit = !isEdit">
        <van-icon name="edit" />
        编辑
      </span>
    </div>
    <div class="cartItem" v-for="item in cartList" :key="item.goods_id">
      <van-checkbox class="pr15" checked-color="#ee0a24" :value="item.isChecked"
        @click="setisChecked(item.goods_id)"></van-checkbox>
      <div class="show">
        <img :src="item.goods.goods_image" alt="">
        <div class="info">
          <div class="text-ellipsis-2">{{ item.goods.goods_name }}</div>
          <div class="pricebox">
            <div class="price">￥{{ item.goods.goods_price_min }}</div>
            <countBox :value="item.goods_num" @input="(value) => changeCount(value, item.goods_id, item.goods_sku_id)"></countBox>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="all-check" @click="setALLisChecked">
        <van-checkbox icon-size="18" checked-color="#ee0a24" :value="ALLisChecked"></van-checkbox>
        全选
      </div>
      <div class="all-total">
        <div class="price">
          <span>合计:</span>
          <span>¥ <i class="totalPrice">{{selPrice}}</i></span>
        </div>
        <div v-if="isEdit" class="goPay" @click="goCart" :class="{disabled: selCount === 0 }">结算({{selCount}})</div>
        <div v-else class="delete" @click="ClearCartItem">删除</div>
      </div>
    </div>
</div>
<div v-else class="empty">
  <van-empty description="您的购物车是空的快去逛逛吧" />
  <div class="btn" @click="$router.push('/')">去逛逛</div>
</div>
  </div>
</template>

<script>
import countBox from '@/components/countBox.vue'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'cartIndex',
  computed: {
    ...mapState('cart', ['cartList']),
    ...mapGetters('cart', ['cartTotal', 'selCount', 'selPrice', 'selCartItem', 'ALLisChecked']),
    istoken () {
      return this.$store.getters.token
    }
  },
  created () {
    if (this.istoken) {
      this.$store.dispatch('cart/GetCartListData')
    }
  },
  data () {
    return {
      isEdit: true
    }
  },
  watch: {
    // 小科技 用户切换到删除时 取消所有选框的选中
    isEdit (value) {
      if (value) {
        this.$store.commit('cart/setALLisChecked', true)
      } else {
        this.$store.commit('cart/setALLisChecked', false)
      }
    }
  },
  methods: {
    // 修改单选框的状态
    setisChecked (id) {
      this.$store.commit('cart/setisChecked', id)
    },
    // 全选控制
    setALLisChecked () {
      this.$store.commit('cart/setALLisChecked', !this.ALLisChecked)
    },
    // 修改商品数量
    changeCount (value, goodsId, skuId) {
      this.$store.dispatch('cart/setChangeCount', { value, goodsId, skuId })
    },
    // 删除购物车中的商品
    ClearCartItem () {
      this.$store.dispatch('cart/ClearCartItem')
    },
    goCart () {
      if (this.selCartItem.length <= 0) {
        return false
      }
      this.$router.push({
        path: '/pay',
        query: {
          mode: 'cart',
          cartIds: this.selCartItem.map(item => item.id).join(',')
        }
      })
    }
  },
  components: { countBox }
}
</script>

<style lang="less" scoped>
.cart {
  min-height: 100vh;
  background-color: #f7f7f7;
  padding: 46px 10px 100px 10px;
  // 空购物车
  .empty{
    .btn{
      text-align: center;
      border: 1px red solid;
      padding: 10px 12px;
      width: 112px;
      margin: 0 auto;
      color: white;
      border-radius: 26px;
    background: linear-gradient(90deg, #f9211c, #ff6335);
    }
  }
  .cartTiele {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .cartItem {
    background: #fff;
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 22px 11px;
    margin-bottom: 17px;

    .pr15 {
      padding-right: 7vw;
    }

    .show {
      display: flex;

      img {
        width: 100px;
        height: 100px;
      }
    }

    .info {
      padding-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .pricebox {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }

  }

  .footer {
    height: 50px;
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 50px;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;

    .all-check {
      display: flex;
      align-items: center;

      .van-checkbox {
        margin-right: 5px;
      }
    }

    .all-total {
      display: flex;
      align-items: center;

      .price {
        font-size: 14px;
        margin-right: 10px;

        .totalPrice {
          color: #fa2209;
          font-size: 18px;
          font-style: normal;
        }
      }

      .goPay,
      .delete {
        min-width: 100px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        background-color: #fa2f21;
        color: #fff;
        border-radius: 18px;

        &.disabled {
          background-color: #ff9779;
        }
      }
    }
  }
}
</style>
