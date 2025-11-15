// Vuex Store - Vue 3 版本
import { createStore } from 'vuex'

export default createStore({
  state: {
    token: localStorage.getItem('token') || '',
    userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'),
    curService: ''
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },

    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    },

    SET_CUR_SERVICE(state, service) {
      state.curService = service
    },

    CLEAR_AUTH(state) {
      state.token = ''
      state.userInfo = {}
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
    }
  },

  actions: {
    async login({ commit }, credentials) {
      try {
        // 如果有登录API，在这里调用
        // import { loginApi } from '@/api/login'
        // const response = await loginApi(credentials)
        // commit('SET_TOKEN', response.data.token)
        // commit('SET_USER_INFO', response.data.userInfo)

        // 临时方案：模拟登录
        commit('SET_TOKEN', 'mock-token-' + Date.now())
        commit('SET_USER_INFO', {
          name: credentials.username || 'User',
          id: 1
        })

        return true
      } catch (error) {
        console.error('登录失败:', error)
        throw error
      }
    },

    logout({ commit }) {
      commit('CLEAR_AUTH')
    }
  },

  getters: {
    isLoggedIn: state => !!state.token,
    userInfo: state => state.userInfo,
    userName: state => state.userInfo.name || '未登录'
  }
})
