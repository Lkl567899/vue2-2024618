import request from '@/utils/request'
// 获取首页数据
export const GetHomeListAPI = () => {
  return request.get('/page/detail', {
    params: {
      pageId: 0
    }
  })
}
