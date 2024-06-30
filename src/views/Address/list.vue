<template>
  <div class="AddressList">
    <van-nav-bar title="收货地址" fixed left-arrow @click-left="$router.go(-1)"/>
    <div class="addressItem" v-for="item in list" :key="item.address_id">
      <div class="title">
        <span class="name">{{item.name}}</span><span>{{item.phone}}</span>
      </div>
      <div class="address">
        <span>{{item.region.province}}</span><span>{{item.region.city}}</span><span>{{item.region.region}}</span><span>{{item.detail}}</span>
      </div>
      <div class="Controls">
        <div class="left">
          <van-radio-group v-model="radio">
            <van-radio :name="item.address_id" @click="setRaio(item.address_id)" checked-color="#ee0a24">{{item.address_id === radio ? '默认' : '选择'}}</van-radio>
          </van-radio-group>
        </div>
        <div class="right">
          <span class="edit">编辑</span>
          <span>删除</span>
        </div>
      </div>
    </div>
    <div class="footer">
      <button @click="$router.push('/addressUpdate')">添加新地址</button>
    </div>
  </div>
</template>

<script>
import { GetAddressListAPI, GetAddressDefaultIdAPI, PostAddressSetDefaultAPI } from '@/api/address'
export default {
  name: 'ListIndex',
  data () {
    return {
      list: [],
      radio: 0
    }
  },
  methods: {
    // 获取收货地址列表
    async GetAddressListData () {
      const res = await GetAddressListAPI()
      console.log(res.data.list)
      this.list = res.data.list
      if (this.list) {
        this.GetAddressDefaultIdData()
      }
    },
    // 获取单选框的数据 设置默认地址
    async setRaio (id) {
      await PostAddressSetDefaultAPI(id)
      this.GetAddressListData()
    },
    // 获取默认地址Id
    async GetAddressDefaultIdData () {
      const res = await GetAddressDefaultIdAPI()
      this.radio = res.data.defaultId
      let obj = {}
      this.list.forEach((item, index) => {
        if (item.address_id === this.radio) {
          obj = item
          this.list.splice(index, 1)
          return false
        }
      })
      this.list.unshift(obj)
    }
  },
  created () {
    this.GetAddressListData()
  }
}
</script>

<style lang="less" scoped>
.AddressList {
  padding-top: 46px;
  height: 100vh;
  background-color: #f7f7f7;
  .addressItem{
    margin: 15px 10px;
    background-color: white;
    border-radius: 4px;
    padding: 15px 20px;
    .title{
      margin-bottom: 10px;
      font-size: 16px;
      .name{
        padding-right: 10px;
      }
    }
    .address{
      margin-bottom: 20px;
      span{
        padding-right: 5px;
      }
    }
    .Controls{
      display: flex;
      justify-content: space-between;
      .edit{
        padding-right: 5px;
      }
    }
  }
  .footer{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: white;
    border-bottom: 1px solid #f3f3f3;
    padding: 15px;
     button{
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      outline: none;
      width: 100%;
      padding: 15px 0;
      color: #fff;
      border-radius: 26px;
      background: linear-gradient(90deg, #f9211c, #ff6335);
     }
  }
}
</style>
