<template>
  <div class="updateList">
    <van-nav-bar title="添加收货地址" left-arrow @click-left="$router.go(-1)" />
    <div class="title">收货地址</div>
    <div class="updateItem">
      <van-form @submit="onSubmit">
        <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]" />
        <van-field v-model="username" name="电话" label="电话" placeholder="电话"
          :rules="[{ required: true, message: '请填写电话号码' }]" />
        <van-field v-model="fieldValue" is-link readonly label="地区" placeholder="请选择所在地区" @click="show = true" />
      </van-form>
      <van-popup v-model="show" round position="bottom">
       <van-cascader
        v-model="cascaderValue"
        title="请选择所在地区"
        :options="mapArr"
        @close="show = false"
        @finish="onFinish"
  />
</van-popup>
    </div>
  </div>
</template>

<script>
import { GetRegionTreeAPI } from '@/api/address'
export default {
  name: 'UpdateIndex',
  created () {
    this.GetRegionTreeData()
  },
  data () {
    return {
      username: '',
      mapArr: [],
      show: false,
      cascaderValue: '',
      fieldValue: '',
      region: []

    }
  },
  methods: {
    onSubmit () { },
    // 修改地区数据结构
    async GetRegionTreeData () {
      const res = await GetRegionTreeAPI()
      this.mapArr = Object.values(res.data.list)
      // 第一次循环
      this.mapArr = this.mapArr.map((item) => ({
        text: item.name,
        value: item.id,
        children: Object.values(item.city)
      }))
      // 第二次循环
      this.mapArr.forEach(item => {
        item.children = item.children.map((item) => ({
          text: item.name,
          value: item.id,
          children: Object.values(item.region)
        }))
        item.children.forEach(i => {
          i.children = i.children.map((v) => ({
            text: v.name,
            value: v.id
          }))
        })
      })
      console.log(this.mapArr)
    },
    onFinish ({ selectedOptions }) {
      this.show = false
      this.fieldValue = selectedOptions.map((option) => option.text).join('/')
      // region 准备提交给后端的数据
      this.region = selectedOptions.map((item) => ({
        label: item.text,
        value: item.value
      }))
    }
  }
}
</script>

<style lang="less" scoped>
.updateList {
  min-height: 100vh;
  background-color: #f7f7f7;

  .title {
    width: 94%;
    margin: 0 auto;
    padding-top: 29px;
    font-size: 18px;
    color: rgba(69, 90, 100, .6);
  }

  .updateItem {
    padding: 10px;
  }
}
</style>
