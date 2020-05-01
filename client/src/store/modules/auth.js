import axios from 'axios'
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
      const token=data.token
      const { email, name, _id }=data.user
      localStorage.setItem('user', JSON.stringify({ token, email, id: _id, name }))
      axios.defaults.headers.common['Authorization']=token
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
    auth_error_401(ctx, err) {
      if( err.response.status === 401 ) {
        ctx.commit('CLEAR_AUTH_DATA')
        return true
      }
    }

  },
}