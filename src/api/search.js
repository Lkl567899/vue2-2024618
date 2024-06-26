import request from '@/utils/request'
// 获取搜索历史
export const GetGoodsListAPI = (goodsName, sortType, categoryId) => {
  return request.get('/goods/list', {
    params: {
      sortType,
      goodsName,
      categoryId,
      page: 1
    }
  })
}
// 获取分类页数据
export const GetCategoryListAPI = () => {
  return request.get('/category/list')
}
