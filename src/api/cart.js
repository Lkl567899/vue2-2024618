import request from '@/utils/request'
// 加入购物车
export const PostCartAddAPI = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId, goodsNum, goodsSkuId
  })
}
// 购物车商品总数量
export const GetCartTotalAPI = () => {
  return request.get('/cart/total')
}
// 获取购物车商品列表
export const GetCartListAPI = () => {
  return request.get('/cart/list')
}
// 修改购物车商品数量
export const PostCartUpdateAPI = (goodsNum, goodsId, goodsSkuId) => {
  return request.post('/cart/update', { goodsNum, goodsId, goodsSkuId })
}
// 删除购物车中的商品
export const PostCartClearAPI = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
