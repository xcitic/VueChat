import Vue from 'vue'
import Vuex from 'vuex'
// import store modules
import chat from './chat'
import auth from './auth'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    chat,
    auth
  }
})

export default store
