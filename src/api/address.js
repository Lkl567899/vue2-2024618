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
// 添加收货地址
export const PostAddressAddAPI = (form) => {
  return request.post('/address/add', {
    form
  })
}
// 获取单个收货地址详情
export const GetAddressDetailAPI = (addressId) => {
  return request.get('/address/detail', {
    params: {
      addressId
    }
  })
}
// 编辑收货地址
export const PostAddressEditAPI = (addressId, form) => {
  return request.post('/address/edit', {
    addressId,
    form
  })
}
// 删除收货地址
export const PostAddressRemoveAPI = (addressId) => {
  return request.post('/address/remove', {
    addressId
  })
}
