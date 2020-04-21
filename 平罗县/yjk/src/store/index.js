import Vue from 'vue'
import Vuex from 'vuex'
import test from './modules/test'
import HomePage from './modules/HomePage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    test,
    HomePage
  }
})
