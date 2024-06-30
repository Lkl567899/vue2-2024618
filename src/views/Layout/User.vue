<template>
  <div class="user">
    <div class="head" v-if="isLogin">
      <div class="headIMG">
        <img src="../../assets/leina.avif" alt="">
      </div>
      <div class="headname">
        <div class="first">{{data.mobile}}</div>
        <div class="last">{{data.nick_name}}</div>
      </div>
    </div>
    <div class="head" v-else @click="$router.push('/login')">
      <div class="headIMG">
        <img src="../../assets/leina.avif" alt="">
      </div>
      <div class="headname">
        <div class="first">未登录</div>
        <div class="last">点击登录账号</div>
      </div>
    </div>
    <div class="asset">
      <div class="asset-left">
        <div class="asset-item-left">
          <span>{{data.pay_money || 0}}</span>
          <span>账户余额</span>
        </div>
        <div class="asset-item-left">
          <span>0</span>
          <span>积分</span>
        </div>
        <div class="asset-item-left">
          <span>0</span>
          <span>优惠券</span>
        </div>
      </div>
      <div class="asset-right">
        <div class="asset-item-right">
          <van-icon name="balance-pay" />
          <span>我的钱包</span>
        </div>
      </div>
    </div>
    <div class="order-navbar">
      <div class="order-navbar-item" @click="$router.push(`/myorder?dataType=all`)">
        <van-icon name="balance-list-o" />
        <span>全部订单</span>
      </div>
      <div class="order-navbar-item" @click="$router.push(`/myorder?dataType=payment`)">
        <van-icon name="clock-o" />
        <span>待支付</span>
      </div>
      <div class="order-navbar-item" @click="$router.push(`/myorder?dataType=delivery`)">
        <van-icon name="logistics" />
        <span>待发货</span>
      </div>
      <div class="order-navbar-item" @click="$router.push(`/myorder?dataType=received`)">
        <van-icon name="send-gift-o" />
        <span>待收货</span>
      </div>
    </div>
    <div class="service">
      <div class="title">我的服务</div>
      <div class="content">
        <div class="content-item" @click="$router.push('list')">
          <van-icon name="records" />
          <span>收货地址</span>
        </div>
        <div class="content-item">
          <van-icon name="gift-o" />
          <span>领券中心</span>
        </div>
        <div class="content-item">
          <van-icon name="gift-card-o" />
          <span>优惠券</span>
        </div>
        <div class="content-item">
          <van-icon name="question-o" />
          <span>我的帮助</span>
        </div>
        <div class="content-item">
          <van-icon name="balance-o" />
          <span>我的积分</span>
        </div>
        <div class="content-item">
          <van-icon name="refund-o" />
          <span>退换/售后</span>
        </div>
      </div>
    </div>
    <div class="clearuser" v-if="isLogin">
     <button @click="logout">退出登录</button>
    </div>
  </div>
</template>

<script>
import { GetUserInfoAPI } from '@/api/user'
export default {
  name: 'userIndex',
  computed: {
    isLogin () {
      return this.$store.getters.token
    }
  },
  data () {
    return {
      data: {}
    }
  },
  created () {
    if (this.isLogin) { this.GetUserInfoData() }
  },
  methods: {
    // 获取个人信息
    async GetUserInfoData () {
      const res = await GetUserInfoAPI()
      console.log(res.data.userInfo)
      this.data = res.data.userInfo
    },
    // 退出登录
    logout () {
      this.$store.dispatch('user/logout')
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  min-height: 100vh;
  background-color: #f7f7f7;
  padding-bottom: 50px;

  .head {
    height: 190px;
    background: url("../../assets//leina.avif") no-repeat;
    background-size: 100% 200px;
    display: flex;
    align-items: center;

    .headIMG {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      margin: 0 10px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .first {
      margin-bottom: 5px;
      color: #c59a46;
      font-size: 20px;
      font-weight: 800;
    }

    .last {
      display: inline-block;
      background-color: #3c3c3c;
      padding: 3px 5px;
      border-radius: 5px;
      color: #e0d3b6;
      font-size: 14px;
    }
  }

  .asset {
    display: flex;
    padding: 20px 0;
    font-size: 14px;
    background-color: #fff;

    .asset-left {
      display: flex;
      justify-content: space-evenly;
      flex: 3;

      .asset-item-left {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        span:first-child {
          margin-bottom: 5px;
          color: #ff0000;
          font-size: 16px;
        }
      }
    }

    .asset-right {
      flex: 1;

      .asset-item-right {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .van-icon {
          font-size: 24px;
          margin-bottom: 5px;
        }
      }
    }
  }

  .order-navbar {
    display: flex;
    background-color: #fff;
    margin: 10px;
    padding: 20px 0;
    justify-content: space-around;

    .order-navbar-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .van-icon {
        font-size: 24px;
        margin-bottom: 10px;
      }
    }
  }

  .service {
    font-size: 14px;
    background-color: #fff;
    border-radius: 5px;
    margin: 10px;

    .title {
      padding: 0 15px;
      font-size: 16px;
      height: 50px;
      line-height: 50px;
    }
    .content{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .content-item{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: start;
      width: 25%;
      margin-bottom: 20px;
      .van-icon{
        font-size: 24px;
        margin-bottom: 10px;
        color: #ff3800;
      }
    }
    }
  }
  .clearuser{
    margin-top: 20px;
    display: flex;
    justify-content: center;
    button{
      width: 100%;
      padding: 15px 0;
      margin: 20px;
      text-align: center;
      border-radius: 25px;
      border: 1px #fff solid;
      background-color: #c59a46;
      color: #fff;
    }
  }
}
</style>
