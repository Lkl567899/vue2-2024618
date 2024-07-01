import request from '@/utils/request'
// 获取收货地址列表
export const GetAddressListAPI = () => {
  return request.get('/address/list')
}
// 默认收货地址id
export const GetAddressDefaultIdAPI = () => {
  return request.get('/address/defaultId')
}
// 设置默认地址
export const PostAddressSetDefaultAPI = (addressId) => {
  return request.post('/address/setDefault', { addressId })
}
// 获取省市区-添加地址
export const GetRegionTreeAPI = () => {
  return request.get('/region/tree')
}
