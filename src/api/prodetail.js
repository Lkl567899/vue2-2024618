import request from '@/utils/request'
// 获取商品详情数据
export const GetGoodsDetailAPI = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}
