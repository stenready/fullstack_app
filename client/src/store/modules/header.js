export default {
  state: {
    authHeaderMenu: [
      {
        path: "/", icon: "calendar_today", text: "Home", className: 'd-none d-sm-flex d-md-none'
      },
      {
        path: "/posts", icon: "stars", text: "posts", className: null
      },
      {
        path: "/create-post", icon: "add", text: "create post", className: null
      },
      {
        path: "/logaut", icon: "input", text: "Logaut", className: 'd-none d-sm-flex d-md-none'
      },
    ],
    unAuthHeaderMenu: [
      {
        path: "/", icon: "calendar_today", text: "Home", className: 'd-none d-sm-flex d-md-none'
      },
      {
        path: "/login", icon: "lock_open", text: "Login", className: null
      },
      {
        path: "/register", icon: "account_box", text: "Register", className: null
      },
    ]
  },
  getters: {
    authMenu(state) {
      return state.authHeaderMenu
    },
    unAuthMenu(state) {
      return state.unAuthHeaderMenu
    }
  },
  mutations: {
  },
  actions: {
  },
}