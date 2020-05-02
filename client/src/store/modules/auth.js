// import axios from 'axios'
import axios from '../../plugins/axios.instance'
export default {
  state: {
    auth_triger: false,
    auth_user: null,
  },
  getters: {
    checkAuth(state) {
      return state.auth_triger
    },
    getUser(state) {
      return state.auth_user
    }
  },
  mutations: {
    SET_USER_DATA(state, data) {
      state.auth_user=data.user
      state.auth_triger=true
    },
    CLEAR_AUTH_DATA(state) {
      state.auth_user = null
      state.auth_triger=false
      localStorage.removeItem('user')
      axios.defaults.headers.common['Authorization']=null
    }
  },
  actions: {
    async register(ctx, data) {
      const res=await axios.post('api/auth/register', data)
      ctx.commit('SET_USER_DATA', res.data)
    },
    async login(ctx, data) {
      const res=await axios.post('api/auth/login', data)
      ctx.commit('SET_USER_DATA', res.data)
    },

  },
}