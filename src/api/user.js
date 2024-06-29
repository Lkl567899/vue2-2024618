import request from '@/utils/request'
// 我的-获取个人信息
export const GetUserInfoAPI = () => {
  return request.get('/user/info')
}
