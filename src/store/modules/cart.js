import { GetCartListAPI, PostCartUpdateAPI, PostCartClearAPI } from '@/api/cart'
export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    // 存储购物车列表
    setCartListData (state, arr) {
      state.cartList = arr
    },
    // 修改单选框的状态
    setisChecked (state, id) {
      const Item = state.cartList.find((item) => item.goods_id === id)
      Item.isChecked = !Item.isChecked
    },
    // 全选控制
    setALLisChecked (state, flag) {
      state.cartList.forEach((item) => {
        item.isChecked = flag
      })
    },
    // 前端修改购物车商品数量
    setCount (state, { value, goodsId }) {
      const newGoodsid = state.cartList.find(item => item.goods_id === goodsId)
      newGoodsid.goods_num = value
    }
  },
  actions: {
    // 获取购物车列表
    async GetCartListData (context) {
      const { data } = await GetCartListAPI()
      data.list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartListData', data.list)
    },
    // 修改购物车商品数量
    async setChangeCount (context, data) {
      const { value, goodsId, skuId } = data
      context.commit('setCount', { value, goodsId })
      await PostCartUpdateAPI(value, goodsId, skuId)
    },
    // 删除购物车中的商品
    async ClearCartItem (context) {
      const arr = context.getters.selCartItem.map(item => item.id)
      await PostCartClearAPI(arr)
      context.dispatch('GetCartListData')
    }
  },
  getters: {
    // 购物车总数量
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品
    selCartItem (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 选中商品的总数
    selCount (state, getters) {
      return getters.selCartItem.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的总价
    selPrice (state, getters) {
      return getters.selCartItem.reduce((sum, item) => sum + item.goods_num * item.goods.goods_price_min, 0).toFixed(2)
    },
    // 全选状态
    ALLisChecked (state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
}
