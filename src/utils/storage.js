const INFO_KEY = 'shopping_info'
const SEARCH_KEY = 'search_key'
// 获取个人信息
export const getInfo = () => {
  const result = localStorage.getItem(INFO_KEY)
  return result
    ? JSON.parse(result)
    : {
        token: '',
        userId: ''
      }
}
// 设置个人信息
export const setInfo = (info) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(info))
}
// 移出个人信息
export const delInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

// 获取搜索列表
export const getSearch = () => {
  const result = localStorage.getItem(SEARCH_KEY)
  return result
    ? JSON.parse(result)
    : []
}

// 设置搜索列表
export const setSearch = (arr) => {
  localStorage.setItem(SEARCH_KEY, JSON.stringify(arr))
}
