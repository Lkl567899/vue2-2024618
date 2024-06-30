export default {
  data () {
    return {}
  },
  methods: {
    // 确认框 未登录不准加入购物车
    isdialogFrom () {
      if (!this.isToken) {
        this.$dialog.confirm({
          title: '温馨提示',
          message: '此时此刻需要你的登录哦~',
          confirmButtonText: '去登录',
          cancelButtonText: '再逛逛'
        })
          .then(() => {
            // on confirm
            console.log('去登录')
            this.$router.replace({
              path: '/login',
              query: {
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch(() => {
            // on cancel
            console.log('再逛逛')
          })
      }
      return false
    }
  }
}
