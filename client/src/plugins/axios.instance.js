import axios from 'axios'
import store from '../store/index'
import router from '../router/index'

const instanse=axios.create({
  baseURL: 'http://localhost:10000'||'',
  // headers: { 'Content-Type': 'application/json' }
})

instanse.interceptors.response.use(res => {
  const auth=res.config.url.includes('auth')
  if (auth) {
    const token=res.data.token
    const { email, name, _id }=res.data.user
    localStorage.setItem('user', JSON.stringify({
      token, email, name, id: _id
    }))
  }
  return res
}, (err) => {
  if( err.response.status === 401 ) {
    store.commit('CLEAR_AUTH_DATA')
    router.push('/login')
  }
  return Promise.reject(err)
})

instanse.interceptors.request.use(req => {
  if( !req.url.includes('auth') ) {
    const data = JSON.parse(localStorage.getItem('user'))
    req.headers.common['Authorization'] = data.token
  }
  return req
})



export default instanse
