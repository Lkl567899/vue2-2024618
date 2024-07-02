<template>
  <div class="updateList">
    <van-nav-bar title="添加收货地址" left-arrow @click-left="$router.go(-1)" />
    <div class="title">收货地址</div>
    <div class="updateItem">
      <van-form @submit="onSubmit">
        <van-field v-model="form.name" name="用户名" label="用户名" placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]" />
        <van-field v-model="form.phone" name="电话" label="电话" placeholder="电话"
          :rules="[{ required: true, message: '请填写电话号码' }]" />
        <van-field v-model="fieldValue" is-link readonly label="地区" placeholder="请选择所在地区" @click="show = true" />
        <van-field v-model="form.detail" name="详细地址" label="详细地址" placeholder="详细地址"
          :rules="[{ required: true, message: '请填写详细地址' }]" />
          <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">提交</van-button>
  </div>
      </van-form>
      <van-popup v-model="show" round position="bottom">
        <van-cascader v-model="cascaderValue" title="请选择所在地区" :options="mapArr" @close="show = false"
          @finish="onFinish" />
      </van-popup>
    </div>
  </div>
</template>

<script>
import { GetRegionTreeAPI, PostAddressAddAPI, GetAddressDetailAPI, PostAddressEditAPI } from '@/api/address'
export default {
  name: 'UpdateIndex',
  created () {
    this.GetRegionTreeData()
    this.GetAddressDetailData()
  },
  data () {
    return {
      form: {
        name: '',
        phone: '',
        region: [
          {
            label: '',
            value: ''
          },
          {
            label: '',
            value: ''
          },
          {
            label: '',
            value: ''
          }
        ],
        detail: ''
      },
      mapArr: [],
      show: false,
      cascaderValue: '',
      fieldValue: '',
      addressArr: [],
      addressRegion: []
    }
  },
  computed: {
    addressId () {
      return this.$route.query.addressId
    }
  },
  methods: {
    async onSubmit () {
      if (this.addressId) {
      // 编辑收货地址
        await PostAddressEditAPI(this.addressId, this.form)
        this.$router.push('/list')
      } else {
      // 新增收货地址
        await PostAddressAddAPI(this.form)
        this.$router.go(-1)
      }
    },
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
    },
    // 获取地区选择后的数据
    onFinish ({ selectedOptions }) {
      this.show = false
      this.fieldValue = selectedOptions.map((option) => option.text).join('/')
      // region 准备提交给后端的数据
      this.form.region = selectedOptions.map((item) => ({
        label: item.text,
        value: item.value
      }))
    },
    // 获取收货地址详情
    async GetAddressDetailData () {
      if (this.addressId) {
        const res = await GetAddressDetailAPI(this.addressId)
        console.log(res.data.detail)
        this.form.name = res.data.detail.name
        this.form.phone = res.data.detail.phone
        this.form.detail = res.data.detail.detail
        this.addressRegion = Object.values(res.data.detail.region) // 修改数据格式
        this.addressArr.push(res.data.detail.province_id, res.data.detail.city_id, res.data.detail.region_id) // 修改数据格式
        this.form.region = this.form.region.map((item, index) => ({
          label: this.addressRegion[index],
          value: this.addressArr[index]
        }))
        // 修改地区选择器前端显示
        this.fieldValue = this.addressRegion.join('/')
      }
      console.log(this.form)
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
