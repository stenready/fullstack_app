// import axios from 'axios'
import axios from '../../plugins/axios.instance'
export default {
  state: {
    posts: [],
    onePost: [],
    fetch_triger: 'all'
  },
  getters: {
    getAllPosts(state) {
      return state.posts
    },
    getOnePost(state) {
      return state.onePost
    },
    fetch_triger(state) {
      return state.fetch_triger
    }
  },
  mutations: {
    UPDATE_TITLE_AND_BODY(state, data) {
      const array=state.posts.forEach((res, i) => {
        if (data._id===res._id) state.posts.splice(i, 1, data)
        return
      })
    },
    FETCH_ALL_POSTS(state, data) {
      state.posts=data
    },
    CLEAR_ONE_POST_STATE(state) {
      state.onePost=[]
    },
    FILTER_TRIGET_SET(state, str) {
      state.fetch_triger=str
    },
    FETCH_ONE_POST(state, data) {
      state.onePost=data
    },
    STORE_NEW_POST(state, data) {
      state.posts=state.posts.unshift(data)
    },
    DELETE_ONE_POST(state, post) {
      state.posts=state.posts.filter(res => res._id!==post)
    }
  },
  actions: {
    async update_post(ctx, data) {
      return axios.post('/api/posts/update', data).then(res => {
        ctx.commit('UPDATE_TITLE_AND_BODY', res.data)
      })
    },
    async fetch_all_posts(ctx) {
      const res=await axios.get('/api/posts')
      ctx.commit('FETCH_ALL_POSTS', res.data)
      ctx.commit('FILTER_TRIGET_SET', "all")
    },
    async fetch_only_my_posts(ctx) {
      const res=await axios.post('/api/posts')
      ctx.commit('FETCH_ALL_POSTS', res.data)
      ctx.commit("FILTER_TRIGET_SET", "my")
    },
    async fetchOnePost({ commit }, id) {
      const res=await axios.get('/api/posts/'+id)
      commit('CLEAR_ONE_POST_STATE')
      commit('FETCH_ONE_POST', res.data)
    },
    async store_post(ctx, data) {
      const res=await axios.post('api/posts/create', data)
      ctx.commit('STORE_NEW_POST', res.data)
    },
    async delete_one_post({ commit }, id) {
      const res=await axios.delete('/api/posts/'+id)
      commit('DELETE_ONE_POST', res.data)
    }

  }
}
