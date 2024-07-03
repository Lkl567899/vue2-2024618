import request from '@/utils/request'
// 订单结算
export const GetCheckoutOrderAPI = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      couponId: 0,
      delivery: 10,
      shopId: 0,
      isUsePoints: 0,
      mode,
      ...obj

    }
  })
}
// 提交订单
export const PostCheckoutSubmitAPI = (mode, obj) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: 10,
    couponId: 0,
    payType: 10,
    isUsePoints: 0,
    ...obj
  })
}
// 我的订单
export const GetOrderListAPI = (dataType) => {
  return request.get('/order/list', {
    params: {
      page: 1,
      dataType

    }
  })
}
