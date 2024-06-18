export default {
  namespaced: true,
  state () {
    return {
      userInfo: {
        token: '',
        userId: ''
      }
    }
  },
  mutations: {
    setUserinfo (state, obj) {
      state.userInfo = obj
    }
  },
  actions: {}
}
